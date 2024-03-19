import mongoose from "mongoose";

const cartCollections = "carts"

const cartSchema = new mongoose.Schema({
    id: {
        unique: true,
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
})

export const cartModel = mongoose.model(cartCollections, cartSchema);
