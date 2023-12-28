// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require cart controller
const cartCtrl = require('../controllers/cart');


//Routs


//Export
module.exports = router;
