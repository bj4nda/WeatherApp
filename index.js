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

let geocode = {
    reverseGeocode : function(latitude, longitude) {
        var api_key = 'cd0082e1ac5644539a96e495171de94a';
      
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'
      
        var request_url = api_url
          + '?'
          + 'key=' + api_key
          + '&q=' + encodeURIComponent(latitude + ',' + longitude)
          + '&pretty=1'
          + '&no_annotations=1';
      
        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward
      
        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);
      
        request.onload = function() {
          // see full list of possible response codes:
          // https://opencagedata.com/api#codes
      
          if (request.status === 200){
            // Success!
            var data = JSON.parse(request.responseText);
            weather.fetchWeather(data.results[0].components.city); // print the location
      
          } else if (request.status <= 500){
            // We reached our target server, but it returned an error
      
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
          } else {
            console.log("server error");
          }
        };
      
        request.onerror = function() {
          // There was a connection error of some sort
          console.log("unable to connect to server");
        };
      
        request.send();  // make the reques
      },

      getLocation: function () { 
        function success(data) {
            geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
        }
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, console.error);
        } else {
            weather.fetchWeather("Chennai");
        }
      }
}


document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});


geocode.getLocation();

git init                                                           // start tracking current directory
git add -A                                                         // add all files in current directory to staging area, making them available for commit
git commit -m "commit message"                                     // commit your changes
git remote add origin https://github.com/bj4nda/repo-name.git    // add remote repository URL which contains the required details
git pull origin master                                             // always pull from remote before pushing
git push -u origin master                                          