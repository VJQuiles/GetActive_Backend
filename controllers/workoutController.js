// Controller to handle workout routes. Usewr must be authenticated to access. 

const Workout = require('../models/Workout')


// Function to create a workout for a user. Takes the user's id to link to it to the workout and establish ownership.
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

// Function to get all workouts. Takes a request in the form of the user id and returns all related workouts.
async function getAllWorkouts(req, res) {
    try {
        const workouts = await Workout.find({ user: req.user._id })
        return res.json(workouts)
    } catch (error) {
        console.error(`Error getting all workouts: ${error}`)
        return res.status(500).json({ error: "Error getting your workouts" })
    }
}

// Function to get singular workout via query params. The id is pulled from the request body, and the corresponding workout is sent back. 
async function getOneWorkout(req, res) {
    try {
        const workout = await Workout.findById(req.params.id)
        return res.json(workout)
    } catch (error) {
        console.error(`Error getting workout with ID: ${req.params.id} => ${error}`)
        return res.status(500).json({ error: "Error retrieving workout" })
    }
}

// Function to up date a workout. Takes the id from the query in the url to identify the workout, and return it to the user. 
async function updateWorkout(req, res) {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!workout) return res.status(404).json({ error: `Workout with id ${req.params.id} does not exist.` })
        return res.json(workout)
    } catch (error) {
        console.error(`Error updating workout with ID: ${req.params.id} => ${error}`)
        return res.status(500).json({ error: "Error updating workout" })
    }
}


//Function to delete the the workout sent in the url query parameters. Sends back a message veryfying the workout has been deleted with the workout name. 
async function deleteWorkout(req, res) {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id)
        if (!workout) return res.status(404).json({ error: "Workout not found" })
        return res.json({ message: `${workout.name} successfully deleted` })
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
