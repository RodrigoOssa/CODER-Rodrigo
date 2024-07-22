import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
        unique: true
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
        type: String,
        require: false
    })
    thumbnails: String
}

export const ProductSchema = SchemaFactory.createForClass(Product);