const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    category_id: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },

    title: {
      type: String,
      required: true
    },

    duration: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: String,
      required: true
    }

  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("User", userSchema);

const Courses = mongoose.model("Courses", coursesSchema);
module.exports = {Courses};
