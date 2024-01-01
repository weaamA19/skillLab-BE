const {User} = require('../models/User');
const {Courses} = require('../models/Courses');
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

//This function is to display the cart
exports.cart_index_get = (req, res) => {
  // const { userId } = req.query;
  // Cart.findOne({ userId: userId }).populate('user_id').populate('courses')
  Cart.find().populate('user_id').populate('courses') 
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

//This Code creates a new array donot add on the existing one !
// exports.cart_update_put = (req, res) => {
//   console.log(req.body._id);

//   const updatedCart = req.body;
//   Cart.findByIdAndUpdate(req.body._id, updatedCart, { new: true })
//     .then((cart) => {
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }
//       res.json({ cart });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ message: 'Error updating cart' });
//     });
// };

// This New Update function was used to ensure that 
exports.cart_update_put = (req, res) => {
  // console.log("Cart ID", req.body._id);
  // console.log("Body", req.body);

  const newCourse = req.body.courses; 
  Cart.findById(req.body._id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.courses.push(newCourse); // Append the new course to the existing "courses" array

      return cart.save(); // Save the updated cart
    })
    .then((updatedCart) => {
      res.json({ cart: updatedCart });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error updating cart' });
    });
};