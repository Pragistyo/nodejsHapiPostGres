const bcrypt  = require('bcrypt');
const salt    = bcrypt.genSaltSync(10);
const chalk   = require('chalk')
require('dotenv').config()

const createTableUsers = `CREATE TABLE IF NOT EXISTS Users (
    "id" serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    "password" VARCHAR (50) NOT NULL,
    authority integer NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
    );`


const getAllUsers = `SELECT * FROM Users`
const seedDbUsers = (param)=>{
    // bundlePasswordnya kasih salt dulu
    
    let hash = bcrypt.hashSync(param.password, salt);
    return `
    INSERT INTO users
           ( id, username , "password", authority, created_on,last_login )
           VALUES (DEFAULT, '${param.username}', '${hash}',
           '${parseInt(param.authority)}', 
           to_timestamp (${param.created_on}/1000), 
           to_timestamp (${param.last_login}/1000))`
}

const updateUser = (params) =>{
    return `asds`
}


//===================================================================//

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
const getAllProfile = `SELECT * FROM profileusers`
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
