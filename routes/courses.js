// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require courses controller
const coursesCtrl = require('../controllers/courses');


//Routs
router.get("/add", coursesCtrl.courses_add_get);
router.post("/add",coursesCtrl.courses_add_post);
router.get("/index", coursesCtrl.courses_index_get);
router.get("/detail", coursesCtrl.courses_show_get);
router.delete("/delete", coursesCtrl.courses_delete_get);
router.get("/edit", coursesCtrl.courses_edit_get);
router.put("/update", coursesCtrl.courses_update_post);


//Export
module.exports = router;
