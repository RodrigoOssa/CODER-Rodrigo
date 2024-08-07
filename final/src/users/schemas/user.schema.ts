import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from 'src/carts/schemas/cart.schema';

export type ProductDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({
        type: String,
        require: true
    })
    first_name: string

    @Prop({
        type: String,
        require: true
    })
    last_name: string

    @Prop({
        type: Number,
        require: true
    })
    age: Number

    @Prop({
        type: String,
        require: true,
        unique: true
    })
    email: string

    @Prop({
        type: String,
        require: true
    })
    role: string

    @Prop({
        type: String,
        require: true
    })
    password: string


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        require: false
    })
    cart: Cart[]
}

export const UserSchema = SchemaFactory.createForClass(User);