(function() {

	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Game = Asteroids.Game = function(ctx, numAsteroids) {
		this.ctx = ctx;
		this.ctx.fillStyle = "grey";
		this.ctx.fillRect(0, 0, 600, 400);
		this.asteroids = this.addAsteroids(numAsteroids);
		this.ship = new Asteroids.Ship();
		this.bullets = [];
		this.intervalId;
	}

	Game.DIMX = function() {
		return 600;
	}
	Game.DIMY = function() {
		return 400;
	}
	
	Game.FPS = function() {
		return 50;
	}

	Game.prototype.addAsteroids = function(numAsteroids) {
		asteroids = [];
		for (var i = 0; i < numAsteroids; i++) {
			asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIMX(), Game.DIMY()));
		}
		return asteroids;
	}

	Game.prototype.draw = function() {
		this.ctx.clearRect(0, 0, Game.DIMX(), Game.DIMY());
		this.ctx.fillStyle = "grey";
		this.ctx.fillRect(0, 0, 600, 400);

		this.ship.draw(this.ctx);

 		for (var i = 0; i < this.asteroids.length; i++) {
 			this.asteroids[i].draw(this.ctx);
 		}
		
 		for (var i = 0; i < this.bullets.length; i++) {
 			this.bullets[i].draw(this.ctx);
 		}
	}

	Game.prototype.move = function() {
		this.ship.move();
		
		if (this.isOutOfBounds(this.ship)) {
			this.moveOutOfBoundsObject(null);
		}
		
		for (var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].move();
			
			if(this.isOutOfBounds(this.asteroids[i])) {
				this.moveOutOfBoundsObject(i);
			}
		}
		
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].move();
			
			if (this.isOutOfBounds(this.bullets[i])) {
				this.removeBullet(this.bullets[i]);
			}
		}
	}
	
	Game.prototype.moveOutOfBoundsObject = function(index) {
		if (index == null) {
			var pos = this.mirrorPosition(this.ship.pos);
			
			this.ship.pos = pos;
		}
		else {
			var pos = this.mirrorPosition(this.asteroids[index].pos);
			var vel = this.asteroids[index].vel;
		
			this.removeAsteroid(this.asteroids[index]);
			asteroids.push(new Asteroids.Asteroid(pos, vel));
		}
	}
	
	Game.prototype.mirrorPosition = function(pos) {
		if (pos[0] > 600) {
			return [0, pos[1]];
		}
		else if (pos[0] < 0) {
			return [600, pos[1]];
		}
		else if (pos[1] > 400) {
			return [pos[0], 0];
		}
		else {
			return [pos[0], 400];
		}
	}

	Game.prototype.checkCollisions = function() {
		for (var i = 0; i < this.asteroids.length; i++) {
			if (this.ship.isCollidedWith(this.asteroids[i])) {
				window.alert("You Lose!");
				this.stop();
			}
		}
	}

	Game.prototype.fireBullet = function() {
		var bullet = this.ship.fireBullet(this);
		if (bullet) {
			this.bullets.push(bullet);
		}
	}

	Game.prototype.removeAsteroid = function(asteroid) {
		index = this.asteroids.indexOf(asteroid);
		this.asteroids.splice(index, 1);
	}

	Game.prototype.removeBullet = function(bullet) {
		index = this.bullets.indexOf(bullet);
		this.bullets.splice(index, 1);
	}

	Game.prototype.stop = function() {
		window.clearInterval(this.intervalId);
	}

	Game.prototype.step = function() {
		this.move();
		this.draw();
		this.checkCollisions();
	}
	
	Game.prototype.isOutOfBounds = function(obj) {
		if(obj.pos[0] < 0 || obj.pos[1] < 0 || obj.pos[0] > 600 || obj.pos[1] > 400) {
			return true;
		} else {
			return false;
		}
	}

	Game.prototype.start = function() {
		var that = this;

		key('up', function(event, handler) {
			that.ship.power([0,-1]);
		});
		key('down', function(event, handler) {
			that.ship.power([0,1]);
		});
		key('left', function(event, handler) {
			that.ship.power([-1,0]);
		});
		key('right', function(event, handler) {
			that.ship.power([1,0]);
		});
		key('space', function(event, handler) {
			that.fireBullet();
		});

		this.intervalId = window.setInterval(function() {that.step()}, Game.FPS());
	}
})();


