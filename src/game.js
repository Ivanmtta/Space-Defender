var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("mousedown", mousePressed);
document.addEventListener("mouseup", mouseReleased);
document.addEventListener("mousemove", mouseMoved);
document.addEventListener("drag", mouseMoved);
graphics.imageSmoothingEnabled = false;

window.onload = onCreate;

const FPS = 60;
const FRICTION = 1;

var player;
var mouse = {
	x: 0,
	y: 0
};

var backgroundImage = new Image();
backgroundImage.src = "img/background.png";

function onCreate(){
	player = new Player();
}

function update(){
	player.update();
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.drawImage(backgroundImage, 0, 0, frame.width, frame.height);
	player.draw();
}

function calculateAngles(){
	player.angle = -Math.atan2(mouse.y - (player.y - player.size / 2), mouse.x - (player.x - player.size / 2));
}

function mousePressed(){
	player.thrusting = true;
}

function mouseReleased(){
	player.thrusting = false;
}

function mouseMoved(event){
	mouse.x = event.x;
	mouse.y = event.y;
	calculateAngles();
}

setInterval(update, 1000 / FPS);