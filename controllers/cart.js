const User = require('../models/User')
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
  // console.log("req.body", req.query.id)
  // console.log(req.user)

  Cart.findOne({ user_id: req.user.id }).populate('user_id').populate('courses')
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
  // const {userId} = req.query;
  Cart.findOne({ user_id: req.user.id })
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
  // const { userId } = req.body;
  Cart.findOne({ user_id: req.user.id }).populate('user_id')
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
  console.log("newCourse", newCourse)
  try {
    let cart = await
      Cart.findOne({ user_id: req.user.id })
        .then(cr => {
          if (cr) {
    // Check if the new course already exists in the cart
    const courseExists = cr.courses.includes(newCourse);

    if (courseExists) {
        console.log("Course already exists in the cart")

        return res.status(200).json({ message: 'Course already exists in the cart' });
      }

      cr.courses.push(newCourse); // Append the new course to the existing "courses" array

      let updatedCart = cr.save(); // Save the updated cart
      
      console.log("Course added to the cart")
      return res.status(200).json({ 
        message: 'Course was added to the cart!', 
        cart: updatedCart 
      });
          }
          else {
            const cart = new Cart({ user_id: req.user.id })
            // Check if the new course already exists in the cart
            const courseExists = cart.courses.includes(newCourse);

            if (courseExists) {
                console.log("Course already exists in the cart")

                return res.status(200).json({ message: 'Course already exists in the cart' });
              }

              cart.courses.push(newCourse); // Append the new course to the existing "courses" array

              let updatedCart = cart.save(); // Save the updated cart
              
              console.log("Course added to the cart")
              return res.status(200).json({ 
                message: 'Course was added to the cart!', 
                cart: updatedCart 
              });
          }
        })
        .catch(err => {
          console.log(err)
        })

    if (!cart) {
      console.log("cart not found")
      return res.status(404).json({ message: 'Cart not found' });
    }
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
  // const { user_id, course_id } = req.params; //obtaining the user id and course id from the params
  const { course_id } = req.params; //obtaining the user id and course id from the params

  Cart.findOne({ user_id: req.user.id }) // Find the cart belonging to the current user
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


//Approach 1: Adding Rest API to save the cart items before  clearing the cart
// exports.cart_empty =  (req, res) => {
//   console.log(req.user.id);
//   // Get User
//   User.findById(req.user.id)
//     .then((userModel) => {
//       console.log(userModel)
//       if (!userModel) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // Get Cart
//       Cart.findOne({ user_id: req.user.id }).populate('user_id')
//         .then((cart) => {
//           if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//           }

//           // Add Courses from cart to user
//           userModel.enrolledCourses.push(...cart.courses);

//           //Save user
//           userModel.save()
//           .then((savedEnrolledCourses) => {
//             res.status(201).json(savedEnrolledCourses); // Respond with the saved item
//           })
//           .catch((error) => {
//             console.error('Error saving Enrolled Course:', error);
//             res.status(500).json({ message: 'Error saving Enrolled Course' });
//           });

//           // Empty cart
//           cart.courses = [];

//           //save cart
//           cart.save()
//           .then((savedEmptyCart) => {
//             res.status(201).json(savedEmptyCart);
//           })
//           .catch((error) => {
//             console.error('Error saving item:', error);
//             res.status(500).json({ message: 'Error saving item' });
//           });

//           // Return Empty Cart
//           return res.status(200).json({
//             message: 'You have successfully made your transaction !',
//             cart: savedCart
//           });
          
//         })
//         .catch((error) => {
//           console.error('Error finding cart:', error);
//           res.status(500).json({ message: 'Error finding cart' });
//         });
//     })User
//     .catch((error) => {
//       console.error('Error finding user:', error);
//       res.status(500).json({ message: 'Error finding user' });
//     });
// };

//Approach 2: Converting to async function
exports.cart_empty = async (req, res) => {
  try {
    console.log(req.user.id);
    
    // Get User
    const userModel = await User.findById(req.user.id);
    console.log(userModel);

    if (!userModel) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get Cart
    const cart = await Cart.findOne({ user_id: req.user.id }).populate('user_id');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Add Courses from cart to user
    userModel.enrolledCourses.push(...cart.courses);

    // Save user
    const savedEnrolledCourses = await userModel.save();

    // Empty cart
    cart.courses = [];

    // Save cart
    const savedEmptyCart = await cart.save();

    // Return Empty Cart
    return res.status(200).json({
      message: 'You have successfully made your transaction!',
      enrolledCourses: savedEnrolledCourses,
      emptyCart: savedEmptyCart
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};