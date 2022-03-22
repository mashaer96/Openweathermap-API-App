// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//Note: body-parser has become built in Express 4.16+
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/* Setup Local Server */
// set port variable & listening function
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`server is running on localhost: ${port}`);
}

//POST route to recieve data and add it to the data endpoint (ProjectData)
app.post('/addWeather', addData);
function addData(req, res){
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    }
    console.log('Data EndPoint:')
    console.log(projectData);
}

//GET route to return the data from the data endpoint & Update UI
app.get('/getData', getData);
function getData(req, res){
    res.send(projectData);
}