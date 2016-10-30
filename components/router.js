var messages = require('./../db/message.js');

var url = require('url');

exports.route = (function() {
	var handlers = {};
	handlers['/msg'] = {
		POST: messages.create,
		GET: messages.read
	};

	function route(req, res, body) {
		var pathname = url.parse(req.url)
			.pathname;
		var method = req.method.toUpperCase();
		if (typeof handlers[pathname][method] === 'function') {
			handlers[pathname][method](req, res, body);
		} else {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.write('pathname error');
			res.end();
		}
	}
	return route;
})();
