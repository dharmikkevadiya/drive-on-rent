const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Generate Token
adminSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, JWT_SECRET);
    return token;
  } catch (err) {
    console.log(`the error part: ${err}`);
    res.send(`the error part: ${err}`);
  }
};

// bcrypt password
adminSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      console.log("Password encrypted successfully........");
    }

    next();
  } catch (e) {
    console.log(e);
  }
});

adminSchema.methods.filter = async function (token) {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    date: this.date,
    token: token,
  };
};
let adminCollection = new mongoose.model("admin", adminSchema);
module.exports = adminCollection;
