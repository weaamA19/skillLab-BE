// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require cart controller
const cartCtrl = require('../controllers/cart');
const isLoggedIn = require('../helper/isLoggedIn');

const {checkType} = require('../config/checkType');

//Routes

router.get("/add", isLoggedIn, checkType(1), cartCtrl.cart_add_get);
router.post("/add",isLoggedIn, checkType(1), cartCtrl.cart_add_post);

router.get("/index", isLoggedIn,cartCtrl.cart_index_get);
router.get("/detail", isLoggedIn,cartCtrl.cart_show_get);

router.delete("/delete", isLoggedIn, checkType(1), cartCtrl.cart_delete_get);
router.get("/edit", isLoggedIn, cartCtrl.cart_edit_get);
router.put("/update", isLoggedIn, cartCtrl.cart_update_put);
router.delete(`/courses/:course_id`, isLoggedIn, cartCtrl.cart_courses_delete);
router.get(`/emptycart`, isLoggedIn, cartCtrl.cart_empty);


//Export
module.exports = router;
