export default () => ({
    database: {
        user: process.env.DATABASE_USER,
        appName: process.env.DATABASE_APP_NAME,
        pass: process.env.DATABASE_PASS
    }
})