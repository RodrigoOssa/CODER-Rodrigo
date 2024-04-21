import mongoose from "mongoose";
import { Schema } from "mongoose";
const cartCollections = "carts"

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                prod: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products'
                },
                qty: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})

export const cartModel = mongoose.model(cartCollections, cartSchema);
