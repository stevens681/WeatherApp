//Variables
var api = "http://api.openweathermap.org/data/2.5/weather?";
var lat, lon;
var unit = true;
var wallpaper = ["calm", "calm-night", "cloudy", "cloudy-night", "drizzle", "rain", "snow", "thunderstorm", "atmosphere"]
var color = ["#F44336", "#2196F3", "#8BC34A", "#FF5722", "#7B1FA2", "#FBC02D", "snow", "#A1887F"]
//This fucnction gets the Lat and Lon from the browser
$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = "lat=" + position.coords.latitude;
			var lon = "lon=" + position.coords.longitude;
			getWeather(lat, lon);
		});
	} else {
		console.log("Geolocation is not supported by this browser.");
		alert("Geolocation is not supported by this browser.");
	}
})
//This function gets the API info 
function getWeather(lat, lon) {
	var apiKey = "&units=metric&appid=a8a07d1c8f6d3a0fd02ba7ad0a345960";
	var urlString = api + lat + "&" + lon + apiKey;
	var iconUrl = "http://openweathermap.org/img/w/";
	var icon;
	$.ajax({
		url: urlString,
		success: function(result) {
			$("#city").text(result.name + ", " + result.sys.country);
			tempInCelsius = Math.round(result.main.temp);
			minTempInCelsius = Math.round(result.main.temp_min * 10) / 10;
			maxTempInCelsius = Math.round(result.main.temp_max * 10) / 10;
			getCelsiusWeather();
			$("#desc").html(result.weather[0].main);
			icon = result.weather[0].icon;
			$('#icon').attr('src', iconUrl + icon + '.png');
			$("#button").html(String.fromCharCode(176) + "F");
			setInterval(function() {getTime();}, 100);
			getWallpaper(icon);
		}
	});
}
//This function gets the temps and formats the data to Fahrenheit
function getFahrenheitWeather() {
	var tempFah = Math.round((parseFloat(tempInCelsius) * 9 / 5 + 32));
	var minTempFah = Math.round((parseFloat(minTempInCelsius) * 9 / 5 + 32));
	var maxTempFah = Math.round((parseFloat(maxTempInCelsius) * 9 / 5 + 32));
	$("#temp").fadeOut(function() {
		$(this).text(tempFah + String.fromCharCode(176) + "F")
	}).fadeIn(300);
	$("#minTemp").fadeOut(function() {
		$(this).text("Minimal Temp: " + minTempFah + String.fromCharCode(176) + "F")
	}).fadeIn(600);
	$("#maxTemp").fadeOut(function() {
		$(this).text("Maximal Temp: " + maxTempFah + String.fromCharCode(176) + "F")
	}).fadeIn(600);
	$("#button").html(String.fromCharCode(176) + "C");
}
//This function gets the temps and formats the data to Celsius
function getCelsiusWeather() {
	$("#temp").fadeOut(function() {
		$(this).text(tempInCelsius + String.fromCharCode(176) + "C")
	}).fadeIn(300);
	$("#minTemp").fadeOut(function() {
		$(this).text("Minimal Temp: " + minTempInCelsius + String.fromCharCode(176) + "C")
	}).fadeIn(600);
	$("#maxTemp").fadeOut(function() {
		$(this).text("Maximal Temp: " + maxTempInCelsius + " " + String.fromCharCode(176) + "C")
	}).fadeIn(600);
    $("#button").html(String.fromCharCode(176) + "F");
}
//This function gets the time from the browser
function getTime() {
	var d = new Date(),
		h = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
	var format = d.getHours() >= 12 ? "PM" : "AM";
	m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	document.getElementById("time").innerHTML = days[d.getDay()] + "<br>" + h + ":" + m + " " + format;
}
//This function sets the switch to change the icon 
function switchW() {
	if (unit) {
		getFahrenheitWeather();
		unit = false;
	} else {
		getCelsiusWeather();
		unit = true;
	}
}
//This function changes the circule background and the color background of the card
function getWallpaper(iconNum) {
	var count;
	switch (iconNum) {
		case "01d":
		case "04d":
			count = 0;
			break;
		case "01n":
		case "04n":
			count = 1;
			break;
		case "02d":
		case "03d":
			count = 2;
			break;
		case "02n":
		case "03n":
			count = 3;
			break;
		case "09d":
		case "09n":
			count = 4;
			break;
		case "10d":
		case "10n":
			count = 5;
			break;
		case "11d":
		case "11n":
			count = 7;
			break;
		case "13d":
		case "13n":
			count = 6;
			break;
		case "50d":
		case "50n":
			count = 8;
			break;
		default:
			count = 0;
	}
	$("#tempCircle").fadeOut(function() {
		$(this).css('background-image', 'url(img/' + wallpaper[count] + '.jpg)')
	}).fadeIn(900);
	$('body').css('background-color', color[count]);
}