var frame = document.getElementById("frame");
var graphic = frame.getContext("2d");

document.addEventListener("mousedown", mousePressed);
document.addEventListener("mouseup", mouseReleased);
document.addEventListener("mousemove", mouseMoved);
document.addEventListener("drag", mouseMoved);

const FPS = 60;
const FRICTION = 1;

var mouse = {
	x: 0,
	y: 0
};

var player = {
	x: frame.width / 2,
	y: frame.height / 2,
	radius: 30,
	angle: 0,
	velocity: 5,
	thrusting: false,
	thrust: {
		x: 0,
		y: 0
	}
};

function update(){
	updatePlayerMovement();
	handleEdges();
	draw();
}

function draw(){
	graphic.clearRect(0, 0, frame.width, frame.height);
	drawPlayer();
	if(player.thrusting){
		drawThruster();
	}
}

function updatePlayerMovement(){
	if(player.thrusting){
		player.thrust.x += player.velocity * Math.cos(player.angle) / FPS;
		player.thrust.y -= player.velocity * Math.sin(player.angle) / FPS;
	}
	else{
		player.thrust.x -= FRICTION * player.thrust.x / FPS;
		player.thrust.y -= FRICTION * player.thrust.y / FPS;
	}
	player.x += player.thrust.x;
	player.y += player.thrust.y;
}

function handleEdges(){
	if(player.x + player.radius < 0){
		player.x = frame.width + player.radius;
	}
	if(player.x - player.radius > frame.width){
		player.x = 0 - player.radius;
	}
	if(player.y + player.radius < 0){
		player.y = frame.height + player.radius;
	}
	if(player.y - player.radius > frame.height){
		player.y = 0 - player.radius;
	}
}

function drawPlayer(){
	graphic.strokeStyle = "white";
	graphic.lineWidth = 2;
	graphic.beginPath();
	graphic.moveTo(
		player.x + 4 / 3 * player.radius * Math.cos(player.angle), 
		player.y - 4 / 3 * player.radius * Math.sin(player.angle));
	graphic.lineTo(
		player.x - player.radius * (2 / 3 * Math.cos(player.angle) + Math.sin(player.angle)), 
		player.y + player.radius * (2 / 3 * Math.sin(player.angle) - Math.cos(player.angle)));
	graphic.lineTo(
		player.x - player.radius * (2 / 3 * Math.cos(player.angle) - Math.sin(player.angle)), 
		player.y + player.radius * (2 / 3 * Math.sin(player.angle) + Math.cos(player.angle)));
	graphic.closePath();
	graphic.stroke();
}

function drawThruster(){
	graphic.strokeStyle = "white";
	graphic.lineWidth = 2;
	graphic.beginPath();
	graphic.moveTo(
		player.x - player.radius * (2 / 3 * Math.cos(player.angle) + 0.35 * Math.sin(player.angle)), 
		player.y + player.radius * (2 / 3 * Math.sin(player.angle) - 0.35 * Math.cos(player.angle)));
	graphic.lineTo(
		player.x - player.radius * (4 / 3 * Math.cos(player.angle)), 
		player.y + player.radius * (4 / 3 * Math.sin(player.angle)));
	graphic.lineTo(
		player.x - player.radius * (2 / 3 * Math.cos(player.angle) - 0.35 * Math.sin(player.angle)), 
		player.y + player.radius * (2 / 3 * Math.sin(player.angle) + 0.35 * Math.cos(player.angle)));
	graphic.closePath();
	graphic.stroke();
}

function calculateAngles(){
	player.angle = - Math.atan2(mouse.y - player.y, mouse.x - player.x);
}

function mousePressed(){
	player.thrusting = true;
}

function mouseReleased(){
	player.thrusting = false;
}

function mouseMoved(event){
	calculateAngles();
	mouse.x = event.x;
	mouse.y = event.y;
}

setInterval(update, 1000 / FPS);