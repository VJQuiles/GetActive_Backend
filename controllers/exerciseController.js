// Controller to handle exercise routes. It's important to note, two of the routes are in the workout routes. User must be authenticated to access theser routes. 

const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')

// Function to create an exercise. Takes a request, from a form in the front end, and responds with the created exercise. This has a check to make sure the user is the owner of the workout this is being added to. This is aplied throughout all routes
async function createExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "This is not the workout your looking for - Obi Wan voice" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ error: "Kick rocks buddy" })

        const exercise = await Exercise.create({
            ...req.body,
            workout: req.params.workoutId
        })

        return res.send(exercise)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ error: "Error creating exercise" })
    }
}

// Function that gets all exercises associated with a workout. Takes a request, checks the user is the owner of the workout, and sends back the response of the requested exercises. 
async function getExercises(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "This is not the workout your looking for - Obi Wan voice" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ error: "Kick rocks buddy" })

        const exercises = await Exercise.find({ workout: req.params.workoutId })
        if (!exercises) return res.status(404).json({ error: `No exercise with ID: ${req.params.exerciseId}` })
        return res.json(exercises)
    } catch (error) {
        console.error(`Error getting exercises: ${error}`)
        return res.status(400).json({ error: "Error getting exercises" })
    }
}

// Function that gets a particular exercise sent in the request after the ownership check. Responds with the requested exercise.
async function getOneExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "Workout does not exist" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ error: "This is not your workout" })

        const exercise = await Exercise.findOne({ _id: req.params.exerciseId, workout: req.params.workoutId })
        if (!exercise) return res.status(404).json({ error: `No exercise with ID: ${req.params.exerciseId}` })
        return res.json(exercise)
    } catch (error) {
        console.error(`Error getting exercise with ID: ${req.params.exerciseId} => ${error}`)
        return res.status(500).json({ error: "Error retrieving workout" })
    }
}

// Function to update exercises. Takes a request, which includes the edit, and sends back a response with the update. Uses query params from the url to specify the exercise.
async function updateExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "Workout does not exist" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ error: "This is not your workout" })

        const exercise = await Exercise.findOneAndUpdate({ _id: req.params.exerciseId, workout: req.params.workoutId }, req.body, { new: true })
        if (!exercise) return res.status(404).json({ error: `No exercise with ID: ${req.params.exerciseId}` })
        return res.json(exercise)
    } catch (error) {
        return res.status(500).json({ error: `Error updating exercise: ${error.message}` })
    }
}

// Function to delete a specific user created excercise. Takes the requested id from the params to choose which one to delete. 
async function deleteExercise(req, res) {
    try {
        const workout = await Workout.findById(req.params.workoutId)

        if (workout === null) return res.status(404).json({ error: "Workout does not exist" })

        if (!workout.user.equals(req.user._id)) return res.status(403).json({ error: "This is not your workout" })

        const exercise = await Exercise.findOneAndDelete({ _id: req.params.exerciseId, workout: req.params.workoutId })
        if (!exercise) return res.status(404).json({ error: `No Exercise with ID: ${req.params.exerciseId}` })
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