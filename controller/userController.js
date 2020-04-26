const dbConfig = require('../dbConfig')
const {Pool, Client} = require('pg')
const chalk = require('chalk')
const to = require('../helper/to')
const queryPool = require('../dbTableQueryConfig')
const Boom = require('@hapi/boom')


const getAll = async(request, h) =>{
    const pool = new Pool(dbConfig)
    const queryString = 'select * from users';

    let conn;

    try{
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [resultAllUsers, resultAllUsersErr] = await to(conn.query(queryString))
        if(resultAllUsersErr) throw Boom.badRequest("Error query get ALL")

        let response = { status: 200, queryName:"All Users", data: resultAllUsers.rows}
        return response

    }catch(e){
        console.error(chalk.red('error getAll: ', e))
        return {msg:'error getAll', error: e}
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
   
}

const getById = async(request, h) =>{
    const pool = new Pool(dbConfig)
    const queryString = `select * from users where id = ${request.params.id}`;

    let conn;
    
    try{
        
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [singleUsers, singleUsersErr] = await to(conn.query(queryString))
        if(singleUsersErr) throw Boom.badRequest('Fetch Single User Error')

        let response = { status: 200, queryName:"UsersbyId", data: singleUsers.rows[0]}
        return response

    } catch (e){
        console.error(chalk.red('error getById: ', e))
        return {msg:'error getById', error: e}
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }

}

const create = async(request, h) =>{
    
    const pool = new Pool(dbConfig)
    let conn;
    let body = {
        username:request.payload.username,
        password:request.payload.password,
        authority: request.payload.authority,
        created_on:Date.now(),
        last_login:null
    }
    //read req.headers in Hapi.js
    //request.raw.req.headers

    //read req.body in hapi js
    //request.payload
    console.log('body: ', body);
    
    try{
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")

        let [createUsers, createUsersErr] = await to(conn.query(queryPool.seedDbUsers(body)))
        if(createUsersErr) throw new Error ('Error create User')
        
        let response = { status: 201 , queryName:"insert user", created: createUsers}
        return response

    } catch (e){
        console.error('error create users: ', e)
        return {status:400, msg: e}
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}

const updateAuthority = async (request, h) =>{
    const pool = new Pool(dbConfig)
    const queryString = `UPDATE users SET authority = ${request.payload.authority} WHERE id = ${request.params.id}`

    let conn;
    console.log(chalk.red(`ini update: ${request.params.id}`, queryString))
    try{
        
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [updateUser, updateUserErr] = await to(conn.query(queryString))
        if(updateUserErr) throw new Error(`update User id = ${request.params.id} Error`)

        let response = { status: 200, queryName:"updateUser", data: updateUser}
        return response

    } catch (e){
        console.error(chalk.red(`error update user dengan id ${request.params.is}: `, e))
        return {msg:`error update user dengan id ${request.params.id}: `, error: e}
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
    
}

const remove = async (request, h) =>{
    const pool = new Pool(dbConfig)
    const queryString = `delete from users where id = ${request.params.id}`;

    let conn;
    
    try{
        
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [deleteUser, deleteUserErr] = await to(conn.query(queryString))
        if(deleteUserErr) throw new Error(`delete User id = ${request.params.id} Error`)

        let response = { status: 200, queryName:"deleteUser", data: deleteUser}
        return response

    } catch (e){
        console.error(chalk.red(`error delete user dengan id ${request.params.is}: `, e))
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}


module.exports = {
    getAll: getAll,
    getById:getById,
    create:create,
    updateAuthority:updateAuthority,
    delete:remove
}