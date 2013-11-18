(function() {

	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
	}

	MovingObject.prototype.move = function() {
		var newX = this.pos[0] + this.vel[0];
		var newY = this.pos[1] + this.vel[1];

		this.pos = [newX, newY];
	}

	MovingObject.prototype.draw = function (ctx) {
		ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
	}

	MovingObject.prototype.isCollidedWith = function(otherObject) {
		var deltaX = Math.abs(otherObject.pos[0] - this.pos[0]);
		var deltaY = Math.abs(otherObject.pos[1] - this.pos[1]);
		var distance = Math.floor(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
		return (distance < (this.radius + otherObject.radius));
	}
})();