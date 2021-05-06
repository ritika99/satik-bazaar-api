const userDb = require("../models/user.model");
const wishlistDb = require("../models/wishlist.model");

module.exports.addToWishlist = async (req, res) => {
const { id } = req.params;
const { productId } = req.body;
try {
    const user = await userDb.findById(id);
    const wishlist = await wishlistDb.findById(user.wishlist);
    if (wishlist) {
      if (!wishlist.wishlistItems.some((product) => product == productId)) {
        wishlist.wishlistItems.push(productId);
        await wishlist.save();
      }
    } else {
      const newWishlist = await wishlistDb.create({
        by: id,
      });
      await user.update({
        wishlist: newWishlist._id,
      });
      await newWishlist.wishlistItems.push(productId);
      await newWishlist.save();
    }
    const newUser = await userDb.findById(id);
    const data = await (
      await wishlistDb.findById(newUser.wishlist)
    ).execPopulate({ path: "wishlistItems", populate: { path: "products" } });

    return res.status(201).json({
      success: true,
      data: [...data.wishlistItems],
      message: "Product added to wishlist",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "Internal error",
    });
  }
};

module.exports.removeFromWishlist = async (req, res) => {
  const { id, productId } = req.params;
  try {
    const user = await userDb.findById(id);
    const wishlist = await wishlistDb.findById(user.wishlist);
    if (wishlist.wishlistItems.some((product) => product == productId)) {
      await wishlist.update({ $pull: { wishlistItems: productId } });
    } else {
      return res.status(400).json({
        success: false,
        messafe: "Invalid request",
      });
    }
    const newUser = await userDb.findById(id);
    const data = await (
      await wishlistDb.findById(newUser.wishlist)
    ).execPopulate({ path: "wishlistItems", populate: { path: "products" } });

    return res.status(201).json({
      success: true,
      data: [...data.wishlistItems],
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "Internal error",
    });
  }
};

module.exports.getAllwishlistItems = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userDb.findById(id);
    const wishlist = await wishlistDb.findById(user.wishlist);
    if (wishlist) {
      const data = await (
        await wishlistDb.findById(user.wishlist)
      ).execPopulate({ path: "wishlistItems", populate: { path: "products" } });
      return res.status(201).json({
        ok: true,
        data: [...data.wishlistItems],
        message: "Product added to wishlist",
      });
    } else {
      return res.status(200).json({
        ok: true,
        data: [],
        message: "Wishlist hasn't been created yet",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};
