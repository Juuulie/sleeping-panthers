/**
 * player.js
**/

define(['CharacterController', 'canvas', 'stage', 'input', 'IM', 'IIG', 'projectiles', 'config', 'water', 'extras', 'sound', 'stage', 'waterLevel'], 
	function(CharacterController, canvas, stage, input, IM, IIG, projectiles, config, water, extras, sound, stage, waterLevel) {
	function Player() {
		this.currentStage =  '';
		this.gameStarted = 0;
		this.lastShotTime = 0;
		this.onSpit = false;
		this.canSpit = true;
		this.waterMax = 50;
		this.water;
		this.lessWater = 5;
		this.speed = 6;
		// console.log(IM.getInstance('assets/images/sprites/sprite_marche'));

		this.velY = 0;
		this.onJump =  false;
		this.jumpCount = 10;
		this._gravity = .05;
		this._gravityVel = 1;
		

		this.init = function( Collider ) {
			this.water = 50;
			this.gameStarted = config.TIMING;
			this.currentStage = 'platform';
			// Définition des images des sprites
			this.sprites = {};
			// Marche
			this.sprites.walk = IM.getInstance('assets/images/sprites/sprite_marche');
			this.sprites.walk.animation = new IIG.Animation({
				sWidth : this.sprites.walk.width/4,
				sHeight : 125,
				sx : 0,
				sy : 0,
				iterations : 'infinite',
				animByFrame : 8
			});

			// Crache
			this.sprites.spit = IM.getInstance('assets/images/sprites/sprite_crache_kuzco');
			this.sprites.spit.animation = new IIG.Animation({
				sWidth : this.sprites.spit.width/2,
				sHeight : 125,
				sx : 0,
				sy : 0,
				iterations : 'infinite',
				animByFrame : 8
			});

			this.img = this.sprites.walk;

			this.Controller = new CharacterController({
				x : (canvas.canvas.width*.5) - (this.img.width/8),
				y : (canvas.canvas.height - this.img.height - 115),
				width : this.img.width/4,
				height : this.img.height/2,
				velocityX : 0,
				velocityY : 0,
				speedMove : this.speed,
				gravity : .6,
				Collider : Collider
			});

			//stage.waterLevel(this.waterMax, this.water, this.lessWater);

		}; 

		this.update = function() {

			this.Controller.update();
			this.Controller.bindKey('right', (input.gamepad.right || input.keyboard.right));
			this.Controller.bindKey('down', (input.gamepad.down || input.keyboard.down));
			this.Controller.bindKey('left', (input.gamepad.left || input.keyboard.left));
			this.Controller.bindKey('jump', (input.gamepad.O || input.keyboard.space));

			if(!this.canJump && config.TIMING - this.gameStarted > 200) this.canJump = true;

			this.characterAnimationController();
			
			if(input.gamepad.r1 && input.gamepad.joystickRight.axeY <= 0){
				this.fire();
			}else{
				this.canSpit = true;
			}
		};

		// Fonction réduction jauge d'eau
        this.useWater = function(){
            this.water -= this.lessWater;
			waterLevel.useWater(this.waterMax, this.water, this.lessWater);
        }

		// Fonction lancement projectiles
		this.fire = function(){
			// crachat kuku
			if(this.canSpit && this.water > 0){
				var spitSound = sound.getSound('spit');
				spitSound.sound.pause();
				spitSound.sound.currentTime = 0;
				spitSound.sound.play();
				this.canSpit = false;
				this.shipDirection();
				projectiles.add((this.Controller.position.x+this.Controller.width*.5), this.Controller.position.y , this.direction);
				this.useWater();
			}	
		}

	 	// Fonction direction tire
        this.shipDirection = function(){
        	this.onSpit = true;

            if(input.gamepad.joystickRight.axeX >= -1 && input.gamepad.joystickRight.axeX < -0.3){
            	this.sprites.spit.animation = new IIG.Animation({
					sWidth : this.sprites.spit.width/2,
					sHeight : 125,
					sx : 0,
					sy : 0,
					iterations : 'infinite',
					animByFrame : 8
				});
            	this.img = this.sprites.spit;
                this.direction = Math.atan2( -1, -1 ) || this.direction;
            }
            else if(input.gamepad.joystickRight.axeX >= -0.3 && input.gamepad.joystickRight.axeX <= 0.3){
            	this.sprites.spit.animation = new IIG.Animation({
					sWidth : this.sprites.spit.width/2,
					sHeight : 125,
					sx : 0,
					sy : 125,
					iterations : 'infinite',
					animByFrame : 8
				});
            	this.img = this.sprites.spit;
                this.direction = Math.atan2( -1, 0 ) || this.direction;
            }
            else if(input.gamepad.joystickRight.axeX > 0.3 && input.gamepad.joystickRight.axeX <= 1){
            	this.sprites.spit.animation = new IIG.Animation({
					sWidth : this.sprites.spit.width/2,
					sHeight : 125,
					sx : 0,
					sy : 250,
					iterations : 'infinite',
					animByFrame : 8
				});
            	this.img = this.sprites.spit;
                this.direction = Math.atan2( -1, 1 ) || this.direction;
            }

        }

		// Gère les contrôles d'animation du player
		this.characterAnimationController = function() {			

			if (input.gamepad.right || input.keyboard.right){
				this.onSpit = false;
				this.img = this.sprites.walk;
				this.img.animation.pauseAnimation = false;
				this.img.animation.sy = this.img.animation.sHeight;
			}
			if (input.gamepad.left || input.keyboard.left) {
				this.onSpit = false;
				this.img = this.sprites.walk;
				this.img.animation.pauseAnimation = false;
				this.img.animation.sy = 0;
			}

			if (!input.gamepad.right && !input.keyboard.right && !input.gamepad.left && !input.keyboard.left) {
				if(!this.onSpit){
					this.img.animation.pauseAnimation = true;
					this.img.animation.sx = 0;
				}
			}
			// Vecteur vitesse Y
			// console.log(this.Controller.velocity.y);
		}

		this.checkCollisionWith = function(obj){
		   var p = this;
		    
		   	if(collide(obj, p)){
		    	return p;
		   	}else{
		    	return false;
		   	}
		}
		this.destroy = function(){
			delete(this);
		}

		this.render = function() {
			//canvas.ctx.fillStyle = '#00F';

			IM.drawImage(canvas.ctx, this.img, this.Controller.position.x, this.Controller.position.y);

			// Debug
			canvas.ctx.restore();
			canvas.ctx.strokeStyle = 'lime';
			canvas.ctx.strokeRect(this.Controller.position.x, this.Controller.position.y, this.Controller.width, this.Controller.height);
		}
	}

	return new Player();
});