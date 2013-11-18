(function() {

	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Asteroid = Asteroids.Asteroid = function(pos, vel) {
		Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS(), Asteroid.COLOR());
	}

	Asteroid.inherits(Asteroids.MovingObject);

	Asteroid.COLOR = function() {
		return "black";
	}

	Asteroid.RADIUS = function() {
		return 25;
	}

	Asteroid.randomAsteroid = function(dimX, dimY) {
		var xCoord = dimX * Math.random();
		var yCoord = dimY * Math.random();
		var bufferX = dimX * .2;
		var bufferY = dimY * .2;

		while ((xCoord > bufferX && xCoord < (dimX - bufferX)) &&
					(yCoord > bufferY && yCoord < (dimY - bufferY))) {
			xCoord = dimX * Math.random();
			yCoord = dimY * Math.random();
		}

		var pos = [xCoord, yCoord];
		var vel = Asteroid.randomVec();

		return new Asteroid(pos, vel);
	}

	Asteroid.randomVec = function() {
		var speed = 4;
		var x = Math.floor((Math.random() * speed) + 1);
		var y = Math.floor(Math.sqrt(Math.pow(speed, 2) - Math.pow(x, 2)));
		if (Math.floor(Math.random() * 2)) {
			x *= -1;
		}
		if (Math.floor(Math.random() * 2)) {
			y *= -1;
		}
		return [x, y];
	}
})();
