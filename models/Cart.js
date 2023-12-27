const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courses'
    }],

  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("User", userSchema);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = { Cart };
