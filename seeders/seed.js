const mongoose = require('mongoose');
const db = require('../models');

const dotenv = require('dotenv');
dotenv.config();
const db_url = process.env.MONGODB_URL;
const Logger = require("../libs/logger");

const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

mongoose.connect(db_url, connectionParams)
    .then(() => {
        Logger.info(`Connected to database @ FirstTracker.uvvp5.mongodb.net`);
    })
    .catch((err) => {
        Logger.error(`Error connecting to the database. \n${err}`);
    })

const exerciseSeeds = [
  {
    type: 'resistance',
    name: 'Bicep Curl',
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4,
  },
  {
    type: 'resistance',
    name: 'Lateral Pull',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },
  {
    type: 'resistance',
    name: 'Push Press',
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4,
  },
  {
    type: 'cardio',
    name: 'Running',
    duration: 25,
    distance: 4,
  },
  {
    type: 'resistance',
    name: 'Bench Press',
    duration: 20,
    weight: 285,
    reps: 10,
    sets: 4,
  },
  {
    type: 'resistance',
    name: 'Bench Press',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },
  {
    type: 'resistance',
    name: 'Quad Press',
    duration: 30,
    weight: 300,
    reps: 10,
    sets: 4,
  },
  {
    type: 'resistance',
    name: 'Bench Press',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },
  {
    type: 'resistance',
    name: 'Military Press',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },
]

async function seed(){
  await db.Exercise.deleteMany();

  await db.Workout.deleteMany();
    
  let exercises = await db.Exercise.collection.insertMany(exerciseSeeds);
  
  Logger.info(`Inserted ${exercises.result.n} exercise entries`);

  exerciseIdList = exercises.ops.map((exercise) => exercise._id)

  // workout 1 with all exercises
  let workout1 = db.Workout.collection.insertOne({
    day: new Date(new Date().setDate(new Date().getDate() - 9)),
    exercises: exerciseIdList 
  });
  Logger.info(`Inserted workout 1`);
  
  // workout 2 with all exercises
  let workout2 = db.Workout.collection.insertOne({
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
    exercises: exerciseIdList 
  });
  Logger.info(`Inserted workout 2`);

    
  // checking the data works
  db.Workout.find().populate("exercises").then((dbWorkouts) => {
    for(let workout of dbWorkouts){
      console.log(workout)
      for(let exercise of workout.exercises){
        console.log(exercise)
      }
    }
  });
}

seed()