var express = require('express');
var app = express();

app.use(express.static(__dirname + '/site'));

var server = app.listen(1234, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Project: Loop-v3.0'); 
	console.log('View it at http://%s:%s on your browser. ', host, port);
	console.log('Press Ctrl+C to interrupt execution. '); 
});