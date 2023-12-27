const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new Schema( 
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    },

    amount: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("transactions", transactionsSchema);

const Transactions = mongoose.model("Transactions", transactionsSchema);
module.exports = {Transactions};
