const cloudinary = require('cloudinary').v2
const fs = require('fs')
const { StatusCodes } = require('http-status-codes')

const uploadNotesPDF = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.pdf.tempFilePath,
      {
        use_filename: true,
        folder: 'notes',
        resource_type: 'raw',
      }
    )

    fs.unlinkSync(req.files.pdf.tempFilePath)

    return res.status(StatusCodes.OK).json({ pdf: { src: result.secure_url } })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}

const uploadGalleryImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.images.tempFilePath,
      {
        use_filename: true,
        folder: 'gallery',
      }
    )
    fs.unlinkSync(req.files.images.tempFilePath)

    return res
      .status(StatusCodes.OK)
      .json({ image: { src: result.secure_url } })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}

module.exports = {
  uploadNotesPDF,
  uploadGalleryImages,
}
