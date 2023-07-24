const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { errorResponse } = require("../helper/response");
const { StatusCodes } = require("http-status-codes");
const { JWT_SECRET } = require("../config");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_no: {
    type: String,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
      },
      status: {
        type: String,
      },
      customer: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        address: {
          type: String,
        },
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

//GENERATING TOKENS
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, JWT_SECRET);
    return token;
  } catch (err) {
    console.log(err);
    res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
  }
};
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);

      console.log("Password encrypted successfully........");
    }
    next();
  } catch (err) {
    console.log(err);
    // Handle the error appropriately, but avoid using `res.send()` here since it's not part of the HTTP cycle.
  }
});

UserSchema.methods.filter = async function (token) {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone_no: this.mobile,
    gender: this.gender,
    country: this.country,
    address: this.address,
    date: this.date,
    token: token,
  };
};

module.exports = userCollection = mongoose.model("user", UserSchema);
