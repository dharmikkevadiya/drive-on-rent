const mongoose = require("mongoose");
const { errorResponse, successResponse } = require("../helper/response");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
  },
  imgs: [
    {
      url: {
        type: String,
      },
    },
  ],
  price: {
    type: String,
  },
  quantity: {
    type: String,
    default: 1,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ItemCollection = mongoose.model("item", ItemSchema);
