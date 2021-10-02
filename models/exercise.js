const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
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
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;