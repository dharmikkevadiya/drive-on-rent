const bcrypt = require("bcryptjs");
const MongooseService = require("../mongoose");
const adminCollection = require("../../models/admin");

const { errorResponse, successResponse } = require("../../helper/response");
const { StatusCodes } = require("http-status-codes");
const MSG = require("../../helper/constant");

class AdminService {
  constructor() {
    this.service = new MongooseService(adminCollection);
  }

  async signup(body) {
    try {
      let adminData = await this.service.create(body);

      return successResponse(StatusCodes.OK, MSG.CREATE_SUCCESS, adminData);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async login(body) {
    try {
      let { email, password } = body;
      let adminData = await this.service.getOneByField({ email });

      // chack email exist or not..
      if (!adminData)
        return successResponse(
          StatusCodes.UNAUTHORIZED,
          MSG.CREDENTIAL_INVALID
        );

      //comapare password with bcrypt
      const isMatch = await bcrypt.compare(password, adminData.password);
      if (!isMatch)
        return successResponse(
          StatusCodes.UNAUTHORIZED,
          MSG.CREDENTIAL_INVALID
        );

      let token = await adminData.generateAuthToken();
      return successResponse(
        StatusCodes.OK,
        MSG.LOGIN_SUCCESS,
        await adminData.filter(token)
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}

module.exports = AdminService;
