const mongoose = require('mongoose')
const { workoutTypes } = require('../utils/types')

const workoutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Workout name required"],
            trim: true
        },
        description: {
            type: String,
            required: true,
            enum: workoutTypes
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout