
const mongoose = require('mongoose');
// Category Schema
const categorySchema = mongoose.Schema({

  name: String
  // item_img: {
  //   type: String,
  //   default: "",
  // },
}, {
  timestamps: true
})
// auction Model
const Category = mongoose.model("Category", categorySchema);
// Export
module.exports = { Category };









