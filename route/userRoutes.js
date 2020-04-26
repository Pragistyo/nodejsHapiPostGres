
const UserControllers = require('../Controller/userController')
const {Pool, Client} = require('pg');
const chalk = require('chalk')

const dbConfig = require('../dbConfig')
const queryPool = require('../dbTableQueryConfig')

const pool = new Pool(dbConfig);
module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: async()=>{
            try{
                const client  = await pool.connect()
                let allUsers = await client.query(queryPool.getAllUsers)
                console.log(chalk.green('ini test query: ',allUsers.rows[0]))
                return allUsers.rows[0]
            }catch(e){
                // return 'error occured'
                console.log(e)
            }             
        }

    },
    {
        path: '/api/users',
        method: 'POST',
        handler: UserControllers.create
    },
    {
        path: '/api/users',
        method: 'GET',
        handler: UserControllers.getAll
    },
    {
        path: '/api/users/{id}',
        method: 'GET',
        handler: UserControllers.getById
    },
    {
        path: '/api/users/{id}',
        method: 'DELETE',
        handler: UserControllers.delete
    },
    {
        path: '/api/users/{id}',
        method: 'PUT',
        handler: UserControllers.updateAuthority
    }
];


// module.exports = route