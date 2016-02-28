document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        //code goes here to find position
        var params = {
            enableHighAccuracy: false,
            timeout: 3600,
            maximumAge: 60000
        };
        //enableHighAccuracy means try to use GPS and drain the battery
        //for improved accuracy within a few meters.
        //maximum age is how long to cache the location info
        //timeout is how long to wait for the network to respond after the user says ok
        navigator.geolocation.getCurrentPosition(reportPosition, gpsError, params);

        //to continually check the position (in case it changes) use
        //navigator.geolocation.watchPosition( reportPosition, gpsError, params)
    } else {
        //browser does not support geolocation api
        alert("Sorry, but your browser does not support location based awesomeness.")
    }
});

function reportPosition(position) {
    var google_tile = "http://maps.google.com/maps/api/staticmap?zoom=14&size=400x400&maptype=terrain&sensor=true&markers=size:mid%7Ccolor:red%7C"+ position.coords.latitude + ',' + position.coords.longitude;
    var canvas = document.createElement("canvas");
    canvas.height = 400;
    canvas.width = 400;
    document.querySelector("body").appendChild(canvas);
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    imageObj.src = google_tile;
    imageObj.onload = function () {
        context.drawImage(imageObj, 0, 0);
    }
}

function gpsError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}