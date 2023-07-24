const jwt = require("jsonwebtoken");
const userCollection = require("../models/users");
const { errorResponse } = require("../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../helper/constant");
const { JWT_SECRET } = require("../config");

module.exports = async function (req, res, next) {
  try {
    //get token from header
    // const token = req.header('token');
    const token = req.cookies.token;

    if (!token)
      return res.render(
        "index",
        errorResponse(StatusCodes.NOT_FOUND, MSG.LOGIN_REQUIRED)
      );
    // return res.send(errorResponse(StatusCodes.NOT_FOUND, MSG.TOKEN_EMPTY));

    const verifyUser = jwt.verify(token, JWT_SECRET);
    const user = await userCollection.findOne({ _id: verifyUser._id });

    if (!user)
      return res.render(
        "index",
        errorResponse(StatusCodes.UNAUTHORIZED, MSG.LOGIN_REQUIRED)
      );
    // return res.send(errorResponse(StatusCodes.UNAUTHORIZED, MSG.TOKEN_INVALID));

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.send(errorResponse(StatusCodes.BAD_REQUEST, MSG.TOKEN_INVALID));
  }
};
