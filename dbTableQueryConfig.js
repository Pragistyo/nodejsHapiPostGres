const bcrypt  = require('bcrypt');
const salt    = bcrypt.genSaltSync(10);
require('dotenv').config()

const createTableUsers = `CREATE TABLE IF NOT EXISTS Users (
    "id" serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    "password" VARCHAR (50) NOT NULL,
    authority integer NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
    );`

const createTableProfile = `CREATE TABLE IF NOT EXISTS profileusers (
"id" serial NOT NULL PRIMARY KEY,	
users_id INTEGER REFERENCES Users(id),
firstname VARCHAR (50) NOT NULL,
lastname VARCHAR (50) NOT NULL,
email VARCHAR (355) UNIQUE NOT NULL,
phone VARCHAR (30),
postalcode VARCHAR (10),
avatar VARCHAR(355)
);`;
const getAllUsers = `SELECT * FROM Users`
const getAllProfile = `SELECT * FROM profileusers`


const seedDbUsers = (bundle)=>{
    // bundlePasswordnya kasih salt dulu
    let hash = bcrypt.hashSync(bundle.password, salt);
    return `
    INSERT INTO users
           ( id, username , "password", authority, created_on,last_login )
           VALUES (DEFAULT, '${bundle.username}', '${hash}','${bundle.authority}', '${bundle.created_on}', '${bundle.last_login}'  )`
}
const seedDbProfileUsers = ``

module.exports={
    createTableUsers,
    createTableProfile,
    getAllUsers,
    getAllProfile,
    seedDbUsers,
    seedDbProfileUsers,
    seedDbUsers
}
