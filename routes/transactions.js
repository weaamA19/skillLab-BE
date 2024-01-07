// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require transactions controller
const transactionsCtrl = require('../controllers/transactions');
const {checkType} = require('../config/checkType');
const isLoggedIn = require('../helper/isLoggedIn');

//Routs
router.get('/index', isLoggedIn, transactionsCtrl.transactions_index_get)
router.get('/add', isLoggedIn, transactionsCtrl.transactions_create_get)
router.post('/add', isLoggedIn, transactionsCtrl.transactions_create_post)
router.get('/detail', isLoggedIn, transactionsCtrl.transaction_show_get)
router.delete('/delete', isLoggedIn, checkType(1), transactionsCtrl.transactions_delete_get)
router.get('/edit', isLoggedIn, transactionsCtrl.transactions_edit_get)
router.put('/update', isLoggedIn, transactionsCtrl.transactions_update_put)
router.get("/:cartId", isLoggedIn, transactionsCtrl.transactions_calculateTotalAmount);


//Export
module.exports = router;
