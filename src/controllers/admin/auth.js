const AdminService = require("../../services/admin/auth");
const ItemService = require("../../services/admin/item");
const itemService = new ItemService();
const service = new AdminService();
const { celebrate, Joi } = require("celebrate");
const schemas = require("../../helper/schemas");
const { errorResponse, successResponse } = require("../../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../../helper/constant");
const { login } = require("../user");

module.exports.signup = {
  controller: async function signup(req, res) {
    try {
      let result = await service.signup(req.body);
      res.send(result);
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
      let result = await service.login(req.body);

      if (result.status != 200) return res.render("admin/login", result);

      //save token in browser...
      if (result.result) {
        res.cookie("token", result.result.token, {
          httponly: true,
          // secure: true,
          // maxAge: 3600000
        });
      }
      result = await itemService.getHomeData();
      res.render("admin/index", result);
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
      res.render(
        "admin/login",
        successResponse(StatusCodes.OK, MSG.LOGOUT_SUCCESS)
      );
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
