import multer from 'multer';

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './backend/uploads'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname); // Use original file name
  },
});

const upload = multer({ storage: storage });

export default upload;