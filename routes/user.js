// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require user controller
const userCtrl = require('../controllers/user');

const isLoggedIn = require('../helper/isLoggedIn');

const {checkType} = require('../config/checkType');

//Routs
router.post("/signup", userCtrl.user_signup_post);
router.post("/signin", userCtrl.user_signin_post);

router.get("/signedin", userCtrl.user_show_get);

router.get("/index", isLoggedIn, userCtrl.user_index_get);
router.delete("/delete", isLoggedIn, userCtrl.user_delete_get);
router.get("/edit", isLoggedIn, userCtrl.user_edit_get);
router.put("/update", isLoggedIn, userCtrl.user_update_put);

router.get("/mycourses", isLoggedIn, userCtrl.user_mycourses_get);


//Export
module.exports = router;
