/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='&appid=f87508dcdd2138ecc311100190496ebf&units=metric'; // with unit conversation (metric) to celcius
  
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create event listener to do actions when generate is clicked
document.getElementById('generate').addEventListener('click', doAction);

function doAction(e){
// Access the entered zip code & feelings
const zipCode = document.getElementById('zip').value;
const userResponse = document.getElementById('feelings').value;
// Make a GET request to the API
getWeather(baseURL,zipCode,apiKey)
// Make a POST requset to save data
.then(
    (data)=>{
    postWeather('/addWeather',{temp: data.main.temp, date: newDate, feelings: userResponse});
})
//Make a GET requst to update UI
.then(
    () => updateUi('/getData')
)
}

/* Function to GET data from API */
const getWeather = async (baseURL,zip,key) => {
    const response = await fetch(baseURL+zip+key);
    try {
       const data = await response.json();
       console.log(data);
       return data; // data will be accessible when calling (Then)
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data to the data endPint */
const postWeather = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', //registering app.js on same browser (default)
        headers: {
            'Content-Type': 'application/json', //JSON data format
        },
        body: JSON.stringify(data), //transforming the body of the POST request from object to JSON string
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to GET data from the data endPoint & Update UI */
const updateUi = async (url = '') => {
    const response = await fetch(url);
    try {
        const savedData = await response.json();
        document.getElementById('date').innerHTML = `Date: ${savedData.date}`;
        document.getElementById('temp').innerHTML = `Temprature: ${savedData.temp}`;
        document.getElementById('content').innerHTML = `Feeling: ${savedData.feelings}`;
    } catch(error) {
        console.log('error', error);
    }
}