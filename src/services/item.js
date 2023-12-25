const MongooseService = require('./mongoose');
const adminCollection = require('../models/admin');
const userCollection = require('../models/users');
const feedbackCollection = require('../models/feedbacks');
const itemCollection = require('../models/item');

const { errorResponse, successResponse } = require('../helper/response');
const { StatusCodes } = require('http-status-codes');
const MSG = require('../helper/constant');

class ItemService {
  constructor() {
    this.service = new MongooseService(userCollection);
    this.itemService = new MongooseService(itemCollection);
  }

  async getAllItem() {
    try {
      let items = await this.itemService.getAll();
      return successResponse(
        StatusCodes.OK,
        'Book Now & Pay later',
        items,
        false
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async bookItem(userId, itemId) {
    try {
      let item = await this.itemService.getOneByField({ _id: itemId });

      if (!item) return successResponse(StatusCodes.NOT_FOUND, MSG.NOT_FOUND);

      let user = await this.service.getOneByField({ _id: userId });

      let newOrder = {
        item: itemId,
        status: 'pending',
        customer: {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
        },
      };
      user.orders.unshift(newOrder);

      await user.save();
      return successResponse(StatusCodes.OK, 'order book' + MSG.SUCCESSFULLY);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async getMyOrders(userId) {
    try {
      let orders = await this.service.getOneByfieldAndPopulate(
        { _id: userId },
        'orders',
        'orders.item'
      );
      return successResponse(StatusCodes.OK, MSG.FOUND_SUCCESS, orders, true);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}

module.exports = ItemService;
