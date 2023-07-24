const UserService = require("../services/user");
const service = new UserService();
const { celebrate, Joi } = require("celebrate");
const schemas = require("../helper/schemas");
const { errorResponse, successResponse } = require("../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../helper/constant");

module.exports.signup = {
  validator: celebrate({ body: schemas.signup }),
  controller: async function signup(req, res) {
    try {
      let result = await service.signup(req.body);
      res.render("signup", result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.login = {
  validator: celebrate({ body: schemas.login }),
  controller: async function signup(req, res) {
    try {
      // This is a shorter version
      let result = await service.login(req.body);
      // res.send(result);

      //save token in browser...
      if (result.result) {
        res.cookie("token", result.result.token, {
          httponly: true,
          // secure: true,
          maxAge: 7 * 24 * 3600 * 1000,
        });
      }
      // res.redirect('/');
      res.render("login", result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.logout = {
  controller: async function logout(req, res) {
    try {
      res.clearCookie("token");

      // res.redirect('/');
      res.render("login", successResponse(StatusCodes.OK, MSG.LOGOUT_SUCCESS));
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.feedback = {
  validator: celebrate({ body: schemas.feedback }),
  controller: async function feedback(req, res) {
    try {
      let result = await service.feedback(req.body);

      res.render("index", result);
      // res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.forgotPassword = {
  validator: celebrate({ body: schemas.forgotPassword }),
  controller: async function forgotPassword(req, res) {
    try {
      let result = await service.forgotPassword(req.body);

      res.render("forgot_password", result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
