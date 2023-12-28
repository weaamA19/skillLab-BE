// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require transactions controller
const transactionsCtrl = require('../controllers/transactions');


//Routs


//Export
module.exports = router;
