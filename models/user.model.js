const mongoose = require("mongoose");
require("mongoose-type-email");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password can't be empty"],
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlist",
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;