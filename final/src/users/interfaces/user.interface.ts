import { Document } from "mongoose";

export class User extends Document {

    first_name: String

    last_name: String

    age: Number

    email: String

    role: String

    password: String

    cart: Object
}