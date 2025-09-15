const router = require('express').Router()
const apiRoutes = require('./api')
const openRoutes = require('./open')

router.use('/api', apiRoutes)
router.use('/open', openRoutes)

router.use((req, res) => {
    res.status(404).send("<h1>Did you send the right type of method request? Get, Post, Put, Delete</h1>")
})

module.exports = router