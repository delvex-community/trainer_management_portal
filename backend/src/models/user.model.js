import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    contact: {
      type: Number,
    },
    password: {
      type: String,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = CryptoJS.AES.encrypt(
    this.password,
    process.env.ENCRYPT_SECRET_KEY
  ).toString();

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const bytes = CryptoJS.AES.decrypt(
    this.password,
    process.env.ENCRYPT_SECRET_KEY
  );

  return bytes.toString(CryptoJS.enc.Utf8) === password;
};

userSchema.methods.generateUserToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15d",
    }
  );
};

export const User = mongoose.model("User", userSchema);
