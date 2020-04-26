const {Pool, Client} = require('pg');
const seedData = require('./seedData')

const dbConfig = require('./dbConfig')
const queryPool = require('./dbTableQueryConfig')

const pool = new Pool(dbConfig);
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

const initSeedDB = async () => {
    const client = await pool.connect()
    
    try{
        let seedDbUsers = await client.query(queryPool.seedDbUsers(seedData.primeUser))
        console.log('seedDbUser: ', seedDbUsers)
    }catch(err){
        console.error('error seeding users: ', err)
    }

    client.release();
}

initSeedDB();