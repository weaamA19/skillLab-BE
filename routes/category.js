// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require category controller
const categoryCtrl = require('../controllers/category');
const {checkType} = require('../config/checkType');


//Routs
router.get("/add", categoryCtrl.category_add_get);
router.post("/add", categoryCtrl.category_add_post);
router.get("/index", categoryCtrl.category_index_get);
router.get("/detail", categoryCtrl.category_show_get);
router.delete("/delete", categoryCtrl.category_delete_get);
router.get("/edit", categoryCtrl.category_edit_get);
router.put("/update", categoryCtrl.category_update_post);

//Export
module.exports = router;
