const router = require('express').Router();
const db = require('../models');

/**
 * Get all the workouts including sum of all durations in exercise
 */
router.get("/workouts", [], async(req, res) =>{
    try{

        
        let workouts = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ]);

        res.send(workouts);
    }catch(err){
        res.status(500).json(err.message)
    }
});


/**
 * Get workout range for runs
 */
router.get("/workouts/range", [], async(req, res) => {
    try{
        let workouts = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ]);

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
        
        let workout = await db.Workout.findOneAndUpdate(
        {
            _id: req.params.id
        }, {
            $push: { 
                exercises: {
                    ...req.body
                }
            }
        }, {
            new: true,
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
        // create a new workout
        let workout =await db.Workout.create({
            day: new Date(),
            exercises: []
        });
        res.send(workout);
    }catch(err){
        res.status(500).json(err.message)
    }
});


module.exports = router
