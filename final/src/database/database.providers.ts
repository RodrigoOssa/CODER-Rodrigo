import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect('mongodb+srv://rodrigoo2012r:${credentials.pass}@ecommerce.nkxjpdn.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce'),
    },
];