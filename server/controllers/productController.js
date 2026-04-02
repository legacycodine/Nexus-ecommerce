const Product = require("../models/Product");


// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// CREATE PRODUCT (Admin)
exports.createProduct = async (req, res) => {

  try {

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      stock: req.body.stock,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};