var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url')

app.listen(process.env.PORT || 80);

function handler (req, res) {

  switch (req.url){

    case "/":

      fs.readFile('./drawing_page.html', function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading drawing_page.html');
        }

        res.writeHead(200);
        res.end(data);
      });  

    case "/Assets/Javascripts/drawing.js": // Can I not give these endpoints any name I want?
    console.log("hi");
      fs.readFile('Assets/Javascripts/drawing.js', {encoding: "utf8"}, function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading drawing.js');
        }
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(data);
      });

    case "/Vendor/Javascripts/jquery.ui.colorPicker.js":
      fs.readFile('Vendor/Javascripts/jquery.ui.colorPicker.js', {encoding: "utf8"}, function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading jquery.ui.colorPicker.min.js');
        }
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(data);
      });

    case "/Vendor/Stylesheets/jquery.ui.colorPicker.css":
      fs.readFile('Vendor/Stylesheets/jquery.ui.colorPicker.css', function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading jquery.ui.colorPicker.css');
        }
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      });

    case "/Vendor/Images/transparent.gif":
      fs.readFile('Vendor/Images/transparent.gif', function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading transparent.gif');
        }
        res.writeHead(200, {'Content-Type': 'img'}); // necessary?
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
