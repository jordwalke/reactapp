/**
 * TODO:
 */
var browserify = require('browserify-middleware');
var reactify = require('reactify');
var express = require('express');
var app = express();

var PORT_NUMBER = 8080;

app.get(
  '/build/monolithicBuild.js',
  browserify('../client/clientMain.jsx', {
    cache: 'dynamic',
    transform: reactify,
    debug: true         // Source maps
  })
);
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/../../'));
console.log(__dirname + '/../../');
console.log('listening on port ' + PORT_NUMBER);
app.listen(PORT_NUMBER);
