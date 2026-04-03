const express = require("express");
const router = express.Router();
const admin = require("../middleware/adminMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");


// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/:id", getProductById);


// PROTECTED ROUTES
router.post("/", protect, admin, createProduct);


module.exports = router;