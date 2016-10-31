var app = require('express')();
var http = require('http');
var router = require('./components/router.js');


/**
* This method will call on Request received
* @var req Request current request
* @var res array received request
* 
*/

function onRequest(req, res) {
	var body = '';
	req.on('data', function(chunk) {
		body += chunk;
	});
	req.on('end', function() {
		router.route(req, res, body);
	});
}

var server = http.createServer(onRequest);
server.listen(8080);