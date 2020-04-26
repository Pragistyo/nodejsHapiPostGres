const {Pool, Client} = require('pg');
const seedData = require('./seedData')
// require('dotenv').config()
//or native libpq bindings

// const conString = process.env.INSERT_YOUR_POSTGRES_URL_HERE
const dbConfig = require('./dbConfig')
const queryPool = require('./dbTableQueryConfig')

const pool = new Pool(dbConfig);
// console.log('seedData: ', seedData)
console.log('seedDbUsers: ',queryPool.seedDbUsers(seedData.primeUser))
// console.log(pool)
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

const initCreateDB = async ()=>{
  const client = await pool.connect()

  try{
      let createTableUsers = await client.query(queryPool.createTableUsers)
      let createTableProfileUsers = await client.query(queryPool.createTableProfile)


      console.log('createTableUsers: ', createTableUsers.rows)
      console.log('createTableProfile: ', createTableProfileUsers.rows)

  }catch(errCreate){
      console.error('Ini error create table Users', errCreate)
  }

  client.release()
}

initCreateDB();
