// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require transactions controller
const transactionsCtrl = require('../controllers/transactions');


//Routs
router.get('/index', transactionsCtrl.transactions_index_get)
router.get('/add', transactionsCtrl.transactions_create_get)
router.post('/add', transactionsCtrl.transactions_create_post)
router.get('/detail', transactionsCtrl.transaction_show_get)
router.delete('/delete', transactionsCtrl.transactions_delete_get)
router.get('/edit', transactionsCtrl.transactions_edit_get)
router.put('/update', transactionsCtrl.transactions_update_put)
router.get("/:cartId", transactionsCtrl.transactions_calculateTotalAmount);


//Export
module.exports = router;
