function Bullet(initialX, initialY, targetX, targetY){
	this.x = initialX;
	this.y = initialY;
	this.size = 10;
	this.theta = Math.atan2(targetY - initialY, targetX - initialX);
	this.velocity = 10;
	this.xSpeed = Math.cos(this.theta) * this.velocity;
	this.ySpeed = Math.sin(this.theta) * this.velocity;

	this.update = function(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	this.draw = function(){
		graphics.drawImage(bulletImage, this.x, this.y, this.size, this.size);
	}
}