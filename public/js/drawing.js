(function () {
	
	canvas = document.getElementById('canvas');
	canvas.width = 1400;
	canvas.height = 700;

	context = canvas.getContext("2d");

	var socket = io('https://obscure-waters-3274.herokuapp.com');
	// var socket = io('localhost');

	window.line = {};
	line.begin = {};
	line.end = {};
	line.begin.mouseX = undefined;
	line.begin.mouseY = undefined;

	//**
	// PC
	//**

	$('#canvas').mousedown(function(e){
		line.drawing = true;
	  	line.begin.mouseX = e.pageX - this.offsetLeft;
	  	line.begin.mouseY = e.pageY - this.offsetTop;
	  	line.strokeStyle = AppCanvas.penColor;

	  	drawLine(line, true);

	});


	$('#canvas').mousemove(function(e){
		if(line.drawing == true) {	
			line.end.mouseX = e.pageX - this.offsetLeft;
			line.end.mouseY = e.pageY - this.offsetTop;

			drawLine(line, true)

			line.begin.mouseX = line.end.mouseX;
			line.begin.mouseY = line.end.mouseY;
			line.end.mouseX = undefined;
			line.end.mouseY = undefined;
		}
	});

	$('#canvas').mouseup(function(e){
		line.drawing = false;
	});

	$('#canvas').mouseleave(function(e){
	});

	//**
	// Mobile
	//**

	$('#canvas').on('touchstart', function(e){
		e.preventDefault();
		line.drawing = true;
	  	line.begin.mouseX = e.originalEvent.targetTouches[0].pageX - this.offsetLeft;
	  	line.begin.mouseY = e.originalEvent.targetTouches[0].pageY - this.offsetTop;
	  	line.strokeStyle = AppCanvas.penColor;

	  	drawLine(line, true);
	})

	$('#canvas').on('touchmove', function(e){
		if(line.drawing = true) {
		e.preventDefault();
		line.end.mouseX = e.originalEvent.targetTouches[0].pageX - this.offsetLeft;
		line.end.mouseY = e.originalEvent.targetTouches[0].pageY - this.offsetTop;

		drawLine(line, true)

		line.begin.mouseX = line.end.mouseX;
		line.begin.mouseY = line.end.mouseY;
		line.end.mouseX = undefined;
		line.end.mouseY = undefined;
	  }
	})

	$('#canvas').on('touchend', function(e){
		e.preventDefault();
		line.drawing = true;
	  	line.begin.mouseX = e.pageX - this.offsetLeft;
	  	line.begin.mouseY = e.pageY - this.offsetTop;
	  	line.strokeStyle = AppCanvas.penColor;

	  	drawLine(line, true);
	})



	function drawLine(line, myLine){
		if(myLine === true) {
			socket.emit('paint', line)
		}
		context.beginPath();
		context.moveTo(line.begin.mouseX, line.begin.mouseY)
		context.lineTo(line.end.mouseX, line.end.mouseY);
		context.strokeStyle = line.strokeStyle;
		context.stroke();
	};

	socket.on('paint', function (data) {
		drawLine(data, false);
	});
})();
