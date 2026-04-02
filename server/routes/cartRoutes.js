const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");


// All cart routes require authentication

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.put("/update/:productId", protect, updateCartItem);

router.delete("/remove/:productId", protect, removeCartItem);

router.delete("/clear", protect, clearCart);


module.exports = router;