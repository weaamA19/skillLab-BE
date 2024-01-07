// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());
const isLoggedIn = require('../helper/isLoggedIn');

// Require courses controller
const coursesCtrl = require('../controllers/courses');
const {checkType} = require('../config/checkType');

//Routs
router.get("/add", isLoggedIn, coursesCtrl.courses_add_get);
router.post("/add",isLoggedIn, coursesCtrl.courses_add_post);
router.get("/index", coursesCtrl.courses_index_get);
router.get("/detail/:id", coursesCtrl.courses_show_get);
router.delete("/delete", isLoggedIn, coursesCtrl.courses_delete_get);
router.get("/edit", isLoggedIn, coursesCtrl.courses_edit_get);
router.put("/update", isLoggedIn, coursesCtrl.courses_update_post);
router.get('/coursesByCategory/:id', coursesCtrl.CoursesByCategory_get);



//Export
module.exports = router;
