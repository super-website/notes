const mongoose = require('mongoose')
const slugify = require('slugify')

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must be provided'],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    subject: {
      type: String,
      required: true,
    },
    short_desc: {
      type: String,
      required: [true, 'Short description must be provided'],
    },
    long_desc: {
      type: String,
      required: [true, 'Long description must be provided'],
    },
    pdf: {
      type: String,
      required: [true, 'PDF must be provided'],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

ProductSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true })
  }
  next()
})

ProductSchema.index({ slug: 1 }, { unique: true, sparse: true })

module.exports = mongoose.model('Product', ProductSchema)
