//require the model
const {Transactions} = require('../models/Transactions')
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