import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {

    @Prop({
        type: String,
        require: true
    })
    title: String

    @Prop({
        type: String,
        require: true
    })
    description: String

    @Prop({
        type: String,
        require: true,
        unique: true,
    })
    code: String

    @Prop({
        type: Number,
        require: true
    })
    price: Number

    @Prop({
        type: Boolean,
        default: true
    })
    status: Boolean = true

    @Prop({
        type: Number,
        require: true
    })
    stock: Number

    @Prop({
        type: String,
        require: true
    })
    category: String


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    })
    owner: User

    @Prop({
        type: String,
        require: false
    })
    thumbnails: String

    _id: any
}

export const ProductSchema = SchemaFactory.createForClass(Product);