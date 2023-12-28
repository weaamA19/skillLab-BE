// Dependencies
// Load express
const express = require('express');


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


app.listen(port, () => {
  console.log(`SkillLab app is running on port ${port}`);
});