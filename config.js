import 'dotenv/config';

const config = {
    PORT:                           process.env.PORT || 3000,
    PERSISTENCE_TYPE:               process.env.PERSISTENCE_TYPE || 'MEM',
    MONGODB_TIMEOUT:                process.env.MONGODB_TIMEOUT || 2000,
    MONGODB_CONNECTION_STRING:      process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/ecommerce',
};

export default config;
