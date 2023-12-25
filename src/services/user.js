const MongooseService = require('./mongoose');
const userCollection = require('../models/users');
const feedbackCollection = require('../models/feedbacks');
const bcrypt = require('bcryptjs');
const { getRandomValue, sendEmailOtp } = require('../helper/general');
const { errorResponse, successResponse } = require('../helper/response');
const { StatusCodes } = require('http-status-codes');
const MSG = require('../helper/constant');

class UserService {
  constructor() {
    this.service = new MongooseService(userCollection);
    this.feedbackService = new MongooseService(feedbackCollection);
  }

  async signup(body) {
    try {
      let { name, email, phone_no, gender, country, address, password } = body;
      let userData = await this.service.getOneByField({ email });

      if (userData)
        return successResponse(StatusCodes.BAD_REQUEST, MSG.EMAIL_ALREADY);

      userData = await this.service.create(body);
      return successResponse(
        StatusCodes.CREATED,
        MSG.SIGNUP_SUCCESS,
        await userData.filter()
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async login(body) {
    try {
      let { email, password } = body;
      let userData = await this.service.getOneByField({ email });
      // chack email exist or not..
      if (!userData)
        return successResponse(
          StatusCodes.UNAUTHORIZED,
          MSG.CREDENTIAL_INVALID
        );

      //comapare password with bcrypt
      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch)
        return successResponse(
          StatusCodes.UNAUTHORIZED,
          MSG.CREDENTIAL_INVALID
        );

      let token = await userData.generateAuthToken();
      return successResponse(
        StatusCodes.CREATED,
        MSG.LOGIN_SUCCESS,
        await userData.filter(token)
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async feedback(body) {
    try {
      let { name, email, description } = body;

      let feedback = await this.feedbackService.create(body);
      return successResponse(
        StatusCodes.CREATED,
        MSG.FEEDBACK_SENT_SUCCESS,
        feedback
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async forgotPassword(body) {
    try {
      let { email } = body;
      let userData = await this.service.getOneByField({ email }, 'email: 1');

      if (userData) {
        let pass = 'lorem' + getRandomValue(4, '123456789');

        const htmlContent = `<p>Hello,</p>
          <p>Your new password is: <strong>${pass}</strong></p>
          <p>Please use this password to log in to your account. We recommend changing your password after logging in for security reasons.</p>
          <p>Best regards,<br>DriveOnRent Team</p>`;

        sendEmailOtp(email, htmlContent);
        userData.password = pass;
        await userData.save();

        return successResponse(StatusCodes.OK, MSG.PASSWORD_SEND_SUCCESS);
      } else return successResponse(StatusCodes.NOT_FOUND, MSG.EMAIL_NOT_EXIST);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}

module.exports = UserService;
