// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require courses controller
const coursesCtrl = require('../controllers/courses');
const {checkType} = require('../config/checkType');
const isLoggedIn = require('../helper/isLoggedIn');

//Routs
router.get("/add", isLoggedIn, checkType(1), coursesCtrl.courses_add_get);
router.post("/add", isLoggedIn, checkType(1), coursesCtrl.courses_add_post);
router.get("/index", isLoggedIn, checkType(1), coursesCtrl.courses_index_get);
router.get("/detail/:id", coursesCtrl.courses_show_get);
router.delete("/delete", isLoggedIn, checkType(1), coursesCtrl.courses_delete_get);
router.get("/edit", isLoggedIn, checkType(1), coursesCtrl.courses_edit_get);
router.put("/update", isLoggedIn, checkType(1), coursesCtrl.courses_update_post);
router.get('/coursesByCategory/:id', coursesCtrl.CoursesByCategory_get);



//Export
module.exports = router;
