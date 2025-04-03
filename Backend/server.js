require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(cors());

   mongoose.connect('mongodb://localhost:27017/E-commerce')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api", productRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
