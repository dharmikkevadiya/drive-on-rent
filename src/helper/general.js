const nodemailer = require("nodemailer");
const { errorResponse, successResponse } = require("../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../helper/constant");
const { EMAIL_PASSWORD, EMAIL } = require("../config");

module.exports.getRandomValue = function (len, str) {
  try {
    // const str = '1234567890'; //Random Generate Every Time From This Given Char

    let randomvalue = "";
    for (let i = 0; i < len; i++) {
      const value = Math.floor(Math.random() * str.length);
      randomvalue += str.substring(value, value + 1).toUpperCase();
    }

    return randomvalue;
  } catch (err) {
    console.log(err);
    return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};

module.exports.sendEmailOtp = function (email, content) {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });
    let mailOptions = {
      from: "noreply@driveonrent.com",
      to: email,
      subject: "Email from DriveOnRent",
      html: content,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err.message);
      if (info) console.log("email send successfully:", info);
    });

    return successResponse(StatusCodes.OK, "email send" + MSG.SUCCESSFULLY);
  } catch (err) {
    console.log(err);
    return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};
