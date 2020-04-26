const to = (promise)=>{
    return promise
    .then(data =>([data,undefined]))
    .catch(error=> Promise.resolve([undefined, error]))
}

// const to = (promise)=>{
//     return promise
//     .then(data=>{ return[null,data]})
//     .catch(err =>{ [err]})
// }

module.exports = to