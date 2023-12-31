const {Courses} = require('../models/Courses');
const {Category} = require('../models/Category');


const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// RESTFUL API's

exports.courses_add_get = (req, res) => {
    Category.find()
    .then((category) => {
        res.json({category})
    })
    .catch((err) =>{
        console.log(err);
    }) 
    
}

exports.courses_add_post = async (req, res) =>{  
    console.log(req.body);  

    let courses = new Courses(req.body);

    
    courses.save()
    .then((courses) => {
        // Category.findById(req.body.category_id)
        // .then((category) => {
        res.json({courses})
        // })
        // .catch((err) =>{
        // console.log(err);
        // }) 
    })
    .catch((err) =>{
        console.log(err);
    }) 

}

exports.courses_index_get = (req, res) => {
    Courses.find().populate('category_id')
    .then((courses) => {
        res.json({courses})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.courses_show_get = (req, res) => {
    console.log(req.query.id);
  
    Courses.findById(req.query.id)
    .then((courses) => {
        console.log(courses)
        res.render('courses/detail', {courses, dayjs})
    })
    .catch((err) => {
        console.log(err);
    })

}

exports.courses_delete_get = (req, res) => {
    console.log(req.query.id); 
    Courses.findByIdAndDelete(req.query.id)
    .then((courses) => {
        res.json({courses})
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.courses_edit_get = (req,res) => {
    Courses.findById(req.query.id).populate('category_id')
    .then(courses => {
        res.json({courses})
    })
    .catch(err => {
        console.log(err);
    })
}

exports.courses_update_post = (req,res) => {
    console.log(req.body._id);

    Courses.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((courses) => {
        res.json({courses})
    })
    .catch((err) => {
        console.log(err);
    })
}
