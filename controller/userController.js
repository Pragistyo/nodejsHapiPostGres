

const getAll = (request, h) =>{
    return 'getAll'
}

const getById = (request, h) =>{
    return 'getById'
}

const create = (request, h) =>{
    return 'create'
}

const update = (request, h) =>{
    return 'update'
}

const remove = (request, h) =>{
    return 'delete'
}


module.exports = {
    getAll: getAll,
    getById:getById,
    create:create,
    update:update,
    delete:remove
}