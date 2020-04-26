require('dotenv').config()
const primeUser = {
    username:`ogiTampan@mail.com`,
    password: process.env.PRIME_USER_PASSWORD,
    authority: "1",
    created_on: Date.now(),
    last_login: null
}

module.exports={
    primeUser
}