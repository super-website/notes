const router = require('express').Router()

const {
  getAllGalleries,
  getGallery,
  createGallery,
  deleteGallery,
  updateGallery,
  likeGallery,
} = require('../controllers/galleryController')
const { uploadGalleryImages } = require('../controllers/uploadController')

router.route('/').get(getAllGalleries).post(createGallery)
router.route('/:id').get(getGallery).patch(updateGallery).delete(deleteGallery)

router.route('/uploads').post(uploadGalleryImages)

router.route('/:id/like').post(likeGallery)

module.exports = router
