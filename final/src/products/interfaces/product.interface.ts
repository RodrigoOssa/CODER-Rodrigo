import { Document } from "mongoose";

export class ProductInterface extends Document {

    title: String

    description: String

    code: String

    price: Number

    status: Boolean = true

    stock: Number

    category: String

    thumbnails?: String
}