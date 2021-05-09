const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
{
    name: {
        type: String,
        required: [true, "name is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
    about: {
        type: String,
        required: [true, "about is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    rating: {
        type: Number,
        required: [true, "rating is required"],
    },
    inStock: {
        type: Boolean,
        required: [true, "inStoke is required"],
    },
    brand: {
        type: String,
        required: [true, "brand is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    special: {
        type: String,
        required: [true, "special is required"],
    },
    offer: {
        type: String,
        required: [true, "offer is required"],
    },
    fastDelivery: {
        type: Boolean,
        requird: [true, "fastDelivery is required"],
    },
    freeShipping: {
        type: Boolean,
        requird: [true, "freeShipping is required"],
    },
},
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;