'use strict';

var express = require('express'),
  port = 2020,
  path = require('path'),
  _ = require('lodash'),
  rp = require('request-promise'),
  qs = require('qs'),
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

  console.log('qParams ', qParams);

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

  var searchParameters;
  var searchTerms;

  //is zipcode 
  var regexpZipCode = new RegExp("^\\d{5}(-\\d{4}?$)");
  // var regexpCityState = new RegExp("/^[A-Za-z]+&?[A-Za-z]+{2,}$/;");

  //is city


  //querystring.stringify

  var apiUrl = 'http://weather.wdtinc.com/feeds/imapweather/worldForecast2Xml.php?';

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