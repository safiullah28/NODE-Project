const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/productModel");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

const uri = process.env.URI;

mongoose.set("strictQuery", false);
mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected");
        app.listen(port, () => {
            console.log(`App listening on port ${port}!`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/products", async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get("/products", async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/products/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/products/:id", async(req, res) => {
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
});

app.delete("/products/:id", async(req, res) => {
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
});