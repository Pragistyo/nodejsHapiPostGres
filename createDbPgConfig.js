const {Pool, Client} = require('pg');
const chalk = require('chalk')
const to = requier('./helper/to')

const dbConfig = require('./dbConfig')
const queryPool = require('./dbTableQueryConfig')

console.log('DBconfig: ', dbConfig)
const pool = new Pool(dbConfig);
// console.log(pool)
const initCreateDB = async ()=>{
  let conn;

  try{
    [conn, connErr] = await to(pool.connect())
    if(connErr) throw new Error('Error open connection')

    let [createTableUsers, createTableUsersError] = await conn.query(queryPool.createTableUsers)
    if(createTableUsersError) throw new Error('Error create Table Users')

    let [createTableProfileUsers, createTableProfileUsersError] = await conn.query(queryPool.createTableProfile)
    if(createTableProfileUsersError) throw new Error('Error Create Table ProfileUsers')

    console.log(chalk.green('createTableUsers: ', createTableUsers.command))
    console.log(chalk.green('createTableProfile: ', createTableProfileUsers.command))

  }catch(err){
    console.error('ERROR CONNECT POOL: ', err)
  }finally{
    try{
      if(conn) await pool.end()
      console.log('Connection closed');
      
    }catch(e){ console.log('Error close conn: ',e); }
  }

  
}

 initCreateDB();
