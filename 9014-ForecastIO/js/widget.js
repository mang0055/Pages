//widget.js
var forecastKey = "276618fdf273055e86df538cf2c9cce1";
var lat = "45.348391";
var long = "-75.757045";
var numLoaded=0;
var totalRequired=2;
var h=document.querySelector("head");
var s1=document.createElement("script");
var s2=document.createElement("script");
var link=document.createElement("link");
h.appendChild(link);
link.setAttribute("rel","stylesheet");
link.setAttribute("href","css/widget.css");
h.appendChild(s1);
h.appendChild(s2);
s1.addEventListener("load",loaded);
s2.addEventListener("load",loaded);
s1.setAttribute("type","text/javascript");
s1.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");


function loaded(){
    numLoaded++;
    if(numLoaded=totalRequired){
        getData();
    }
    console.log('ScriptLoaded: '+numLoaded);
}
function getData(){
    $.ajax({
        url: "https://api.forecast.io/forecast/" + forecastKey + "/" + lat + "," + long + "?units=ca",
        method:'GET',
        dataType:'jsonp'
    }).success(function(data){
        console.log(data);
        todayWeather(data.currently);
        hourlyWeather(data.hourly);
        console.log(data)
    }).error(function(jqXHR,textStatus,errorThrown){
        console.log(errorThrown);
    });
    
}
function todayWeather(current) {
    //Show current weather
    var today = new Date();
    var container = $(".weather-forecast");
    $("<p>").text("Current Conditions for today, " + today.getDate() + "/" + (parseInt(today.getMonth()) + 1)).appendTo(container);
    $("<i>").addClass("wi").addClass("wi-forecast-io-" + current.icon).addClass("current").appendTo(container);
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
            $("<td>").html($("<i>").addClass("wi").addClass("wi-forecast-io-" + hourlyData.icon)).appendTo(hourNode);
            $("<td>").text(hourlyData.summary).appendTo(hourNode);
            hourNode.appendTo(containerNode)
        }
    }
    containerNode.appendTo($(".weather-forecast"))
}