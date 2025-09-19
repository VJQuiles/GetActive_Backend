const router = require('express').Router()
const workoutController = require('../../controllers/workoutController')
const exerciseController = require('../../controllers/exerciseController')
const verifyUser = require('../../middleware/auth')

router.use(verifyUser)

router.post('/create-workout', workoutController.createWorkout)
router.get('/user-workouts', workoutController.getAllWorkouts)
router.get('/user-workouts/:id', workoutController.getOneWorkout)
router.put('/update-workout/:id', workoutController.updateWorkout)
router.delete('/delete-workout/:id', workoutController.deleteWorkout)

router.post('/:workoutId/exercises', exerciseController.createExercise)
router.get('/:workoutId/exercises', exerciseController.getExercises)
router.get('/:workoutId/exercises/:exerciseId', exerciseController.getOneExercise)
router.delete('/:workoutId/exercises/:exerciseId', exerciseController.deleteExercise)

module.exports = router
