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

const workoutSeeds = [
  {
    day: new Date(new Date().setDate(new Date().getDate() - 9))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 8))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 6))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 5))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2))
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 1))
  },
];

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


  let workouts = exercises.ops.map((exercise) => {
    db.Workout.collection.insertOne({
      day: new Date(new Date().setDate(new Date().getDate() - 9)),
      exercises: [exercise._id]
    });
  });
    
  Logger.info(`Inserted ${workouts.length} workout entries`);
  // checking the data works
  db.Workout.find({}).populate("exercise").then((dbWorkouts) => {
    for(let workout of dbWorkouts){
      console.log(workout)
      for(let exercise of workout.exercises){
        console.log(exercise)
      }
    }
  });
}

seed()