// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require category controller
const categoryCtrl = require('../controllers/category');
const {checkType} = require('../config/checkType');
const isLoggedIn = require('../helper/isLoggedIn');
// Adding Multer
const upload = require('../config/multer'); // Path to your Multer configuration

//Routes
router.get("/add", isLoggedIn, categoryCtrl.category_add_get);
router.post("/add", isLoggedIn, checkType(1), upload.single('avatar'), categoryCtrl.category_add_post);
router.get("/index", categoryCtrl.category_index_get);
router.get("/detail", isLoggedIn, categoryCtrl.category_show_get);
router.delete("/delete", isLoggedIn, categoryCtrl.category_delete_get);
router.get("/edit", isLoggedIn, categoryCtrl.category_edit_get);
router.put("/update", isLoggedIn, upload.single('avatar'), categoryCtrl.category_update_post);

//Export
module.exports = router;
