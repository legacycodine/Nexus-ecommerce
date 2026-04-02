const Cart = require("../models/Cart");


// GET USER CART
exports.getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ADD ITEM TO CART
exports.addToCart = async (req, res) => {

  const { productId, quantity } = req.body;

  try {

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      cart.items.push({
        product: productId,
        quantity,
      });

    }

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    res.json(populatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE ITEM QUANTITY
exports.updateCartItem = async (req, res) => {

  const { quantity } = req.body;

  try {

    const cart = await Cart.findOne({ user: req.user._id });

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};



// REMOVE ITEM FROM CART
exports.removeCartItem = async (req, res) => {

  try {

    const cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};



// CLEAR CART
exports.clearCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ message: "Cart cleared" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};