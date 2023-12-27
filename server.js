// Dependencies
// Load express
const express = require('express');
// Load express ejs layouts
const expressLayouts = require('express-ejs-layouts');

// Initialize express
const app = express()

// Require and initialize dotenv
require('dotenv').config();

// Port Configuration
const port = process.env.PORT;

// Nodejs to look for all the static file in public folder (CSS, JS, Audio, Videos, Images).
app.use(express.static("public"));

// Nodejs to look into the folder called views for all the ejs files
app.set("view engine", "ejs");

// Nodejs to look into views folder for the file named layout.ejs
app.use(expressLayouts)

// Database Configuration
const db = require("./config/db");

// Import Routes


// Mount Routes

app.listen(port, () => {
  console.log(`Blog App is running on port ${port}`);
});