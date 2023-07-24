const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../../middleware/admin_auth");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../../config");
const {
  getHomeData,
  addItem,
  removeUserById,
  removeItemById,
  removeFeedbackById,
  cancelOrderById,
  acceptOrderById,
} = require("../../controllers/admin/item");

// SET STORAGE
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "items",
  },
});
const upload = multer({ storage: storage });

//@route    POST /admin/
//@desc     admin home page
//@access   PRIVATE
router.get("/", auth, getHomeData.controller);

//@route    POST /admin/remove-user/id
//@desc     admin remove user by id
//@access   PRIVATE
router.get("/remove-user/:id", auth, removeUserById.controller);

//@route    POST /admin/remove-item/id
//@desc     admin remove item by id
//@access   PRIVATE
router.get("/remove-item/:id", auth, removeItemById.controller);

//@route    POST /admin/remove-feedback/id
//@desc     admin remove feedback by id
//@access   PRIVATE
router.get("/remove-feedback/:id", auth, removeFeedbackById.controller);

//@route    POST /admin/add-item
//@desc     admin add item
//@access   Private
router.post(
  "/add-item",
  auth,
  upload.array("imgs", 10),
  addItem.validator,
  addItem.controller
);

//@route    GET /admin/cancel-order/id
//@desc     admin cancel order by id
//@access   PRIVATE
router.get("/cancel-order/:id", auth, cancelOrderById.controller);

//@route    GET /admin/accept-order/id
//@desc     admin accept order by id
//@access   PRIVATE
router.get("/accept-order/:id", auth, acceptOrderById.controller);

module.exports = router;
