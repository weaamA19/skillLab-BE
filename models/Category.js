
const mongoose = require('mongoose');
// Category Schema
const categorySchema = mongoose.Schema({

  name: String,
  avatar: String
}, {
  timestamps: true
})
// auction Model
const Category = mongoose.model("Category", categorySchema);
// Export
module.exports = { Category };









