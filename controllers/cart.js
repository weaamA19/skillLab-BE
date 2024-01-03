const {User} = require('../models/User');
const {Course} = require('../models/Course');
const { Cart } = require('../models/Cart');

const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// RESTFUL API's

exports.cart_add_get = (req, res) => {
  res.render('cart/add');
}

//This function create a new cart
exports.cart_add_post = (req, res) => {
  console.log(req.body);  
  const cart = new Cart(req.body);
  cart.save()
    .then((cart) => {
        res.json({ cart })
        // res.redirect("/cart/index");
    })
    .catch((err) => {
      console.log(err)
      res.send("Please try again later!!!");
    }) 
}

//This function is to display the cart based on the user_id
exports.cart_index_get = (req, res) => {
  // const { user_id } = req.body;
  console.log(req.query.id)
  console.log("req.body", req.query.id)

  Cart.findOne({ user_id: req.query.id }).populate('user_id').populate('courses')
  .then((cart) => {
        res.json({ cart })
    })
    .catch((err) => {
      console.log(err);
    }) 
}

//Show 
exports.cart_show_get = (req, res) => {
  console.log(req.query.id);
  const {userId} = req.query;
  Cart.findOne({ userId: userId })
  .then((cart) => {
      console.log(cart)
      res.render('cart/detail', {cart, dayjs})
  })
  .catch((err) => {
      console.log(err);
  })
}

//Restful API
exports.cart_delete_get = (req, res) => {
  // console.log(req.query.id);
  Cart.findByIdAndDelete(req.body.id)
  .then((cart) => {
      res.json({cart})
  })
  .catch((err) => {
      console.log(err);
  });
}


exports.cart_edit_get = (req,res) => {
  const { userId } = req.body;
  Cart.findOne({ userId : userId}).populate('user_id')
  .then(cart => {
      res.json({cart})
  })
  .catch(err => {
      console.log(err);
  })
}

// First API Approach for adding new course.
// exports.cart_update_put = (req, res) => {
//   // console.log("Cart ID", req.body._id);
//   // console.log("Body", req.body);

//   const newCourse = req.body.courses; 
//   Cart.findById(req.body._id)
//     .then((cart) => {
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }

//       cart.courses.push(newCourse); // Append the new course to the existing "courses" array

//       return cart.save(); // Save the updated cart
//     })
//     .then((updatedCart) => {
//       res.json({ cart: updatedCart });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ message: 'Error updating cart' });
//     });
// };

// Second Approach to update function 
exports.cart_update_put = async (req, res) => {
  const newCourse = req.body.courses;
  console.log(newCourse)
  try {
    let cart = await Cart.findById(req.body._id);
    
    console.log(cart)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the new course already exists in the cart
    const courseExists = cart.courses.includes(newCourse);

    if (courseExists) {
      return res.status(400).json({ message: 'Course already exists in the cart' });
    }

    cart.courses.push(newCourse); // Append the new course to the existing "courses" array

    let updatedCart = await cart.save(); // Save the updated cart
    
    
    res.json({ cart: updatedCart });
  } catch (error) {
    console.log(error);
      res.status(500).json({ message: 'Error updating cart' });
  }
  
  // Cart.findById(req.body._id)
  //   .then((cart) => {
  //     console.log(cart)
  //     if (!cart) {
  //       return res.status(404).json({ message: 'Cart not found' });
  //     }

  //     // Check if the new course already exists in the cart
  //     const courseExists = cart.courses.includes(newCourse);

  //     if (courseExists) {
  //       return res.status(400).json({ message: 'Course already exists in the cart' });
  //     }

  //     cart.courses.push(newCourse); // Append the new course to the existing "courses" array

  //     return cart.save(); // Save the updated cart
  //   })
  //   .then((updatedCart) => {
  //     res.json({ cart: updatedCart });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json({ message: 'Error updating cart' });
  //   });
};

exports.cart_courses_delete = (req, res) => {
  const { user_id, course_id } = req.params; //obtaining the user id and course id from the params

  Cart.findOne({ user_id }) // Find the cart belonging to the current user
    .then((cart) => {
      const courseIndex = cart.courses.findIndex(course => course.toString() === course_id); //find removed course index

      if (courseIndex !== -1) {
        const updatedCourses = [
          ...cart.courses.slice(0, courseIndex), //creates a new array for all the elements before the removed course
          ...cart.courses.slice(courseIndex + 1) //creates a new array for all the elements after the removed course
        ]; //The (...) are used for arrays concatenation

        cart.courses = updatedCourses;

        cart.save()
          .then(() => {
            res.json({ message: 'Course removed from cart successfully', cart });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error saving the updated cart' });
          });
      } else {
        res.status(404).json({ message: 'Course not found in the cart' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error finding the user cart' });
    });
};