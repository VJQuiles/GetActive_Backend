const mongoose = require('mongoose')
const { liftTypes, equipmentTypes } = require('../utils/types')

const exerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Exercise name required"],
            trim: true
        },
        instructions: {
            type: String,
            required: [true, "Task description required"],

        },
        liftType: {
            type: String,
            required: true,
            enum: liftTypes

        },
        equimentType: {
            type: String,
            required: true,
            enum: equipmentTypes
        },
        workout: {
            type: mongoose.Schema.ObjectId,
            ref: 'Workout',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise