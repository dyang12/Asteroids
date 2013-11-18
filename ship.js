(function() {

	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Ship = Asteroids.Ship = function() {
		Asteroids.MovingObject.call(this, [300, 200], [0, 0], Ship.RADIUS(), Ship.COLOR());
	}

	Ship.inherits(Asteroids.MovingObject);

	Ship.RADIUS = function() {
		return 10;
	}

	Ship.COLOR = function() {
		return "green";
	}

	Ship.prototype.power = function(impulse) {
		var x = this.vel[0] + impulse[0];
		var y = this.vel[1] + impulse[1];
		this.vel = [x, y];
	}

	Ship.prototype.fireBullet = function(game) {
		var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
		if (speed === 0) {
			return null;
		} else {
			var dir = [this.vel[0] / speed, this.vel[1] / speed];
			var pos = this.pos;
			return new Asteroids.Bullet(game, pos, dir);
		}
	}
})();