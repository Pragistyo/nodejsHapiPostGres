const {Pool, Client} = require('pg');
const seedData = require('./seedData')

const dbConfig = require('./dbConfig')
const queryPool = require('./dbTableQueryConfig')

const pool = new Pool(dbConfig);


const initSeedDB = async () => {
    const conn = await pool.connect()
    
    try{
        let seedDbUsers = await conn.query(queryPool.seedDbUsers(seedData.primeUser))
        console.log('seedDbUser: ', seedDbUsers)
    }catch(err){
        console.error('error seeding users: ', err)
    } 

    conn.end();
}

initSeedDB();