import mongoose from "mongoose";
import { Schema } from "mongoose";
const cartCollections = "carts"

const cartSchema = new mongoose.Schema({
    id: {
        unique: true,
        type: String,
        required: true
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'products' }]
})

export const cartModel = mongoose.model(cartCollections, cartSchema);
