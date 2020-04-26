const Hapi = require('@hapi/hapi');
const userRoutes = require('./Route/userRoutes');
const chalk = require('chalk')
const to = require('./helper/to')

require('dotenv').config();

const {Pool, Client} = require('pg')

var conString = process.env.INSERT_YOUR_POSTGRES_URL_HERE //Can be found in the Details page
// console.log('conString', typeof(conString))

const client = new Client(conString)

const init = async () => {

    const server = Hapi.server({
      port: 3000,
      host: 'localhost'
    });
    let conn;

    // console.log(userRoutes)
    server.route(userRoutes)

    try{ 
      //connect pg
      [conn, connError] = await to(client.connect())
      if(connError) throw new Error ('Error open Connection')

      //test query
      let [result, resultError] = await to(client.query('SELECT NOW() AS "theTime"'))
      if(resultError) throw new Error('Error pg initial query')

      console.log('success connect pg basic: ',result.rows[0].theTime)

    }catch (err){
        console.error(chalk.red('error from pg connect: ', err))
    }

    // server start
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.error(chalk.red('Error Hapi.js',err));
    process.exit(1);
});

init();