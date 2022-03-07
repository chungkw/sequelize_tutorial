require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    cors: {
        origin: '*',
        optionsSuccessStatus: 200
    },
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};
