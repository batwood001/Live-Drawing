var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 80);

app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

io.on('connection', function (socket) {
	var address = socket.handshake.address;
	console.log("New connection from " + address.address + ":" + address.port);

  	socket.on('paint', function (data) {
  		socket.broadcast.emit('paint', data)
  	});

});