const express = require("express");
const router = express.Router();
const auth = require("../../middleware/admin_auth");

const { signup, login, logout } = require("../../controllers/admin/auth");

router.get("/login", (req, res) => {
  res.render("admin/login");
});

//@route    POST /admin/signup
//@desc     admin signup
//@access   PUBLIC
router.post("/signup", signup.controller);

//@route    POST /admin/login
//@desc     admin login
//@access   PUBLIC
router.post("/login", login.validator, login.controller);

//@route    GET /admin/logout
//@desc     admin logout
//@access   PUBLIC
router.get("/logout", auth, logout.controller);

module.exports = router;
