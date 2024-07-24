import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@ecommerce.nkxjpdn.mongodb.net/${process.env.DATABASE_APP_NAME}?retryWrites=true&w=majority&appName=${process.env.DATABASE_APP_NAME}`),
    },
];