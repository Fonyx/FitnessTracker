const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    day: {
        type: Date,
        required: true
    },
    exercises:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ]
    
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;