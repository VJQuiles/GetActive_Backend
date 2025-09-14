const router = require('express').Router()
const exerciseController = require('../../controllers/exerciseController')

router.use(verifyUser)

router.put('/:exerciseId', exerciseController.updateExercise)
router.delete('/:exerciseId', exerciseController.deleteExercise)

module.exports = router