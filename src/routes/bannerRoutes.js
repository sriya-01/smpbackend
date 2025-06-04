// import express from 'express'
// import multer from 'multer'
// import {
//   getBanner,
//   createBanner,
//   updateBanner,
//   deleteField,
// } from '../controllers/bannerController.js'

// const router = express.Router()

// // Multer Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + '-' + file.originalname),
// })
// const upload = multer({ storage })

// // Routes
// router.get('/', getBanner)
// router.post('/', upload.single('image'), createBanner)
// router.put('/:id', upload.single('image'), updateBanner)
// router.patch('/:id/delete/:field', deleteField)

// export default router


import express from 'express'
import multer from 'multer'
import {
  getBanner,
  createBanner,
  updateBanner,
  deleteField,
} from '../controllers/bannerController.js'

const router = express.Router()

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
})
const upload = multer({ storage })

// Multer Fields Config for multiple file inputs
const bannerUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'logo1', maxCount: 1 },
  { name: 'logo2', maxCount: 1 },
  { name: 'logo3', maxCount: 1 },
  { name: 'logo4', maxCount: 1 },
])

// Routes
router.get('/', getBanner)
router.post('/', bannerUpload, createBanner)
router.put('/:id', bannerUpload, updateBanner)
router.patch('/:id/delete/:field', deleteField)

export default router
