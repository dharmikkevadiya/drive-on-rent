module.exports.successResponse = function (sts, msg, res) {
  return { status: sts, message: msg, result: res };
  // return "hello"
};

module.exports.errorResponse = function (sts = 501, msg = "Server Error") {
  return { status: sts, message: msg };
  // return "hello"
};
