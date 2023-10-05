const express = require('express');
const { create } = require('../models/WorkoutModel');

const {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

const router = express.Router();

//get all workouts
router.get('/', getAllWorkouts);

//get one workout
router.get('/:id',getWorkout);

//create one workout
router.post('/', createWorkout);

//delete one workout
router.delete('/:id',deleteWorkout);

//update one workout
router.patch('/:id', updateWorkout);

module.exports = router;