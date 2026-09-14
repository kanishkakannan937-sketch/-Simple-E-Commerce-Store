const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

console.log("ORDER ROUTES LOADED");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-commerce Backend is Running!");
});
app.get("/test", (req, res) => {
    res.send("TEST WORKING");   
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

console.log("ORDERS ROUTE REGISTERED");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });