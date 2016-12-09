var star1 = new Image();
star1.src = "./img/star1.png"
var star2 = new Image();
star2.src = "./img/star2.png"
var star3 = new Image();
star3.src = "./img/star3.png"
var star4 = new Image();
star4.src = "./img/star4.png"
var star5 = new Image();
star5.src = "./img/star5.png"


var grey = new Image();
grey.src = "./img/colordefault.png"

var red = new Image();
red.src = "./img/6.png"
red.place = 208
var orange = new Image();
orange.src = "./img/5.png"
orange.place = 272
var yellow = new Image();
yellow.src = "./img/4.png"
yellow.place = 336
var green = new Image();
green.src = "./img/3.png"
green.place = 400
var blue = new Image();
blue.src = "./img/2.png"
blue.place = 464
var purple = new Image();
purple.src = "./img/1.png"
purple.place = 528

var redp = new Image();
redp.src = "./img/p6.png"
var orangep = new Image();
orangep.src = "./img/p5.png"
var yellowp = new Image();
yellowp.src = "./img/p4.png"
var greenp = new Image();
greenp.src = "./img/p3.png"
var bluep = new Image();
bluep.src = "./img/p2.png"
var purplep = new Image();
purplep.src = "./img/p1.png"

var ship = new Image();
ship.src = "./img/ship.png"
var bolt = new Image();
bolt.src = "./img/bolt.png"

var empty = new Image();
empty.src = "./img/empty.png"
var win = new Image();
win.src = "./img/win.png"

var gameCanvas = document.getElementById("gameCanvas");
var getContext = gameCanvas.getContext("2d")

var scene = 0
var spaceX = [0]
for (i = 0; i < 25; i++){
	spaceX[i] = Math.random() * gameCanvas.width;
}
var spaceY = [0]
for (i = 0; i < 25; i++){
	spaceY[i] = Math.random() * -gameCanvas.height;
}

var planetX = []
var planetX = [0]
for (i = 0; i <7; i++){
	planetX[i] = Math.random() * gameCanvas.width;
	console.log(planetX)
}
var planetY = [-450, -255,-780,-1234,-330,-1520]

var colors = [0,0,0,0,0,0]
var colorspics = [red,orange,yellow,green,blue,purple]
var shipx = 0
var bolts = 0
var boltx = []
var bolty = [470]

function includesRange(array, lower, upper){
	var range = [];
	for (var i = lower; i < upper+1; i++){
		range[i-lower] = i;
	}
		for (var j = 0; j < range.length; j++){
			if (array.includes(range[j])) return true;
		}
		return false;
}

function begin() {
    //gameCanvas.getContext("2d").drawImage(spriteImage, Math.random() * gameCanvas.width, Math.random() * gameCanvas.height)

	//setInterval(tick, 6);
	gameCanvas.addEventListener("mousemove", move)
	requestAnimationFrame(tick)
	//gameCanvas.addEventListener("mousemove", redrawAvatar);

};

function move(mouseEvent){
	shipx = mouseEvent.offsetX
};

function shoot(){
	boltx[bolts] = shipx -15
	bolty[bolts] = 470
	bolts = bolts + 1;

}

function tick(){


	gameCanvas.width = 800


	for (i = 208; i < 592; i = i+64){
		getContext.drawImage(grey, i, 0);
	}

	for (i = 0; i < 6; i++){
		if (colors[i] > 5){
			getContext.drawImage(colorspics[i], colorspics[i].place, 0)
			scene = scene + 1
		}
	}





	for (i = 0; i < 5; i++){
		getContext.drawImage(star1, spaceX[i], spaceY[i]);
		getContext.drawImage(star2, spaceX[i+5], spaceY[i+5]);
		getContext.drawImage(star3, spaceX[i+10], spaceY[i+10]);
		getContext.drawImage(star4, spaceX[i+15], spaceY[i+15]);
		getContext.drawImage(star5, spaceX[i+20], spaceY[i+20]);
	};

	getContext.drawImage(redp, planetX[0], planetY[0])
	getContext.drawImage(orangep, planetX[1], planetY[1])
	getContext.drawImage(yellowp, planetX[2], planetY[2])
	getContext.drawImage(greenp, planetX[3], planetY[3])
	getContext.drawImage(bluep, planetX[4], planetY[4])
	getContext.drawImage(purplep, planetX[5], planetY[5])


	for (i = 0; i < spaceY.length; i++){
		spaceY[i] = spaceY[i]+ 2
		if (spaceY[i] > 600){
			spaceY[i] = 0
			spaceX[i] = Math.random() * gameCanvas.width
		}
	};

		for (i = 0; i < 6; i++){
		planetY[i] = planetY[i]+ 2
		if (planetY[i] > 600){
			planetY[i] = Math.random() * -gameCanvas.height - 700
			planetX[i] = Math.random() * gameCanvas.width
		}else{
			for (a = 0; a < bolts; a++){
				if (Math.abs(planetX[i]-boltx[a]) < 30 && Math.abs(planetY[i]-bolty[a])< 8){
					planetY[i] = Math.random() * -gameCanvas.height - 700
					planetX[i] = Math.random() * gameCanvas.width
					colors[i] = colors[i] + 1
					console.log(colors[i])
					bolty[a] = "x"
				}
			}
		}
	}




	for (i = 0; i < bolts; i++){
		if (bolty[i] == "x"){
		}else{
			getContext.drawImage(bolt, boltx[i] , bolty[i])
		}
	};

	for (i = 0; i < bolts; i++){
		bolty[i] = bolty[i] - 5
		if (bolty[i] < 0){
			bolty[i] = "x"
		}
	};

		if (scene == 6){
		getContext.drawImage(win, 270, 230)
	}else{
		scene = 0
	getContext.drawImage(ship, shipx - 55 , 470)

	requestAnimationFrame(tick)
	}


};



window.onload = function(){
	begin()
}

