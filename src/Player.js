function Player(){
	this.size = 46;
	this.x = frame.width / 2 - this.size / 2;
	this.y = frame.height / 2 - this.size / 2;
	this.angle = 0;
	this.velocity = 5;
	this.thrusting = false;
	this.thrust = {
		x: 0,
		y: 0
	};
	this.playerNormal = new Image();
	this.playerNormal.src = "img/player.png";
	this.playerThrusting = new Image();
	this.playerThrusting.src = "img/playerThrust.png";

	this.update = function(){
		if(this.thrusting){
			this.thrust.x += this.velocity * Math.cos(this.angle) / FPS;
			this.thrust.y -= this.velocity * Math.sin(this.angle) / FPS;
		}
		else{
			this.thrust.x -= FRICTION * this.thrust.x / FPS;
			this.thrust.y -= FRICTION * this.thrust.y / FPS;
		}
		this.x += this.thrust.x;
		this.y += this.thrust.y;
		this.handleEdges();
	}

	this.draw = function(){
		graphics.save();
		graphics.translate(this.x - this.size / 2, this.y - this.size / 2);
		graphics.rotate(-this.angle);
		graphics.translate(-this.x - this.size / 2, -this.y - this.size / 2);
		if(player.thrusting){
			graphics.drawImage(this.playerThrusting, this.x, this.y, this.size, this.size);
		}
		else{
			graphics.drawImage(this.playerNormal, this.x, this.y, this.size, this.size);
		}
		graphics.restore();
	}

	this.handleEdges = function(){
		if(this.x + this.size < 0){
			this.x = frame.width;
		}
		if(this.x - this.size > frame.width){
			this.x = 0;
		}
		if(this.y + this.size < 0){
			this.y = frame.height;
		}
		if(this.y - this.size > frame.height){
			this.y = 0;
		}
	}
}