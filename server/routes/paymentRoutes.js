const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  stripeWebhook,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/checkout/:orderId", protect, createCheckoutSession);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

module.exports = router;