var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

frame.addEventListener("mousedown", mousePressed);
frame.addEventListener("mouseup", mouseReleased);
frame.addEventListener("mousemove", mouseMoved);
frame.addEventListener("drag", mouseMoved);
frame.addEventListener("touchmove", touchMove);
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
var tics = 120;

var enemyImage = new Image();
enemyImage.src = "img/enemy.png";
var enemyDamageImage = new Image();
enemyDamageImage.src = "img/enemyDamage.png";
var bulletImage = new Image();
bulletImage.src = "img/bullet.png";
var enemyDeath = [];
for(var i = 0; i < 4; i++){
	enemyDeath[i] = new Image();
}
enemyDeath[0].src = "img/enemyDeath1.png";
enemyDeath[1].src = "img/enemyDeath2.png";
enemyDeath[2].src = "img/enemyDeath3.png";
enemyDeath[3].src = "img/enemyDeath4.png";
var enemies = [];

function onCreate(){
	background = new Background();
	player = new Player();
}

function update(){
	generateEnemies();
	background.update();
	player.update();
	for(var i = 0; i < enemies.length; i++){
		enemies[i].update();
	}
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	background.draw();
	for(var i = 0; i < enemies.length; i++){
		enemies[i].draw();
	}
	player.draw();
}

function generateEnemies(){
	if(tics >= 20 && enemies.length <= 10){
		enemies.push(new Enemy());
		tics = 0;
	}
	tics ++;
}

function mousePressed(){
	player.thrusting = true;
	player.shooting = true;
}

function mouseReleased(){
	player.thrusting = false;
	player.shooting = false;
}

function touchMove(event){
	mouse.x = event.touches[0].clientX;
	mouse.y = event.touches[0].clientY;
}

function mouseMoved(event){
	mouse.x = event.x;
	mouse.y = event.y;
}

setInterval(update, 1000 / FPS);