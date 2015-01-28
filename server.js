'use strict';

var express = require('express'),
  port = 2020,
  path = require('path'),
  _ = require('lodash'),
  rp = require('request-promise'),
  qs = require('query-string'),
  fs = require('fs'),
  xml2js = require('xml2js');

var parser = new xml2js.Parser();

var app = express();

var config = {
  root: './app'
};

function getForecast(req, res) {
  var qParams = req.query || {},
    datatype = qParams.datatype || 'json',
    location = qParams.location;

  console.log('qParams ', location);

  function sendData(xmlData) {
    var xmlRequested = datatype.toLowerCase() === 'xml';

    function returnJSON(err, jsonData) {
      res.send(jsonData);
    }

    if (xmlRequested) {
      res.send(xmlData);
      return;
    }

    parser.parseString(xmlData, returnJSON);
  }

  var splitLocation = location.split(',');
  var params="";
  if(splitLocation.length === 2) {
    //city=index 0 & state=index1
    params="CITY=" + splitLocation[0].trim() + "&STATE=" + splitLocation[1].trim();
  } else {
    //assuming that otherwise it's a 5 int zip code
    //zip=index0
    params="ZIP=" + splitLocation[0].trim();
  }

  console.log('split da location: ', splitLocation);

  var apiUrl = 'http://weather.wdtinc.com/feeds/imapweather/worldForecast2Xml.php?' + params;

  rp(apiUrl) //?ZIP=73072 ?CITY=Norman&STATE=OK
    .then(sendData)
    .catch(console.error);

  //  fs.readFile('./forecast.xml', 'utf8', sendData);
}

app.get('/forecast', getForecast);

app
  .use(express.static(config.root))
  .listen(port);

console.log('app listening on port ', port);
