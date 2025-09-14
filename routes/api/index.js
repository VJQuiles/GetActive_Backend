const router = require('express').Router()
const userRoutes = require('./userRoutes')
const workoutRoutes = require('./workoutRoutes')
const exerciseRoutes = require('./exerciseRoutes')

router.use('/users', userRoutes)
router.use('/workouts', workoutRoutes)
router.use('/tasks', exerciseRoutes)

module.exports = router