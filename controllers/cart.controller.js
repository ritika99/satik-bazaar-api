const cartDb = require("../models/cart.model");
const userDb = require("../models/user.model");

module.exports.addToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
    const user = await userDb.findById(id);
    const cart = await cartDb.findById(user.cart);
    if (cart) {
      if (!cart.cartItems.some(({ product }) => product == productId)) {
        cart.cartItems.push({
          product: productId,
          quantity: 1,
        });
        await cart.save();
      }
    } else {
      const newCart = await cartDb.create({
        by: id,
      });
      await user.update({
        cart: newCart._id,
      });
      await newCart.cartItems.push({
        product: productId,
        quantity: 1,
      });
      await newCart.save();
    }
    const newUser = await userDb.findById(id);
    const data = await (await cartDb.findById(newUser.cart)).execPopulate({
      path: "cartItems",
      populate: { path: "Products" },
    });
    return res.status(201).json({
      success: true,
      data: [...data.cartItems],
      message: "Product added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.removeFromCart = async (req, res) => {
  const { id, productId } = req.params;
  try {
    const user = await userDb.findById(id);
    const cart = await cartDb.findById(user.cart);
    if (cart.cartItems.some(({ product }) => product == productId)) {
      await cart.update({ $pull: { cartItems: { product: productId } } });
    } else {
      return res.status(400).json({
        success: false,
        messafe: "Invalid request",
      });
    }
    const data = await (await cartDb.findById(user.cart)).execPopulate({
      path: "cartItems",
      populate: { path: "Products" },
    });
    return res.status(201).json({
      success: true,
      data: [...data.cartItems],
      message: "Product removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.changeQuantity = async (req, res) => {
  const { id, productId } = req.params;
  const { quantity } = req.body;
  try {
    const user = await userDb.findById(id);
    const cart = await cartDb.findById(user.cart);
    if (
      cart.cartItems.some(({ product }) => product == productId) &&
      quantity > 0
    ) {
      await cart.updateOne({ $pull: { cartItems: { product: productId } } });
      await cart.cartItems.push({
        product: productId,
        quantity: quantity,
      });
      await cart.save();
      const data = await (await cartDb.findById(user.cart)).execPopulate({
        path: "cartItems",
        populate: { path: "Products" },
      });
      return res.status(201).json({
        success: true,
        data: [...data.cartItems],
        message: "Product quantity updated",
      });
    } else {
      return res.status(400).json({
        success: false,
        messafe: "Invalid request",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.getAllCartItems = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userDb.findById(id);
    const cart = await cartDb.findById(user.cart);
    if (cart) {
      const data = await await cart.execPopulate({
        path: "cartItems",
        populate: { path: "Products" },
      });
      return res.status(200).json({
        success: true,
        data: [...data.cartItems],
        message: "Have some cartitems",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: [],
        message: "Cart hasn't been created yet",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "internal server error",
    });
  }
};