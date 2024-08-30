const express = require("express");
const router = express.Router();
const {
  PostProduct,
  GetProducts,
  GetSingleProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../Controller/Controller");

router.get("/products", GetProducts);
router.get("/products/:id", GetSingleProduct);
router.post("/products", PostProduct);
router.put("/products/:id", UpdateProduct);
router.delete("/products/:id", DeleteProduct);

module.exports = router;
