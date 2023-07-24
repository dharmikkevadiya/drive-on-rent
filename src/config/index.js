require("dotenv").config();

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/drive-on-rent";
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const PORT = process.env.PORT;

module.exports = {
  MONGODB_URL,
  PORT,
  JWT_SECRET,
  EMAIL_PASSWORD,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  EMAIL,
};
