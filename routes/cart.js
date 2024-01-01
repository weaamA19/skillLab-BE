// Load express module
const express = require('express');

// Initialize router functionality from express framework.
const router = express.Router();

router.use(express.json());

// Require cart controller
const cartCtrl = require('../controllers/cart');


//Routes

router.get("/add", cartCtrl.cart_add_get);
router.post("/add", cartCtrl.cart_add_post);

router.get("/index", cartCtrl.cart_index_get);
router.get("/detail", cartCtrl.cart_show_get);

router.delete("/delete", cartCtrl.cart_delete_get);
router.get("/edit", cartCtrl.cart_edit_get);
router.put("/update", cartCtrl.cart_update_put);


//Export
module.exports = router;
