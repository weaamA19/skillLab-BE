const {Course} = require('../models/Course');
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

    let courses = new Course(req.body);

    
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
    Course.find().populate('category_id')
    .then((courses) => {
        res.json({courses})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.courses_show_get = (req, res) => {
    console.log(req.params.id);
  
    Course.findById(req.params.id)
    .then((courses) => {
        console.log(courses)
        res.json({courses, dayjs})
    })
    .catch((err) => {
        console.log(err);
    })

}

exports.courses_delete_get = (req, res) => {
    console.log(req.query.id); 
    Course.findByIdAndDelete(req.query.id)
    .then((courses) => {
        res.json({courses})
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.courses_edit_get = (req,res) => {
    Course.findById(req.query.id).populate('category_id')
    .then(courses => {
        res.json({courses})
    })
    .catch(err => {
        console.log(err);
    })
}

exports.courses_update_post = (req,res) => {
    console.log(req.body._id);

    Course.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((courses) => {
        res.json({courses})
    })
    .catch((err) => {
        console.log(err);
    })
}

// First Approach (Without Routes)
// exports.CoursesByCategory_get  = (req, res) => {
//     const { categoryId } = req.query; 
  
//     Course.find({ 'category_id': categoryId }).populate('category_id')
//       .then((coursesArray) => {
//           res.json({ coursesArray });
//       })
//       .catch((error) => {
//         console.error('Error fetching courses by category:', error);
//         res.status(500).json({ message: 'Error fetching courses by category' });
//       });
// };

// Second Approach (Adding the Routes)
exports.CoursesByCategory_get  = (req, res) => {
    console.log(req.params.id);
  
    const { id: categoryId } = req.params;
  
    Course.find({ 'category_id': categoryId }).populate('category_id')
      .then((coursesArray) => {
        res.json({ coursesArray });
      })
      .catch((error) => {
        console.error('Error fetching courses by category:', error);
        res.status(500).json({ message: 'Error fetching courses by category' });
      });
  };