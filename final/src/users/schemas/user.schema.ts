import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({
        type: String,
        require: true
    })
    first_name: String

    @Prop({
        type: String,
        require: true
    })
    last_name: String

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
    email: String

    @Prop({
        type: String,
        require: true
    })
    role: String

    @Prop({
        type: String,
        require: true
    })
    password: String

    @Prop({
        type: Object
    })
    cart: Object
}

export const UserSchema = SchemaFactory.createForClass(User);