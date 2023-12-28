// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require courses controller
const coursesCtrl = require('../controllers/courses');


//Routs


//Export
module.exports = router;
