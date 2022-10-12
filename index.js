let weather = {
    "apiKey": "d587ae877223fbc740d0674ddc51767d", 
     fetchWeather:  function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            +"&units=metric&APPID=" 
            +this.apiKey
        ) 
        .then((response) => {
            if (!response.ok){
                alert("No weather found")
                throw new Error("No weather found.");
            }
             return response.json();
        })  
        .then((data) => this.displayWeather(data))
     },
     displayWeather: function (data) {
        // data from name, icon, description,speed,temp and humidity
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        const {sunrise} = data.sys;
        const {sunset} = data.sys;  
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed : " + speed + "km";
        document.querySelector(".sunrise").innerText = "Sunrise: " + window.moment(sunrise * 1000).format('hh:mm a');
        document.querySelector(".sunset").innerText = "Sunset: " + window.moment(sunset * 1000).format('hh:mm a');
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
     },
     search : function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
     }
};



document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Chennai");


