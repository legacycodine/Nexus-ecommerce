const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderToPaid
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");


// CREATE ORDER
router.post("/", protect, createOrder);


// GET USER ORDERS
router.get("/myorders", protect, getUserOrders);


// GET SINGLE ORDER
router.get("/:id", protect, getOrderById);


// UPDATE ORDER PAYMENT
router.put("/:id/pay", protect, updateOrderToPaid);


module.exports = router;