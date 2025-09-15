const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')

async function createExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "This is not the workout your looking for - Obi Wan voice" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ message: "Kick rocks buddy" })

        const exercise = await Exercise.create({
            ...req.body,
            workout: req.params.workoutId
        })

        console.log(exercise)
        return res.send(exercise)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ error: "Error creating exercise" })
    }
}

async function getExercises(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "This is not the workout your looking for - Obi Wan voice" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ message: "Kick rocks buddy" })

        const exercises = await Exercise.find({ workout: req.params.workoutId })
        if (!exercise) return res.status(404).json({ message: `No exercise with ID: ${req.params.exerciseId}` })
        return res.json(exercises)
    } catch (error) {
        console.error(`Error getting exercises: ${error}`)
        return res.status(400).json({ error: "Error getting exercises" })
    }
}

async function getOneExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "Workout does not exist" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ message: "This is not your workout" })

        const exercise = await Exercise.findOne({ _id: req.params.exerciseId, workout: req.params.workoutId })
        if (!exercise) return res.status(404).json({ message: `No exercise with ID: ${req.params.exerciseId}` })
        return res.json(exercise)
    } catch (error) {
        console.error(`Error getting exercise with ID: ${req.params.exerciseId} => ${error}`)
        return res.status(500).json({ error: "Error retrieving workout" })
    }
}

async function updateExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "Workout does not exist" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ message: "This is not your workout" })

        const exercise = await Exercise.findOneAndUpdate({ _id: req.params.exerciseId, workout: req.params.workoutId }, req.body, { new: true })
        if (!exercise) return res.status(404).json({ message: `No exercise with ID: ${req.params.exerciseId}` })
        return res.json(exercise)
    } catch (error) {
        return res.status(500).json({ error: `Error updating exercise: ${error.message}` })
    }
}

async function deleteExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "Workout does not exist" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ message: "This is not your workout" })

        const exercise = await Exercise.findOneAndDelete({ _id: req.params.exerciseId, workout: req.params.workoutId })
        if (!exercise) return res.status(404).json({ message: `No Exercise with ID: ${req.params.exerciseId}` })
        return res.json({ message: `${exercise.name} successfully deleted` })
    } catch (error) {
        return res.status(500).json({ error: `Error deleting Exercise: ${error.message}` })
    }
}

module.exports = {
    createExercise,
    getExercises,
    updateExercise,
    deleteExercise,
    getOneExercise
}