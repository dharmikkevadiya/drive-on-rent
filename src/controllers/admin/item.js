const ItemService = require("../../services/admin/item");
const service = new ItemService();
const { celebrate, Joi } = require("celebrate");
const schemas = require("../../helper/admin_schema");
const { errorResponse, successResponse } = require("../../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../../helper/constant");

module.exports.getHomeData = {
  controller: async function getHomeData(req, res) {
    try {
      let result = await service.getHomeData();
      // res.send(result);

      res.render("admin/index", result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.removeUserById = {
  controller: async function removeUserById(req, res) {
    try {
      let userId = req.params.id;
      let result = await service.removeUserById(userId);

      if (result.status == 200) {
        result = await service.getHomeData();
        result.message = "user delete successfully...";
        res.render("admin/index", result);
      } else res.redirect("/admin");
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.removeItemById = {
  controller: async function removeItemById(req, res) {
    try {
      let itemId = req.params.id;
      let result = await service.removeItemById(itemId);

      if (result.status == 200) {
        result = await service.getHomeData();
        result.message = "item delete successfully...";
        res.render("admin/index", result);
      } else res.redirect("/admin/#menu2");
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.removeFeedbackById = {
  controller: async function removeFeedbackById(req, res) {
    try {
      let feedbackId = req.params.id;
      let result = await service.removeFeedbackById(feedbackId);

      if (result.status == 200) {
        result = await service.getHomeData();
        result.message = "feedback delete successfully...";
        res.render("admin/index", result);
      } else res.redirect("/admin");
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.addItem = {
  validator: celebrate({ body: schemas.addItem }),
  controller: async function addItem(req, res) {
    try {
      if (!req.files)
        return res.send(
          successResponse(StatusCodes.NOT_FOUND, "image" + MSG.FIELD_REQUIRED)
        );

      let result = await service.addItem(req.body, req.files);

      if (result.status == 200) {
        result = await service.getHomeData();
        result.message = "item added successfully...";
        res.render("admin/index", result);
      } else res.redirect("/admin");
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.cancelOrderById = {
  controller: async function cancelOrderById(req, res) {
    try {
      let orderId = req.params.id;
      let result = await service.cancelOrderById(orderId);

      if (result.status == 200) {
        result = await service.getHomeData();
        result.message = "order cancel successfully...";
        res.render("admin/index", result);
      } else res.redirect("/admin");
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.acceptOrderById = {
  controller: async function acceptOrderById(req, res) {
    try {
      let orderId = req.params.id;
      let result = await service.acceptOrderById(orderId);

      if (result.status == 200) {
        result = await service.getHomeData();
        result.message = "order accept successfully...";
        res.render("admin/index", result);
      } else res.redirect("/admin");
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
