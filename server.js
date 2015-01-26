'use strict';

var express = require('express'),
  port = 2020,
  path = require('path'),
  _ = require('lodash'),
  fs = require('fs'),
  xml2js = require('xml2js');

var parser = new xml2js.Parser();

var app = express();

var config = {
  root: './app'
};

function getForecast(req, res) {
  var qParams = req.query || {},
    datatype = qParams.datatype || 'json';

  function sendData(error, xmlData) {
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

  fs.readFile('./forecast.xml', 'utf8', sendData);
}

app.get('/forecast', getForecast);

app
  .use(express.static(config.root))
  .listen(port);

console.log('app listening on port ', port);