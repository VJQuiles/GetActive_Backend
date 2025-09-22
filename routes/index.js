// The way the routes run, all routes in the api folder run through the index file in api. This file access the routes from the index.js in api. It also does the same thing with the core exercises in the open routes. This is particularly important for testing routes, and setting up api calls on the front end. 

const router = require('express').Router()
const apiRoutes = require('./api')
const openRoutes = require('./open')

router.use('/api', apiRoutes)
router.use('/open', openRoutes)

router.use((req, res) => {
    res.status(404).send("<h1>Did you send the right type of method request? Get, Post, Put, Delete</h1>")
})

module.exports = router