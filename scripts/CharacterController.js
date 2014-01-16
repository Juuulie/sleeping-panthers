define([], function() {
	
	// CharacterController class
	var CharacterController = function(o) {
		if ('object' !== typeof o)	throw new Error('`CharacterController` : invalid parameter');
		if (!o.hasOwnProperty('x'))			throw new Error('`x` must be defined');
		if (!o.hasOwnProperty('y'))			throw new Error('`y` must be defined');
		if (!o.hasOwnProperty('width'))		throw new Error('`width` must be defined');
		if (!o.hasOwnProperty('height'))	throw new Error('`height` must be defined');
		if (!o.hasOwnProperty('velocityX'))	throw new Error('`velocityX` must be defined');
		if (!o.hasOwnProperty('velocityY'))	throw new Error('`velocityY` must be defined');
		if (!o.hasOwnProperty('speedMove'))	throw new Error('`speedMove` must be defined');
		if (!o.hasOwnProperty('gravity'))	throw new Error('`gravity` must be defined');

		this.position = {};
		this.velocity = {};

		this.position.x = o.x;
		this.position.y = o.y;
		this.width = o.width;
		this.height = o.height;
		this.velocity.x = o.velocityX;
		this.velocity.y = o.velocityY;
		this.speedMove = o.speedMove;
		this.gravity = o.gravity;
		this.canJump = true;

		// Collider
		this.Collider = o.Collider || false;

		// Keys
		this._keys = {
			up : undefined,
			right : undefined,
			down : undefined,
			left : undefined,
			jump : undefined
		};
	};

	// Method update()
	CharacterController.prototype.update = function(body) {
		// Mouvement vertical (gravité)
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;

		// Mouvement horizontal
		this.position.x += this.velocity.x;

		// Update des contrôles de déplacement et des collisions
		this._checkControls();
		this._checkCollisions();
		this._checkJump();
	};

	CharacterController.prototype._checkControls = function() {
		this.velocity.x = 0;
		if ( this._keys.left && this.position.x > this.Collider.area.x)
			this.velocity.x = -this.speedMove;
		else if ( this._keys.right && this.position.x + this.width < this.Collider.area.width)
			this.velocity.x = this.speedMove;
	};
	CharacterController.prototype._checkCollisions = function() {
		if (!this.Collider)
			return false;

		var body = this.Collider.isCollide(this);
		if (body) {
			// Si le vecteur vitesse est orienté vers le BAS,
			// alors on reset la position du joueur au dessus de la plateforme.
			if (this.velocity.y >= this.gravity && this.position.y + this.height - this.velocity.y <= body.position.y) {
				this.canJump = true;
				this.velocity.y = 0;
				this.position.y = body.position.y - this.height;
			}
			// Si le vecteur vitesse est orienté vers le HAUT,
			// alors on reset la position du joueur en dessous de la plateforme (et on empêche le saut car il doit retomber prématurément)
			if (this.velocity.y <= -this.gravity && this.position.y - this.velocity.y >= body.position.y + body.height) {
				this.canJump = false;
				this.velocity.y = 0;
				this.position.y = body.position.y + body.height;
			}
			
			// HORIZONTAL
			if ((this.position.y > body.position.y && this.position.y < body.position.y + body.height) ||
				 (this.position.y + this.height > body.position.y && this.position.y + this.height < body.position.y + body.height) ||
				 (this.position.y < body.position.y && this.position.y + this.height > body.position.y + body.height)) {
				
				if (this.velocity.x === this.speedMove) { // Collision à gauche de la plateforme (joueur se déplace à droite)
					this.velocity.x = 0;
				}
				else if (this.velocity.x === -this.speedMove) { // Collision à droite de la plateforme (joueur se déplace à gauche)
					this.velocity.x = 0;
				}
				
				// Repositionnement
				var playerMiddle = this.position.x + this.width * .5;
				var bodyMiddle = body.position.x + body.width * .5;
				var distance = bodyMiddle - playerMiddle;

				if (Math.abs(distance) < Math.abs(this.width * -5 + body.width * -5) ) {
					if (distance > 0)
						this.position.x = body.position.x - this.width;
					else
						this.position.x = body.position.x + body.width;
				}
			}
		}

		// S'il y a collision avec le sol (bas du canvas)
		if (this.position.y + this.height > this.Collider.area.height) {
			this.canJump = true;
			this.velocity.y = 0;
			this.position.y = this.Collider.area.height - this.height;
		}
	};
	CharacterController.prototype._checkJump = function() {
		// Déjà, pas le droit de sauter si le vecteur vitesse est orienté vers le bas
		// (Permet d'éviter que le joueur ne saute lorsqu'il tombe d'une plateforme)
		if (this.velocity.y > this.gravity)
			this.canJump = false;

		if ( this._keys.jump && this.canJump) {
			this.canJump = false;
			this.velocity.y = -20;
		}
	};

	CharacterController.prototype.bindKey = function(name, value) {
		if (!this._keys.hasOwnProperty(name))
			throw new Error('`'+name+'` isn\'t a valid key');

		if (undefined === value)
			throw new Error('A value must be specified for key `'+name+'`');

		this._keys[name] = value;
	};

	return CharacterController;

})