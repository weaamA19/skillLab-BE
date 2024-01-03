//require the model
const { Transactions } = require('../models/Transactions')
const { Cart } = require('../models/Cart');

//dayjs related
const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//Restful API

///index page
exports.transactions_index_get = (req,res) => {
Transactions.find()
.then((transactions) =>{
    res.json({transactions})
}
)
.catch(err => {
    console.log('error in showing')
    console.log(err)
})
}

////detail page
exports.transaction_show_get = (req , res ) => {
    console.log(req.body.id)
    Transactions.findById(req.query.id)
    .then((transactions) => {
        // res.render("transactions/detail" , {transactions,dayjs})
        res.json({transactions})
    })
    .catch((err) => {
        console.log(err)
    })
}

//adding part 1
exports.transactions_create_get = (req,res) => {
    res.render('transactions/add')
}

//adding part 2
exports.transactions_create_post = (req, res) => {
    console.log(req.body);
    //retreive the cart id 
   

    let transactions = new Transactions(req.body);
  
    // Save transactions
    transactions.save()
    .then((transactions) => {
      res.json({transactions})
    
    })
    .catch((err) => {
      console.log(err);
      res.send("Try Again Later!!")
    })
  }

exports.transactions_delete_get = (req,res) => {
console.log(req.query.id)
Transactions.findByIdAndDelete(req.query.id)
.then((transactions) => {
    res.json({transactions})
})

.catch(err => {
    console.log('Cannot Delete')
    console.log(err)
})

}

exports.transactions_edit_get = (req,res) => {
    Transactions.findById(req.query.id)
    .then((transactions) => {
     res.json({transactions})
    })

    .catch((err) => {
        console.log(err)
    })
}


exports.transactions_update_put = (req,res) => {
    console.log(req.body._id)
    Transactions.findByIdAndUpdate(req.body._id, req.body, {new:true})
    .then((transactions) => {
        res.json({transactions})
    })

    .catch(err => {
        console.log(err)
    })

}

//An API to calculate the total amount of cart
exports.transactions_calculateTotalAmount = (req, res) => {
    const id = req.params.cartId;

    Cart.findById(id)
        .populate('user_id')
        .populate('courses')
        .then((cart) => {
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found !' });
            }

            const totalPrice = cart.courses.reduce((total, course) => total + course.price, 0);

            // Check if there is an existing transaction for this cart
            Transactions.findOne({ cart_id: cart._id })
                .then((existingTransaction) => {
                    if (existingTransaction) {
                        // Update the amount in the existing transaction
                        existingTransaction.amount = totalPrice;
                        existingTransaction.save()
                            .then((updatedTransaction) => {
                                res.json({ totalPrice, updatedTransaction });
                            })
                            .catch((error) => {
                                console.error('Error updating transaction:', error);
                                res.status(500).json({ message: 'Error updating transaction' });
                            });
                    } else {
                        // Create a new transaction object
                        const newTransaction = new Transactions({
                            cart_id: cart._id,
                            amount: totalPrice,
                        });

                        // Save the new transaction
                        newTransaction.save()
                            .then((savedTransaction) => {
                                res.json({ totalPrice, savedTransaction });
                            })
                            .catch((error) => {
                                console.error('Error saving transaction:', error);
                                res.status(500).json({ message: 'Error saving transaction' });
                            });
                    }
                })
                .catch((error) => {
                    console.error('Error finding transaction:', error);
                    res.status(500).json({ message: 'Error finding transaction' });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}
