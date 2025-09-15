const router = require('express').Router()
const coreExerciseController = require('../../controllers/coreExerciseController')

// router.get('/seedDB', coreExerciseController.seedDB)
router.get('/', coreExerciseController.getAll)
router.get('/:ceId', coreExerciseController.getOne)

module.exports = router