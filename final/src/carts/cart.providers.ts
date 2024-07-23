import { Connection } from 'mongoose';
import { CartSchema } from './schemas/cart.schema';

export const cartProvider = [
    {
        provide: 'CART_MODEL',
        useFactory: (connection: Connection) => connection.model('Cart', CartSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];