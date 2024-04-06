const express = require('express')
const AuthRoute = express()
const {Auth} = require('../Controllers/AuthController')

AuthRoute.post('/auth',Auth)

module.exports =  AuthRoute; 