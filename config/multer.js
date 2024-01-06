const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination where uploaded files will be stored
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    let extractFileType = file.mimetype.split("/");
    let extension = extractFileType[extractFileType.length - 1];
    uniqueFlieName = Date.now() + "-" + file.fieldname + "." + extension;
    cb(null, uniqueFlieName);     // Define the filename for the uploaded file - using date to avoid repetitive name
  },
});

const fileFilter = (req, file, cb) => {
  // Validate file types, if needed
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/svg+xml' //For SVG files
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, SVG, or JPG allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
