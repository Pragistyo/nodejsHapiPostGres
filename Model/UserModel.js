const dbConfig = require('../dbConfig')
const {Pool, Client} = require('pg')
const chalk = require('chalk')

//start


const getALlUsers = async() => {

    const pool = new Pool(dbConfig)
    pool.on('error', function (err, client) {
        console.error('idle client error', err.message, err.stack); 
    }); //ubah ke async await
    const conn;
    try{
        conn = await pool.connect()
        const queryString = 'select * from users';
        let resultAllUsers = await client.query(queryString)
        
    }catch(err){
        console.error(chalk.red('error connect POOL: ', err))
    }
}

const createUser = async() => {

}

const getUserById = async(param) => {

}

const updateUserById = async(param) =>{

}

const deleteUserById = async(param) =>{

}