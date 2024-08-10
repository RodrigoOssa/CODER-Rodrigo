import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

export type CartDocument = mongoose.HydratedDocument<Cart>;

@Schema()
export class Products {

    @Prop({
        type: Number,
        require: false,
        default: 0
    })
    qty: number

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: false
    })
    product: Product

}

@Schema()
export class Cart {

    _id?: any

    @Prop({
        type: [{
            type: Products,
            required: false,
            default: []
        }]
    })
    products: Products[];

}

export const CartSchema = SchemaFactory.createForClass(Cart);