const Workout = require('../models/Workout')

async function createWorkout(req, res) {
    try {
        const workout = await Workout.create({
            ...req.body,
            user: req.user._id
        })
        return res.status(201).json(workout)
    } catch (error) {
        console.error(`Error creating workout: ${error}`)
        return res.status(400).json({ error: "Error creating workout" })
    }
}

async function getAllWorkouts(req, res) {
    try {
        const workouts = await Workout.find({ user: req.user._id })
        return res.json(workouts)
    } catch (error) {
        console.error(`Error getting all workouts: ${error}`)
        return res.status(500).json({ error: "Error getting your workouts" })
    }
}

async function getOneWorkout(req, res) {
    try {
        const workout = await Workout.findById(req.params.id)
        return res.json(workout)
    } catch (error) {
        console.error(`Error getting workout with ID: ${req.params.id} => ${error}`)
        return res.status(500).json({ error: "Error retrieving workout" })
    }
}

async function updateWorkout(req, res) {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!workout) return res.status(404).json({ message: `Workout with id ${req.params.id} does not exist.` })
        return res.json(workout)
    } catch (error) {
        console.error(`Error updating workout with ID: ${req.params.id} => ${error}`)
        return res.status(500).json({ error: "Error updating workout" })
    }
}

async function deleteWorkout(req, res) {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id)
        if (!workout) return res.status(404).json({ message: "Workout not found" })
        return res.json({ message: `${req.params.title} successfully deleted` })
    } catch (error) {
        console.error(`Error deleting workout with ID: ${req.params.id} => ${error}`)
        return res.status(500).json({ error: "Error deleting workout" })
    }
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getOneWorkout,
    updateWorkout,
    deleteWorkout
}
