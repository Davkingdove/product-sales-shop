const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const validTypes = /jpeg|jpg|png/;
    const extname = validTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = validTypes.test(file.mimetype);

    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only images are allowed (jpg, jpeg, png)'));
  }
});

module.exports = upload;
