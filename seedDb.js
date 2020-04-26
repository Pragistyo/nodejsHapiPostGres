const {Pool, Client} = require('pg');
require('dotenv').config()
//or native libpq bindings
//var pg = require('pg').native

const conString = process.env.INSERT_YOUR_POSTGRES_URL_HERE
const dbConfig = require('./dbConfig')
const queryPool = require('./dbTableQueryConfig')

const pool = new Pool(dbConfig);
    const client = await pool.connect()
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

const initSeedDB = async ()=>{
    const client = await pool.connect()

    try{
        let seedUser = await client.query(queryPool.seedUser)

    }catch(err){
        console.error('error seeding: ', err)
    }

    client.release()
})

initSeedDB();