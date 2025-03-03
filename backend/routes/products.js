const express = require('express')

const router = express.Router()

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/products')
const { uploadNotesPDF } = require('../controllers/uploadController')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/uploads').post(uploadNotesPDF)
router.route('/:id').get(getSingleProduct).patch(updateProduct)

router.route('/:id').delete(deleteProduct)

module.exports = router
