// middleware/uploadsocial.js
import multer from 'multer';
import path from 'path';
 
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');  // make sure this folder exists
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
 
const uploadSocial = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // limit 5MB
  fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  }
});
 
export default uploadSocial;
 
 