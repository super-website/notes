require('dotenv').config()
const path = require('path')
// async errors

const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const connectDB = require('./db/connect')

const productsRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const galleryRoutes = require('./routes/galleryRoutes')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// middleware
app.use(express.static(path.resolve(__dirname, '../frontend/dist')))
app.use(express.static(path.resolve(__dirname, '../cms/dist')))
app.use(express.json())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

// routes

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/topics', productsRouter)
app.use('/api/v1/gallery', galleryRoutes)

app.get('/', (req, res) => {
  console.log('hello')

  console.log(path.resolve(__dirname, '../cms/dist', 'index.html'))

  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'))
})

app.get('/cms/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../cms/dist', 'index.html'))
})
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port)
  } catch (error) {
    console.log(error)
  }
}

start()
