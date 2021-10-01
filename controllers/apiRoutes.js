const router = require('express').Router();
const db = require('../models');

/**
 * Get all the workouts including sum of all durations in exercise
 */
router.get("/workouts", [], async(req, res) =>{
    try{
        let workouts = await db.Workout.find({}).populate('Exercises');
        res.send(workouts);
    }catch(err){
        res.status(500).json(err.message)
    }
});


/**
 * Get workouts in range
 */
router.get("/workouts/range", [], async(req, res) =>{
    try{
        let workouts = await db.Workout.find({}).populate('Exercises');
        res.send(workouts);
    }catch(err){
        res.status(500).json(err.message)
    }
});


/**
 * Add an exercise to a workout
 */
router.put("/workouts/:id", [], async(req, res) =>{
    try{
        let workout = await db.Workout.find({
            _id: req.params.id
        });
        res.send(workout);
    }catch(err){
        res.status(500).json(err.message)
    }
});


/**
 * Create a new workout
 */
router.post("/workouts", [], async(req, res) =>{
    try{
        let workout = new db.Workout();
        await workout.save();
        res.send(workout);
    }catch(err){
        res.status(500).json(err.message)
    }
});


module.exports = router
