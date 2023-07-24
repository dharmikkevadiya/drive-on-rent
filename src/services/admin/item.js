const MongooseService = require("../mongoose");
const adminCollection = require("../../models/admin");
const userCollection = require("../../models/users");
const feedbackCollection = require("../../models/feedbacks");
const itemCollection = require("../../models/item");
const { errorResponse, successResponse } = require("../../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../../helper/constant");

class ItemService {
  constructor() {
    this.service = new MongooseService(adminCollection);
    this.userService = new MongooseService(userCollection);
    this.feedbackService = new MongooseService(feedbackCollection);
    this.itemService = new MongooseService(itemCollection);
  }

  async getHomeData() {
    try {
      let users = await this.userService.getAll();
      let feedbacks = await this.feedbackService.getAll();
      let items = await this.itemService.getAll();
      // let orders = await this.userService.getAll("orders");
      let orders = await this.userService.getAllByfieldAndPopulate(
        {},
        null,
        "orders.item"
      );

      let obj = {
        users,
        feedbacks,
        items,
        orders,
      };
      return successResponse(StatusCodes.OK, MSG.FOUND_SUCCESS, obj, true);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async removeUserById(userId) {
    try {
      let user = await this.userService.deleteOneByField({ _id: userId });

      if (user) return successResponse(StatusCodes.OK, MSG.DELETE_SUCCESS);
      else return successResponse(StatusCodes.NOT_FOUND, MSG.NOT_FOUND);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  async removeItemById(itemId) {
    try {
      let item = await this.itemService.deleteOneByField({ _id: itemId });

      if (item) {
        return successResponse(StatusCodes.OK, MSG.DELETE_SUCCESS);
      } else return successResponse(StatusCodes.NOT_FOUND, MSG.NOT_FOUND);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async removeFeedbackById(feedbackId) {
    try {
      let feedback = await this.feedbackService.deleteOneByField({
        _id: feedbackId,
      });

      if (feedback) return successResponse(StatusCodes.OK, MSG.DELETE_SUCCESS);
      else return successResponse(StatusCodes.NOT_FOUND, MSG.NOT_FOUND);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  async addItem(body, files) {
    try {
      let { name, price, qunatity, description } = body;
      let arr = [];

      files.forEach((element) => {
        arr.unshift({
          url: element.path,
        });
      });

      body.imgs = arr;
      let items = await this.itemService.create(body);

      return successResponse(
        StatusCodes.OK,
        "item" + MSG.UPLOAD_SUCCESS,
        items
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async cancelOrderById(orderId, userId) {
    try {
      let found = false;

      let userData = await this.userService.getOneByField({
        "orders._id": orderId,
      });

      for (let i = 0; i < userData.orders.length; i++) {
        const element = userData.orders[i];

        if (element._id == orderId) {
          if (element.status === "cancelld")
            return successResponse(
              StatusCodes.BAD_REQUEST,
              MSG.ALREADY + "cancelled !!"
            );

          userData.orders[i].status = "cancelld";
          await userData.save();
          found = true;
          break;
        }
      }
      if (found)
        return successResponse(
          StatusCodes.OK,
          MSG.SUCCESSFULLY + "order cancelled",
          userData
        );
      else return successResponse(StatusCodes.NOT_FOUND, MSG.NOT_FOUND);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async acceptOrderById(orderId, userId) {
    try {
      let found = false;

      let userData = await this.userService.getOneByField({
        "orders._id": orderId,
      });

      for (let i = 0; i < userData.orders.length; i++) {
        const element = userData.orders[i];

        if (element._id == orderId) {
          if (element.status === "Out For Delivery")
            return successResponse(
              StatusCodes.BAD_REQUEST,
              MSG.ALREADY + "accepted !!"
            );

          userData.orders[i].status = "Out For Delivery";
          await userData.save();
          found = true;
          break;
        }
      }
      if (found)
        return successResponse(
          StatusCodes.OK,
          MSG.SUCCESSFULLY + "order accepted",
          userData
        );
      else return successResponse(StatusCodes.NOT_FOUND, MSG.NOT_FOUND);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}

module.exports = ItemService;
