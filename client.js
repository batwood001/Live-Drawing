(function () {
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', '1400'); // change all of this in CSS later
	canvas.setAttribute('height', "800");
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}

	context = canvas.getContext("2d");

	var socket = io('https://obscure-waters-3274.herokuapp.com');

	var colorPurple = "#cb3594";
	var colorGreen = "#659b41";
	var colorYellow = "#ffcf33";
	var colorBrown = "#986928";

	var curColor = colorPurple;

	$("#choosePurpleSimpleColors").click(function(){
		curColor = colorPurple;
	})

	$("#chooseGreenSimpleColors").click(function(){
		curColor = colorGreen
	})

	$("#chooseYellowSimpleColors").click(function(){
		curColor = colorYellow
	})

	$("#chooseBrownSimpleColors").click(function(){
		curColor = colorBrown
	})

	var line = {};
	line.begin = {};
	line.end = {};
	line.begin.mouseX = undefined;
	line.begin.mouseY = undefined;

	//**
	// Web
	//**

	$('#canvas').mousedown(function(e){
		line.drawing = true;
	  	line.begin.mouseX = e.pageX - this.offsetLeft;
	  	line.begin.mouseY = e.pageY - this.offsetTop;
	  	line.strokeStyle = curColor;

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
	  	line.strokeStyle = curColor;

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
	  	line.strokeStyle = curColor;

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
