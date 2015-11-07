//widget.js
var forecastKey = "276618fdf273055e86df538cf2c9cce1";
var lat = "45.348391";
var long = "-75.757045";
var numLoaded = 0;
var totalRequired = 2;
var h = document.querySelector("head");
var s1 = document.createElement("script");
var s2 = document.createElement("script");
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", "css/widget.css");
s1.setAttribute("type", "text/javascript");
s1.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");
s2.setAttribute("type", "text/javascript");
s2.setAttribute("src", "js/skycons.js");
h.appendChild(link);
h.appendChild(s1);
h.appendChild(s2);
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//http://stackoverflow.com/questions/13566552/easiest-way-to-convert-month-name-to-month-number-in-js-jan-01
s1.addEventListener("load", loaded);
s2.addEventListener("load", loaded);

function loaded() {
    numLoaded++;
    if (numLoaded === totalRequired) {
        getData();
          console.log('getData: ' + numLoaded);
    }
    console.log('ScriptLoaded: ' + numLoaded);
}

function getData() {
    $.ajax({
        url: "https://api.forecast.io/forecast/" + forecastKey + "/" + lat + "," + long + "?units=ca",
        method: 'GET',
        dataType: 'jsonp'
    }).success(function (data) {
        todayWeather(data.currently);
        hourlyWeather(data.hourly);
        setTimeout(playAnim(), 500);
    }).error(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });

}

function playAnim() {
    var icons = new Skycons({
            "color": "black"
        }),
        list = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
          ],
        i;
    for (i = list.length; i--;) {
        var weatherType = list[i],
            elements = document.getElementsByClassName(weatherType);
        for (e = elements.length; e--;) {
            icons.set(elements[e], weatherType);
        }
        icons.play();
    }
}

function todayWeather(current) {
    //Show current weather
    var today = new Date();
    var container = $(".weather-forecast");
    $("<p>").text("Current Conditions for today, " + today.getDate() + "-" + monthNames[(parseInt(today.getMonth()))]).appendTo(container);
    //$("<i>").addClass("wi").addClass("wi-forecast-io-" + current.icon).addClass("current").appendTo(container);
    $("<canvas>").attr("class", current.icon).attr("height", "50").attr("width", "50").appendTo(container);
    $("<p>").text("Temperature " + current.temperature + " C").appendTo(container);
    $("<p>").text(current.summary).appendTo(container)
}

function hourlyWeather(hourly) {
    //Show Hourly weather
    var containerNode = $("<table>");
    var today = new Date();
    for (var i = 0; i < hourly.data.length; i++) {
        var hourlyData = hourly.data[i];
        var time = new Date(hourlyData.time * 1000);
        if (time.getDate() === today.getDate()) {
            time = time.getHours() + ":00";
            var hourNode = $("<tr>");
            $("<td>").text(time).appendTo(hourNode);
            $("<td>").text(hourlyData.humidity.toString().split(".")[1] + "%").appendTo(hourNode);
            $("<td>").text(hourlyData.cloudCover == 1 ? "100%" : hourlyData.cloudCover.toString().split(".")[1] + "%").appendTo(hourNode);
            $("<td>").text(hourlyData.temperature + " C").appendTo(hourNode);
            $("<td>").text(hourlyData.windSpeed + " km/h").appendTo(hourNode);
            //$("<td>").html($("<i>").addClass("wi").addClass("wi-forecast-io-" + hourlyData.icon)).appendTo(hourNode);
            $("<canvas>").attr("class", hourlyData.icon).attr("height", "32").attr("width", "32").appendTo(hourNode);
            $("<td>").text(hourlyData.summary).appendTo(hourNode);
            hourNode.appendTo(containerNode)
        }
    }
    containerNode.appendTo($(".weather-forecast"))
}