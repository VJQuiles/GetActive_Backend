const router = require('express').Router()
const exerciseController = require('../../controllers/exerciseController')
const verifyUser = require('../../middleware/auth')

router.use(verifyUser)

router.put('/:workoutId/:exerciseId', exerciseController.updateExercise)
router.delete('/:workoutId/:exerciseId', exerciseController.deleteExercise)

module.exports = router