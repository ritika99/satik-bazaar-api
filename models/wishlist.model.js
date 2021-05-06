const mongoose = require("mongoose");

const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    wishlistItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;