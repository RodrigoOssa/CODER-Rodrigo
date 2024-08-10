import { Document } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export class ProductInterface extends Document {

    title: String

    description: String

    code: String

    price: Number

    status: Boolean = true

    stock: Number

    category: String

    thumbnails?: String

    owner?: User

    _id?: any
}