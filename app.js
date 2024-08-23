const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const uri =
    "mongodb+srv://MERN:MERN@cluster0.99ai1.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=Cluster0";

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
app.get("/blog", (req, res) => {
    res.send("Hello Blog!");
    console.log("GET request on blog");
});