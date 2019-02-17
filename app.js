var input = document.getElementById('start');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
