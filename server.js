const Hapi = require('@hapi/hapi');
const userRoutes = require('./route/userRoutes');

const pg = require('pg')

var conString = process.env.INSERT_YOUR_POSTGRES_URL_HERE //Can be found in the Details page
var client = new pg.Client(conString);
var passwordPg = process.env.SECRET_KEY_PG
console.log(userRoutes)

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {

    server.route(userRoutes)
    
    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: (request, h) => {
    
    //         return 'Hello World!';
    //     }
    // });
    

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.error('>>>>>>>>>>>>>>>>>',err);
    process.exit(1);
});

init();