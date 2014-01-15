/**
 * player.js
**/

define(['canvas', 'input', 'IM', 'projectiles', 'config', 'water', 'extras'], function(canvas, input, IM, projectiles, config, water, extras) {
	function Player() {
		this.x =200;
		this.y =0;
		this.lastShotTime = 0;
		this.width = 20;
		this.height = 20;
		this.speed = 5;
		this.gravityCount = 30;
		this.canSpit = true;
		this.water = 150;
		this.lessWater = 5;

		this.init = function() {
			
		}; 

		this.update = function() {

			if (input.gamepad.connected) {
				this.characterGamepadController();

				// crachat kuku
				if(input.gamepad.r1 && input.gamepad.joystickRight.axeY <= 0){
					if(this.canSpit && this.water > 0){
						this.canSpit = false;
						this.shipDirection();

						projectiles.add(this.x+this.width*0.5 , this.y , this.direction);
						this.useWater();
					}
				}else{
					this.canSpit = true;
				}
			}
			else {
				
			}
			this.gravity();

			// check collision
			//this.checkCollisionWith(water);
			//this.checkCollisionWith(extras);

			// Vérification et ajustement des coordonnées si le joueur est sorti de l'écran.
			if (this.x < 0) 								  	this.x = 0;
			if (this.y < 0) 								  	this.y = 0;
			if (this.x + this.width > canvas.canvas.width)  	this.x = canvas.canvas.width - this.width;
			if (this.y + this.height > canvas.canvas.height) 	this.y = canvas.canvas.height - this.height; //this.death();
		};


		// fonction gravity
		this.gravity = function(){
			this.y += this.gravityCount;
		}

		// Fonction de lancement des projectiles
		this.fire = function() {
			if (config.TIMING - this.lastShotTime > 150) {
				this.lastShotTime = config.TIMING;
			}
		};

		// Fonction réduction jauge d'eau
		this.useWater = function(){
			this.water -= this.lessWater;
		}

				
		this.checkCollisionWith = function(obj){

			var p = this;
				
			if(collide(obj, p)){
				return p;
			}else{
				return false;
			}
		}


		// Fonction de gestion du saut
		this.jump = function(){

		};


		// Fonction direction tire
		this.shipDirection = function(){
				
			if(input.gamepad.joystickRight.axeX >= -1 && input.gamepad.joystickRight.axeX < -0.3){
				this.direction = Math.atan2( -1, -1 ) || this.direction;
			}
			else if(input.gamepad.joystickRight.axeX >= -0.3 && input.gamepad.joystickRight.axeX <= 0.3){
				this.direction = Math.atan2( -1, 0 ) || this.direction;
			}
			else if(input.gamepad.joystickRight.axeX > 0.3 && input.gamepad.joystickRight.axeX <= 1){
				this.direction = Math.atan2( -1, 1 ) || this.direction;
			}

		}

		// Gère les contrôles utilisateur au clavier
		this.characterKeyboardController = function() {
			if (input.keyboard.left)
				this.x -= this.speed;

			if (input.keyboard.up)
				this.jump();

			if (input.keyboard.right)
				this.x += this.speed;
		}

		// Gère les contrôles utilisateur au gamepad
		this.characterGamepadController = function() {
			this.x += input.gamepad.joystickLeft.axeX * this.speed;
			this.y += input.gamepad.joystickLeft.axeY * this.speed;

			//this.direction = Math.atan2( input.gamepad.joystickRight.axeY, input.gamepad.joystickRight.axeX ) || this.direction;
		}

		this.render = function() {			
			canvas.ctx.fillStyle = 'orange';
			canvas.ctx.save();
			canvas.ctx.translate(this.x + this.width*.5, this.y + this.height*.5);
			canvas.ctx.fillRect(-this.width*.5, -this.height*.5, this.width, this.height);
			canvas.ctx.restore();
		}
	}
	
	return new Player();
});