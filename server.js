const Hapi = require('@hapi/hapi');
const userRoutes = require('./Route/userRoutes');
require('dotenv').config();

const {Pool, Client} = require('pg')

var conString = process.env.INSERT_YOUR_POSTGRES_URL_HERE //Can be found in the Details page
console.log('conString', typeof(conString))

const client = new Client(conString)

const init = async () => {

    const server = Hapi.server({
      port: 3000,
      host: 'localhost'
    });

    console.log(userRoutes)

    server.route(userRoutes)

    try{ //connect pg
      await client.connect()

      try{// try query after connect db
          let result = await client.query('SELECT NOW() AS "theTime"')
          console.log('success connect pg basic: ',result.rows[0].theTime);
          // >> output: 2018-08-23T14:02:57.117Z
          await client.end()
      }catch(errorTestQuery){
        console.error('error pg query basic: ', errorTestQuery)
      }

    }catch (err){
        console.log('error from pg connect: ', err)
    }

    // server start
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.error('Error Hapi.js',err);
    process.exit(1);
});

init();