const express = require('express');
require('dotenv').config()

const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
});

//routes
// app.get('/',(req,res) =>{
//     res.json({msg:"Welcome to the API"});
// });

app.use('/workouts',workoutRoutes);

//connect to mongodb
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT,() =>{
        console.log('listening for requests on port '+process.env.PORT);
    });
    console.log('connected to db');
})
.catch((err) => console.log(err));


