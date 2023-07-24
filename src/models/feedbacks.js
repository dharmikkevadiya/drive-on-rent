const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { errorResponse, successResponse } = require("../helper/response");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const feedbackSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = feedbackCollection = mongoose.model(
  "feedback",
  feedbackSchema
);
