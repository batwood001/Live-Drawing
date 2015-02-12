var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');


// http.createServer(function(request, response) {  
// 	fs.readFile('./canvas_demo.html', function (err, html) {
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.end(html);  
// 	});
// }).listen(8000);

app.listen(80);

function handler (req, res) {
  fs.readFile('./canvas_demo.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
	var address = socket.handshake.address;
	console.log("New connection from " + address.address + ":" + address.port);
  	socket.on('update', function (data) {
	  	console.log(data);
	    socket.broadcast.emit("news", data);
  	});

  	socket.on('mousedown', function (data) {
  		console.log(data);
  		socket.broadcast.emit('mousedown', data)
  	});

  	socket.on('mousemove', function (data) {
  		console.log(data);
  		socket.broadcast.emit('mousemove', data)
  	});

  	socket.on('mouseup', function (data) {
  		socket.broadcast.emit('mouseup')
  	})
});