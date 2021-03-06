var x = document.querySelector('#location');
var api = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/cff4f529e476b9b5d1616fd12e57d185/';
//put this in front of url in codepen, this allows cross origin requests: https://cors-anywhere.herokuapp.com/
var api2 = 'https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/a0377d27b1173624/geolookup/q/'; 

window.onload = function getLocation(){

	//fades out all the divs before browser checks location
	$('#location').fadeOut(1000);
	$('#currentTemp').fadeOut(1000);
	$('#conditions').fadeOut(1000);
	$('#saying').fadeOut(1000);
	$('#icon').fadeOut(1000);

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = 'Geolocation is not supported by this browser';
	}
}

function showPosition(position){
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	var url = api + lat + ',' + lon;
	var url2 = api2 + lat + ',' + lon + '.json';
	
	//use this api to get the weather info
	var weather = new XMLHttpRequest();
	weather.open('GET', url, false);
	weather.send(null);

	var r = JSON.parse(weather.response);
	var temp = parseInt(r.currently.temperature);
	var currentWeather = r.currently.summary;

	console.log(weather);

	document.querySelector('#currentTemp').innerHTML = temp + '°F';
	document.querySelector('#conditions').innerHTML = currentWeather;

	//use this api to get the name of the city
	var findMyCity = new XMLHttpRequest();
	findMyCity.open('GET', url2, false);
	findMyCity.send(null);

	var s = JSON.parse(findMyCity.response);
	var currentLoc = s.location.city + ', ' + s.location.state;
 
	document.querySelector('#location').innerHTML = currentLoc;

	/////////////////////////////////////////////////////////////
	//skycons types: CLEAR_DAY, CLEAR_NIGHT, PARTLY_CLOUDY_DAY,//
	//PARTLY_CLOUDY_NIGHT, CLOUDY, RAIN, SLEET, SNOW, WIND, FOG//
	/////////////////////////////////////////////////////////////


	//add the weather icons here, use a for loop//
	var weatherIcon = r.currently.icon;
	var icons = new Skycons({'color' : '#eeeeee'});
	var listOfIcons = ['clear-day', 'clear-night', 'partly-cloudy-day', 'partly-cloudy-night',
					   'cloudy', 'rain', 'sleet', 'snow', 'wind', 'fog'];
		console.log(weatherIcon);
		console.log(icons);	
	
	for (var i = 0; i < listOfIcons.length; i++){
		if (weatherIcon == listOfIcons[i]){
			icons.add(document.querySelector('#icon'), listOfIcons[i]);
		} 
	}

	icons.play();

	//make a new Date object containing the current time
	var time = new Date();
	time.setHours(15);
	console.log(time);

	//set up an array of sayings to return based on weather
	var sayings = ['Enjoy your day!', 'Have a nice night!', 'Better take an umbrella!', 'Brrrrrr']

		if ((weatherIcon == 'clear-day') || (weatherIcon =='partly-cloudy-day') || (weatherIcon =='cloudy') || (weatherIcon =='wind') || (weatherIcon =='fog') && (time < 16)){
			document.querySelector('#saying').innerHTML = sayings[0];
	}	else if ((weatherIcon == 'clear-day') || (weatherIcon =='partly-cloudy-day') || (weatherIcon =='cloudy') || (weatherIcon =='wind') || (weatherIcon =='fog') && (time > 16)){
			document.querySelector('#saying').innerHTML = sayings[1];
	} 	else if ((weatherIcon == 'clear-night') || (weatherIcon == 'partly-cloudy-night')){
			document.querySelector('#saying').innerHTML = sayings[1];
	}	else if ((weatherIcon == 'rain') || (weatherIcon == 'sleet')){
			document.querySelector('#saying').innerHTML = sayings[2];
	}	else if (weatherIcon == 'snow'){
			document.querySelector('#saying').innerHTML = sayings[3];
	}

	//fades in the data pulled from the JSON file after checking location
	$('#location').fadeIn(2000);
	$('#currentTemp').fadeIn(2000);
	$('#conditions').fadeIn(2000);
	$('#saying').fadeIn(2000);
	$('#icon').fadeIn(2000);
}

//function to convert to C and back to F
function convert(){

	var far = parseInt(document.querySelector('#currentTemp').innerHTML);
	
	if (document.querySelector('#currentTemp').innerHTML == far + '°F'){
		//changes the temp to °C
		var cels = (far - 32) * 5/9;
		document.querySelector('#currentTemp').innerHTML = Math.round(cels) + '°C';
	} else{
		//changes the temp back to °F
		var changeBack = (far * 1.8) + 32;
		document.querySelector('#currentTemp').innerHTML = Math.round(changeBack) + '°F';
	}
}

//sets the date, Day, Month, Date #, and Year
var d = new Date();
var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
'Friday', 'Saturday'];
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
'August', 'September', 'November', 'December']
document.querySelector('#date').innerHTML = daysOfTheWeek[d.getDay()] + ', ' 
	+ month[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear(); 
