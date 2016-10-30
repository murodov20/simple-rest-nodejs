var Datastore = require('nedb');
var db = new Datastore({ filename: './data/messages', autoload: true });
var querystring = require('querystring');
var url = require('url');

exports.create = function(req, res, body) {
	insert(body, function(error, result) {
		res.writeHead(200, { "Content-Type": "plain/text" });
		res.write('success');
		res.end();
	});
};

exports.read = function(req, res) {
	findAll({}, function(error, results) {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify(results));
		res.end();
	});
};

function insert(body, callback) {
	body = typeof body === 'string' ? JSON.parse(body) : body;
	var msg = {
		author: body.author,
		message: body.message,
		date: new Date()
	};
	db.insert(msg, callback);
}

function findAll(where, callback) {
	where = where || {};
	db.find(where, callback);
}