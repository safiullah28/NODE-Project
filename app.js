const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
const uri = process.env.URI;
const router = require("./Router/router.js");

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

app.use("/", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("GET request received");
});
