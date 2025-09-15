const router = require('express').Router()
const coreExerciseRoutes = require('./coreExerciseRoutes')

// Mount open (unauthenticated) routes under /open
router.use('/core-exercises', coreExerciseRoutes)

module.exports = router

