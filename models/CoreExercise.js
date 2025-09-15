const mongoose = require('mongoose')
const { liftTypes, equipmentTypes } = require('../utils/types')

const coreExerciseSchema = new mongoose.Schema(
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
        equipmentType: {
            type: String,
            required: true,
            enum: equipmentTypes
        }
    },
    {
        timestamps: true
    }
)

const CoreExercise = mongoose.model('CoreExercise', coreExerciseSchema)

module.exports = CoreExercise