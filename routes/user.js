// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require user controller
const userCtrl = require('../controllers/user');


//Routs
router.post("/signup", userCtrl.user_signup_post);
router.post("/signin", userCtrl.user_signin_post);

router.get("/signedin", userCtrl.user_show_get);



//Export
module.exports = router;
