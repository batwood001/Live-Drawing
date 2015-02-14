(function () {

	// var canvasDiv = document.getElementById('canvasDiv');
	// window.canvas = document.createElement('canvas');
	// canvas.setAttribute('width', '1400'); // change all of this in CSS later
	// canvas.setAttribute('height', "800");
	// canvas.setAttribute('id', 'canvas');
	// canvasDiv.appendChild(canvas);
	

	canvas = document.getElementById('canvas')//$('#canvas')[0];
	canvas.width = 1400;
	canvas.height = 700;

	// if(typeof G_vmlCanvasManager != 'undefined') {
	// 	canvas = G_vmlCanvasManager.initElement(canvas);
	// }

	context = canvas.getContext("2d");

	var socket = io('https://obscure-waters-3274.herokuapp.com');

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
		console.log(line.end)
		if(myLine === true) {
			socket.emit('paint', line)
		}
		console.log(line.begin.mouseX, line.end.mouseX, context.strokeStyle)
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
