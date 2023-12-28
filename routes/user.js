// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require user controller
const userCtrl = require('../controllers/user');


//Routs


//Export
module.exports = router;
