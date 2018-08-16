var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

frame.addEventListener("mousedown", mousePressed);
frame.addEventListener("mouseup", mouseReleased);
frame.addEventListener("mousemove", mouseMoved);
frame.addEventListener("drag", mouseMoved);
frame.addEventListener("touchmove", mouseMoved);
frame.addEventListener("touchstart", mousePressed);
frame.addEventListener("touchcancel", mouseReleased);
graphics.imageSmoothingEnabled = false;

window.onload = onCreate;

const FPS = 60;
const FRICTION = 1;

var background;
var player;
var mouse = {
	x: 0,
	y: 0
};

var enemyImage = new Image();
enemyImage.src = "img/enemy.png";
var bulletImage = new Image();
bulletImage.src = "img/bullet.png";
var enemy = [];

function onCreate(){
	background = new Background();
	player = new Player();
	enemy.push(new Enemy());
}

function update(){
	background.update();
	player.update();
	for(var i = 0; i < enemy.length; i++){
		enemy[i].update();
	}
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	background.draw();
	for(var i = 0; i < enemy.length; i++){
		enemy[i].draw();
	}
	player.draw();
}

function mousePressed(){
	player.thrusting = true;
	player.shooting = true;
}

function mouseReleased(){
	player.thrusting = false;
	player.shooting = false;
}

function mouseMoved(event){
	mouse.x = event.x;
	mouse.y = event.y;
}

setInterval(update, 1000 / FPS);