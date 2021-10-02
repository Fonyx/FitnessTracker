const router = require('express').Router();
const db = require('../models');

/**
 * Get all the workouts including sum of all durations in exercise
 */
router.get("/workouts", [], async(req, res) =>{
    try{

        
        let test = await db.Workout.aggregate([
            {"$lookup":{
                "from":"exercises",
                "localField":"exercises",
                "foreignField":"_id",
                "as":"exercise"
              }
            },
                {"$addFields": {
                    "totalDuration": { "$sum": "$exercise.duration" }
                }
            }
        ]);
        
        let workouts = await db.Workout.populate(test, {path: "workout"});
        
        // let workouts = await db.Workout.find().populate('exercises');

        res.send(test);
    }catch(err){
        res.status(500).json(err.message)
    }
});


/**
 * Get workout range for runs
 */
router.get("/workouts/range", [], async(req, res) => {
    try{
        let workouts = await db.Workout.find({}).populate('exercises');
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
        // create a new exercise
        let exercise = await db.Exercise.create({...req.body});
        // update the new workout list to contain the _id of the new exercise
        let workout = await db.Workout.findOneAndUpdate(
        {
            _id: req.params.id
        }, {
            $push: { exercises: exercise._id}
        }, {
            new: true
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
        let workout = new db.Workout({
            day: new Date()
        });
        await workout.save();
        res.send(workout);
    }catch(err){
        res.status(500).json(err.message)
    }
});


module.exports = router
