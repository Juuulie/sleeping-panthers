/**
 * game.js
**/

define(['IM', 'IIG', 'player', 'canvas', 'input', 'projectiles', 'stage', 'enemy'], function(IM, IIG, player, canvas, input, projectiles, stage, enemy) {
	function Game() {
		
		this.scene = "menu";

		this.init = function() {
			// sound.theme.play();
			player.init();
			//enemy.init();
			stage.init();

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
			enemy.updateTarget( player.x, player.y );
			enemy.update();
			projectiles.update();
			
		};

		this.render = function() {
			canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			stage.render();
			player.render();
			enemy.render();
			projectiles.render();

			//IM.drawImage(canvas.ctx, this.test, 0, 0);
		};
	}
	return new Game();
});