import mongoose from "mongoose";
import crypto from "crypto";
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

UserSchema.methods.validPassword = function (userpassword) {
  var hash = crypto
    .pbkdf2Sync(userpassword, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return this.password === hash;
};
export const User = mongoose.model("user", UserSchema);
