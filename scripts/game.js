/**
 * game.js
**/

define(['IM', 'IIG', 'player', 'canvas', 'input', 'projectiles', 'stage', 'squirrel', 'extras'], function(IM, IIG, player, canvas, input, projectiles, stage, squirrel, extras) {
	function Game() {
		
		this.scene = "menu";

		this.init = function() {
			// sound.theme.play();
			player.init();
			stage.init();

			squirrel.init();


			//this.test = IM.getInstance('assets/images/explosion');
			// this.test.animation = new IIG.Animation({
			// 	sWidth : 256,
			// 	sHeight : 256,
			// 	sy : 0,
			// 	iterations : 1,
			// 	animByFrame : 1
			// });
		};

		this.update = function() {
			IM.update();
			
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
					projectiles.remove(p);
					squirrel.initPosition(s);

					c--;
				}



			};


			// ----- collision between player and extras -----
			var e;

			for (var i = 0; i < extras.extrasList.length; i++) {
				e = extras.extrasList[i]

				var p = player.checkCollisionWith(e);
				if(p !== false){
					// -- Sound --
					//sound.explosion.stop();
					//sound.explosion.play();

					extras.remove(e);
				}

			};
			
		};

		this.render = function() {
			canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			stage.render();
			player.render();
			projectiles.render();

			squirrel.render();
			extras.render();
			//IM.drawImage(canvas.ctx, this.test, 0, 0);
		};
	}
	return new Game();
});