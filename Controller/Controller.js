const Product = require("../models/productModel");

const GetProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const PostProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product", error.message);
    res.status(500).json({ message: error.message });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      //Product not found in the database
      return res
        .status(404)
        .json({ message: "Product with id " + id + " not found" });
    }
    //Product updated successfully
    const foundedProduct = await Product.findById(id);
    res.status(200).json(foundedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if (!product) {
      //Product not found in the database
      return res
        .status(404)
        .json({ message: "Product with id " + id + " not found" });
    }
    //Product updated successfully
    const foundedProduct = await Product.findById(id);
    res.status(200).json(foundedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  PostProduct,
  GetProducts,
  GetSingleProduct,
  UpdateProduct,
  DeleteProduct,
};
