var app = require('express')();
var http = require('http');
// var io = require('socket.io')(http.Server(app));
var router = require('./components/router.js');


/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});*/

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