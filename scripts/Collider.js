define([], function() {
	
	// Model
	var Body = function(o) {
		if ('object' !== typeof o)
			throw new Error('`o` must be an object');

		this.position = {
			x : o.x,
			y : o.y
		};
		this.width = o.width;
		this.height = o.height;
	};

	// Collider class
	var Collider = function() {
		this._bodies = [];
		this.area = {};
	};

	// Method addBody()
	Collider.prototype.addBody = function(x, y, width, height) {
		var body = new Body({
			x : x,
			y : y,
			width : width,
			height : height
		});

		this._bodies.push(body);

		return body;
	};

	Collider.prototype.defineArea = function(x, y, width, height) {
		this.area.x = x;
		this.area.y = y;
		this.area.width = width;
		this.area.height = height;
	};

	Collider.prototype.debugBodies = function(ctx) {
		var b
		for (var i = 0, c = this._bodies.length; i < c; i++) {
			b = this._bodies[i];

			ctx.strokeStyle = 'orange';
			ctx.strokeRect(b.position.x, b.position.y, b.width, b.height);
		}
	};

	// Method isCollide()
	Collider.prototype.isCollide = function(body) {
		var b;
		for (var i = 0, c = this._bodies.length; i < c; i++) {
			b = this._bodies[i];

			if (this.collide(body, b)) {
				return b;
			}
		}
		return false;
	};

	// Method collide()
	Collider.prototype.collide = function(a, b) {
		if (a === undefined || b === undefined)
			return false;

		if(typeof a.width === "undefined" || typeof a.height === "undefined" || typeof b.width === "undefined" || typeof b.height === "undefined")
			return false;

		return !(b.position.x >= a.position.x + a.width // Trop à droite
				|| b.position.x + b.width <= a.position.x // Trop à gauche
				|| b.position.y >= a.position.y + a.height // Trop en bas
				|| b.position.y + b.height <= a.position.y) // Trop en haut
	};

	return Collider;

})