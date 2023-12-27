// Mongoose Dependency
const mongoose = require('mongoose');
require('dotenv').config();

// Connection to the mongoDB cloud database
mongoose.connect(process.env.DATABASEURL)
.then(() => {
  const db = mongoose.connection;
  console.log(`MongoDB Connected to Database: ${db.name} at Host: ${db.host} on Port: ${db.port}`);
})
.catch((err) => {
  console.log("MongoDB not connected!!!" + err);
})