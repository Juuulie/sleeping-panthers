/**
 * game.js
**/

define(['Collider', 'IM', 'IIG', 'player', 'canvas', 'input', 'projectiles', 'stage', 'panthers', 'sound', 'squirrel', 'extras', 'waterLevel','score'], 
	function(Collider, IM, IIG, player, canvas, input, projectiles, stage, panthers, sound, squirrel, extras, waterLevel, score) {

	function Game() {
		
		this.scene = "menu";
		this.Collider;

		this.init = function() {

			this.Collider = new Collider;

			panthers.init();
			stage.init(this.Collider);
			player.init(this.Collider);
			squirrel.init();
			waterLevel.init();
			score.init();
			
		};

		this.update = function() {
			IM.update();
			panthers.update();
			stage.updateBehavior(player.direction + Math.PI, player.speed * .2);
			stage.update();
			player.update();
			projectiles.update();

			squirrel.update();
			extras.update();
			

			// ----- collision between projectile and squirrel -----
			var s;
			for (var i = 0, c = squirrel.squirrelList.length; i < c; i++) {
				s = squirrel.squirrelList[i];
				var p = projectiles.checkCollisionWith(s);
				if(p !== false){
					// -- Sound --
					//sound.explosion.stop();
					//sound.explosion.play();
   					s.life--;
   					projectiles.remove(p);
   					// Si l'écureuil n'a plus de ballons
   					if(!s.life){
	   					// -- Random Extras : Bonus / Malus --
	   					var random_extras =  Math.round(Math.random()*100)/100;

	   					if(random_extras >= 0.75 && random_extras < 0.88){
	   						extras.addBonus(s.x, s.y);
	   					}else if(random_extras >= 0.88 && random_extras <= 1){
	   						extras.addMalus(s.x, s.y);
	   					}else{
	   						console.log('nothing appends');
	   						extras.addBonus(s.x, s.y); // to delete
	   					}

	   					// -- remove projectile and init squirrel position --
						squirrel.initPosition(s);
						score.addPoint();
						
						c--;
					}

				}



			};


			// ----- collision between player and extras -----
				
				extras.checkCollisionWith(player);
			
		};
		this.reset = function(){
			player.destroy();
			squirrel.destroy();
			extras.destroy();
			panthers.destroy();
			waterLevel.destroy();

		}

		this.render = function() {
			canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
			stage.render();
			panthers.render();
			player.render();
			projectiles.render();
			squirrel.render();
			extras.render();
			waterLevel.render();
			score.render();
		};
	}
	return new Game();
});