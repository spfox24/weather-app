
// Constants and variables

const API_KEY = CONFIG;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q='; 

let weatherData, userInput, year;

// Cached Element References

const $title = $('#title');
const $temp = $('#temp');
const $index = $('#index');
const $desc = $('#desc');
const $wicon = $('#weather-icon');
const $map = $('#map');


const $form = $('form');
const $input = $('input[type="text"]');


const yearEL = document.getElementById('year');

// Event Listeners

$form.on('submit', handleGetData);

// Functions

function handleGetData(event) {
    event.preventDefault();


    userInput = $input.val();

    if(!userInput) return;

    $.ajax(BASE_URL + userInput + '&units=imperial&appid=' + API_KEY)
    .then(function(data) {
        
        weatherData = data;
        $input.val('');
        render();

    },       
    function(error) {
            console.log('Error: ', error);
    });
}

function render() {

    const {icon} = weatherData.weather[0]; 
    const temp = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);

    $title.text('City: ' + weatherData.name)
    $temp.text('Temperature: ' + temp + '\xB0F')
    $index.text('Feels Like: ' + feelsLike + '\xB0F')
    $desc.text('Weather: ' + weatherData.weather[0].description)
    $wicon.html(`<img src="icons/${icon}.png">`);

}

init();

function init() {
    year = new Date().getFullYear();
    yearEL.innerText = year;
} 


