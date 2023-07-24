const ItemService = require("../services/item");
const service = new ItemService();
const { celebrate, Joi } = require("celebrate");
const schemas = require("../helper/admin_schema");
const { errorResponse, successResponse } = require("../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../helper/constant");

module.exports.getAllItem = {
  controller: async function getAllItem(req, res) {
    try {
      let result = await service.getAllItem();
      // res.send(result);

      res.render("products", result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.bookItem = {
  controller: async function removeItemById(req, res) {
    try {
      let itemId = req.params.id;
      let userId = req.user._id;
      let result = await service.bookItem(userId, itemId);

      if (result.status == 200) result = await service.getAllItem();

      result.message = "order book successfully..";
      res.render("products", result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.getMyOrders = {
  controller: async function getMyOrders(req, res) {
    try {
      let userId = req.user._id;
      let result = await service.getMyOrders(userId);
      // res.send(result);

      // console.log(result);
      res.render("my_orders", result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
