
const UserControllers = require('../Controller/userController')
module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: ()=>{
             return 'HELLO WORLD'
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
        handler: UserControllers.update
    }
];


// module.exports = route