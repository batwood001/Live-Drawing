var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url')


app.listen(process.env.PORT || 8888);

function handler (req, res) {

  switch (req.url){

    case "/":

      fs.readFile('./canvas_demo.html', function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading canvas_demo.html');
        }
        res.writeHead(200);
        res.end(data);
      });  

    case "/client.js":
      fs.readFile('./client.js', {encoding: "utf8"}, function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading client.js');
        }
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end(data);
      });
  }
}

io.on('connection', function (socket) {
	var address = socket.handshake.address;
	console.log("New connection from " + address.address + ":" + address.port);

  	socket.on('paint', function (data) {
  		socket.broadcast.emit('paint', data)
  	});

});
