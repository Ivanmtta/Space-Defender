function Enemy(x, y){
	this.size = 46;
	this.y = Math.floor(Math.random() * frame.height);
	this.angle = 0;
	this.velocity = Math.floor(Math.random() * 2) + 2;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.hitPoints = 10;
	this.damageTic = 0;
	this.deathTic = 0;
	this.deathFrame = 0;
	this.collidingTop = false;
	this.collidingBot = false;
	this.collidingLeft = false;
	this.collidingRight = false;
	this.takingDamage = false;
	this.canDamage = true;
	this.death = false;

	this.update = function(){
		this.checkDeath();
		if(!this.death){
			this.checkBulletCollision();
			this.checkCollisions();
			if(this.takingDamage){
				this.checkDamage();
			}
			this.angle = -Math.atan2((player.y - player.size / 2) - (this.y - this.size / 2), (player.x - player.size / 2) - (this.x - this.size / 2));
			this.xSpeed = this.velocity * Math.cos(this.angle);
			this.ySpeed = this.velocity * -Math.sin(this.angle);
			this.x += this.xSpeed;
			this.y += this.ySpeed;
		}
	}

	this.draw = function(){
		graphics.save();
		graphics.translate(this.x - this.size / 2, this.y - this.size / 2);
		graphics.rotate(-this.angle);
		graphics.translate(-this.x - this.size / 2, -this.y - this.size / 2);
		if(this.death){
			graphics.drawImage(enemyDeath[this.deathFrame], this.x, this.y, this.size, this.size);
		}
		else if(this.takingDamage){
			graphics.drawImage(enemyDamageImage, this.x, this.y, this.size, this.size);
		}
		else{
			graphics.drawImage(enemyImage, this.x, this.y, this.size, this.size);
		}
		graphics.restore();
	}

	this.generateX = function(){
		var randNum = Math.floor(Math.random() * 2);
		if(randNum == 0){
			return - (this.size * 2);
		}
		else{
			return frame.width + (this.size * 2);
		}
	}

	this.checkBulletCollision = function(){
		for(var i = 0; i < player.bullets.length; i++){
			var hb1 = player.bullets[i];
			if(hb1.x < this.x &&
				hb1.x + hb1.size > this.x - this.size &&
				hb1.y < this.y &&
				hb1.y + hb1.size > this.y - this.size){
				player.bullets.splice(player.bullets.indexOf(player.bullets[i]), 1);
				if(this.canDamage && !this.death){
					this.hitPoints --;
					this.takingDamage = true;
					this.canDamage = false;
				}
			}
		}
	}

	this.checkDamage = function(){
		if(this.damageTic == 5){
			this.damageTic = 0;
			this.takingDamage = false;
			this.canDamage = true;
		}
		this.damageTic ++;
	}

	this.checkCollisions = function(){
		this.collidingTop = false;
		this.collidingBot = false;
		this.collidingLeft = false;
		this.collidingRight = false;
		for(var i = 0; i < enemies.length; i++){

		}
	}

	this.checkDeath = function(){
		if(this.hitPoints == 0){
			if(this.deathTic == 10){
				this.deathFrame ++;
				if(this.deathFrame == 4){		
					enemies.splice(enemies.indexOf(this), 1);
				}
				this.deathTic = 0;
			}
			this.deathTic ++;
			this.death = true;
		}
	}

	this.x = this.generateX();
}