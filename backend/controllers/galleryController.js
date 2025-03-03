const Gallery = require('../models/Gallery')
const { StatusCodes } = require('http-status-codes')

const sendErrorResponse = (res, statusCode, message) => {
  console.error(message)
  return res.status(statusCode).json({ success: false, error: message })
}

const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({})
    return res.status(StatusCodes.OK).json({ success: true, galleries })
  } catch (error) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    )
  }
}

const getGallery = async (req, res) => {
  const { id: galleryID } = req.params
  try {
    const gallery = await Gallery.findById(galleryID)
    if (!gallery) {
      return sendErrorResponse(
        res,
        StatusCodes.NOT_FOUND,
        `No gallery found with ID: ${galleryID}`
      )
    }
    return res.status(StatusCodes.OK).json({ success: true, gallery })
  } catch (error) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    )
  }
}

const updateGallery = async (req, res) => {
  const { id: galleryID } = req.params
  try {
    const gallery = await Gallery.findById(galleryID)
    if (!gallery) {
      return sendErrorResponse(
        res,
        StatusCodes.NOT_FOUND,
        `No gallery found with ID: ${galleryID}`
      )
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      galleryID,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    return res
      .status(StatusCodes.OK)
      .json({ success: true, gallery: updatedGallery })
  } catch (error) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    )
  }
}

const deleteGallery = async (req, res) => {
  const { id: galleryID } = req.params
  try {
    const gallery = await Gallery.findByIdAndDelete(galleryID)
    if (!gallery) {
      return sendErrorResponse(
        res,
        StatusCodes.NOT_FOUND,
        `No gallery found with ID: ${galleryID}`
      )
    }
    return res.status(StatusCodes.OK).json({ success: true, gallery })
  } catch (error) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    )
  }
}

const createGallery = async (req, res) => {
  try {
    const gallery = await Gallery.create(req.body)
    return res.status(StatusCodes.CREATED).json({ success: true, gallery })
  } catch (error) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    )
  }
}

const likeGallery = async (req, res) => {
  console.log(req.params)
  const { id: galleryID } = req.params

  try {
    const gallery = await Gallery.findById(galleryID)
    if (!gallery) {
      return sendErrorResponse(
        res,
        StatusCodes.NOT_FOUND,
        `No gallery found with ID: ${galleryID}`
      )
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      galleryID,
      { $inc: { likes: 1 } },
      { new: true }
    )

    return res
      .status(StatusCodes.OK)
      .json({ success: true, gallery: updatedGallery })
  } catch (error) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    )
  }
}

module.exports = {
  getAllGalleries,
  getGallery,
  updateGallery,
  deleteGallery,
  createGallery,
  likeGallery,
}
