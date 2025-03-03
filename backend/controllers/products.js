const Product = require('../models/product')

const getAllProductsStatic = async (req, res, next) => {
  try {
    const products = await Product.find({ name: 'vase table' })
    res.status(200).json({ products, nbHits: products.length })
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ product })
  } catch (error) {
    next(error)
  }
}

const getSingleProduct = async (req, res, next) => {
  const { id: productId } = req.params

  try {
    const product = await Product.findOne({ _id: productId })

    if (!product) {
      return res
        .status(404)
        .json({ error: `No product found with ID: ${productId}` })
    }

    res.status(200).json({ product })
  } catch (error) {
    next(error)
  }
}

const getAllProducts = async (req, res, next) => {
  const { search, limit } = req.query
  const queryObject = {}

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
      { short_desc: { $regex: search, $options: 'i' } },
    ]
  }

  try {
    const products = await Product.find(queryObject).limit(parseInt(limit) || 0)
    res.status(200).json({ products, nbHits: products.length })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  const { id: productId } = req.params

  try {
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body)

    if (!product) {
      return res
        .status(404)
        .json({ error: `No product found with ID: ${productId}` })
    }

    res.status(200).json({ product })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  const { id: productId } = req.params

  try {
    const product = await Product.findOneAndDelete({ _id: productId })

    if (!product) {
      return res
        .status(404)
        .json({ error: `No product found with ID: ${productId}` })
    }

    res.status(200).json({ message: 'Product deleted successfully', product })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
