const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    day: {
        type: Date,
        required: true
    },
    exercises:[{
        type: {
            type: String,
            enum: ['resistance', 'cardio'],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        distance: {
            type: Number,
            required: false
        },
        weight: {
            type: Number,
            required: false
        },
        reps: {
            type: Number,
            required: false
        },
        sets: {
            type: Number,
            required: false
        }
    }],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;