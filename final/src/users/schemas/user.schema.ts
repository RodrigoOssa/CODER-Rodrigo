import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
        type: Object
    })
    cart: Object
}

export const UserSchema = SchemaFactory.createForClass(User);