const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  signup,
  login,
  logout,
  feedback,
  forgotPassword,
} = require("../controllers/user");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/forgot-password", (req, res) => {
  res.render("forgot_password");
});

//@route    POST /user/signup
//@desc     user signup
//@access   PUBLIC
router.post("/signup", signup.validator, signup.controller);

//@route    POST /user/login
//@desc     user login
//@access   PUBLIC
router.post("/login", login.validator, login.controller);

//@route    POST /user/logout
//@desc     user logout
//@access   PUBLIC
router.get("/logout/", auth, logout.controller);

//@route    POST /user/forgot-password
//@desc     user forgot password
//@access   PUBLIC
router.post(
  "/forgot-password",
  forgotPassword.validator,
  forgotPassword.controller
);

//@route    POST /user/feedback
//@desc     user feedback
//@access   PUBLIC
router.post("/feedback", feedback.validator, feedback.controller);
module.exports = router;
