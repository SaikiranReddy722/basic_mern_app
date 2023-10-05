const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

//get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}


//get a single workout
const getWorkout = async (req, res) => {
    const {id: workoutId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(workoutId)) return res.status(404).json({msg: `No workout with id: ${workoutId}`} );
    const workout = await Workout.findById(workoutId);

    if(!workout) return res.status(404).json({msg: `No workout with id: ${workoutId}`} );

    res.status(200).json(workout);
}


//create a new workout
const createWorkout = async (req, res) => {
    const {title,reps,load} = req.body;
    // add doc to db
    try{
        const workout = await Workout.create({title,reps,load});
        res.status(201).json(workout);
    }catch(err){    
        res.status(400).json({msg:err});
    };
}

//delete a single workout
const deleteWorkout = async (req, res) => {
    const {id: workoutId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(workoutId)) return res.status(404).json({msg: `No workout with id: ${workoutId}`} );

    const workout = await Workout.findOneAndDelete(workoutId);
    
    if(!workout) return res.status(404).json({msg: `No workout with id: ${workoutId}`} );
    res.status(200).json(workout);
}


//update a workout
const updateWorkout = async (req, res) => {
    const {id: workoutId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(workoutId)) return res.status(404).json({msg: `No workout with id: ${workoutId}`} );

    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body,
    });

    if(!workout) return res.status(404).json({msg: `No workout with id: ${workoutId}`} );
    res.status(200).json(workout);
}



module.exports = {createWorkout, getAllWorkouts, getWorkout, deleteWorkout,updateWorkout};