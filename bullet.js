(function() {

	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Bullet = Asteroids.Bullet = function(game, pos, dir) {
		this.game = game;
		var vel = [dir[0] * Bullet.SPEED(), dir[1] * Bullet.SPEED()];
		Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS(), Bullet.COLOR());
	}

	Bullet.inherits(Asteroids.MovingObject);

	Bullet.SPEED = function() {
		return 30;
	}

	Bullet.COLOR = function() {
		return "white";
	}

	Bullet.RADIUS = function() {
		return 3;
	}

	Bullet.prototype.hitAsteroids = function() {
		for(var i = 0; i < this.game.asteroids.length; i++) {
			if (this.isCollidedWith(this.game.asteroids[i])) {
				this.game.removeAsteroid(this.game.asteroids[i]);
			}
		}
		return null;
	}
	
	Bullet.prototype.move = function() {
		var newX = this.pos[0] + this.vel[0];
		var newY = this.pos[1] + this.vel[1];

		this.pos = [newX, newY];
		this.hitAsteroids();
	}
})();