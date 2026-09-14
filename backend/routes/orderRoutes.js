const express = require("express");
const Order = require("../models/order");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Place a new order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // Check stock
        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} is out of stock or insufficient stock`
                });
            }
        }

        // Reduce stock
        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: { stock: -item.quantity }
                }
            );
        }

        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            shippingAddress
        });

        const savedOrder = await order.save();

        res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to place order",
            error: error.message
        });
    }
});

// Get logged-in user's orders
router.get("/my-orders", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        })
            .populate("user", "name email")
            .populate("items.product", "name price")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });
    }
});

// Update order status
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order status updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update order status",
            error: error.message
        });
    }
});

module.exports = router;