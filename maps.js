var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// viewed at http://localhost:8080
app.post('/maps.js', function(req, res) {
    console.log(req);
    res.send(getCarbon(req.body.model));
});

app.listen(8080);

var splunkjs = require('splunk-sdk');

var service = new splunkjs.Service({username: "juliewang", password: "Cars2020!"});

var getCarbon = function(model) {
service.login(function(err, success) {
    if (err) {
      console.log(err);
        throw err;
    }

    console.log("Login was successful: " + success);
     var jobs = service.jobs();
      jobs.oneshotSearch(`search ${model}`, {Model: ""}, function(err, results) {
        var response = results.rows[0][3];
        var commaCount = 0;
        for (i = 0; i<response.length; i++) {
          if (response[i] === ',') {
            commaCount++;
            if (commaCount == 12){
                cityMPG = response.substring(i+1, i+3);
                hwyMPG = response.substring(i+4,i+6);
                combMPG = response.substring(i+7,i+9);
            }
          }
        }
        var comb_gallons = distance/parseInt(combMPG);
        var total_comb = comb_gallons*8887;
        console.log('combMPG:'+ combMPG);

        return total_comb;

 });
});
}
