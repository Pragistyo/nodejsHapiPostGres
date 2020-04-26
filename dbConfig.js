require('dotenv').config()
const config = {
    user: process.env.USER_ELEPHANT_DB, 
    database: process.env.DB_ELEPHANT, 
    password: process.env.SECRET_KEY_PG, 
    host: process.env.HOST_ELEPHANT_SQL_DB, 
    max: 10,
    port: 5432, 
};

module.exports = config
