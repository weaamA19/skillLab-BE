// Dependencies
// Load express
const express = require('express');

//Adding Multer
const multer = require('multer');


// Initialize express
const app = express()

// Require and initialize dotenv
require('dotenv').config();

// Port Configuration
const port = process.env.PORT;


// Database Configuration
const db = require("./config/db");

// Import Routes
const categoryRouter = require('./routes/category');
const cartRouter = require('./routes/cart');
const coursesRouter = require('./routes/courses');
const transactionsRouter = require('./routes/transactions');
const userRouter = require('./routes/user');


// Mount Routes
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);
app.use('/courses', coursesRouter);
app.use('/transactions', transactionsRouter);
app.use('/user', userRouter);

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The 'uploads' directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    let extractFileType = file.mimetype.split("/");
    let extension = extractFileType[extractFileType.length - 1];
    uniqueFlieName = file.fieldname + "-" + Date.now() + "." + extension;
    cb(null, uniqueFlieName);     // Define the filename for the uploaded file - using date to avoid repetitive name
    //cb(null, file.originalname);
  },
});



// Create an instance of Multer
const upload = multer({ storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file details via req.file
  console.log(req.file);
  res.status(200).send('File uploaded');
});

app.listen(port, () => {
  console.log(`SkillLab app is running on port ${port}`);
});