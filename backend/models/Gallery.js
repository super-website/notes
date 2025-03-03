const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject must be provided'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return value.every((image) => typeof image === 'string')
        },
        message: 'Each image must be a string',
      },
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
)

gallerySchema.index({ subject: 1 })

module.exports = mongoose.model('Gallery', gallerySchema)
