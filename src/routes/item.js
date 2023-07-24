const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { getAllItem, bookItem, getMyOrders } = require("../controllers/item");

//@route    POST /user/item-list
//@desc     get all item
//@access   PRIVATE
router.get("/item-list", auth, getAllItem.controller);

//@route    GET /user/book-item/id
//@desc     user book item by id
//@access   PRIVATE
router.get("/book-item/:id", auth, bookItem.controller);

//@route    GET /user/my-orders
//@desc     get my orders
//@access   PRIVATE
router.get("/my-orders", auth, getMyOrders.controller);

module.exports = router;
