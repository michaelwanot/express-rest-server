const multer = require('multer'); // lib to parse binary incoming file(es. images)

// STORAGE OPTION
const storage = multer.diskStorage({
  destination: (req, file, callback) => { // set up the directory for uploaded file
    callback(null, './upload');
  },
  filename: (req, file, callback) => { // define the file name
    callback(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, callback) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

module.exports = upload = multer({
  storage, // initialize the multer with options defined in storage
  fileFilter, //check for mime-type
  limits: { // limits file size
    fileSize: 1024 * 1024 * 5,
  }
});