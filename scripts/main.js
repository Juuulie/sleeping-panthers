/**
 * main.js
**/

require.config({
	paths : {
		'IIG' : '../lib/IIG',
		
	},
	shim : {
		'IIG' : {
			'exports' : 'IIG',
			'deps' : []
		}
	}
});

require(['game', 'IM', 'config', 'input', 'sound'], function(game, ImagesManager, config, input, sound) {
	ImagesManager.add('assets/images/sprites/spit.png');
	ImagesManager.add('assets/images/sprites/sprite_panth_respire.png');
	ImagesManager.add('assets/images/sprites/sprite_panth_respire_2.png');
	ImagesManager.add('assets/images/sprites/sprite_panth_awake.png');
	ImagesManager.add('assets/images/sprites/sprite_bucky_ballon.png');
	ImagesManager.add('assets/images/sprites/sprite_bucky_ballon_malus.png');
	ImagesManager.add('assets/images/sprites/sprite_bucky_explosion.png');
	ImagesManager.add('assets/images/sprites/sprite_marche.png');
	ImagesManager.add('assets/images/sprites/sprite_crache_kuzco.png');
	ImagesManager.add('assets/images/sprites/kuzco_drink.png');
	ImagesManager.add('assets/images/platform/puit.png');
	ImagesManager.add('assets/images/platform/sol.png');
	ImagesManager.add('assets/images/platform/plateformeDebut.png');
	ImagesManager.add('assets/images/platform/plateforme1.png');
	ImagesManager.add('assets/images/platform/plateforme3.png');
	ImagesManager.add('assets/images/bg/bg_UI.png');
	ImagesManager.add('assets/images/sprites/spit.png');
	ImagesManager.add('assets/images/sidebar/water.png');
	ImagesManager.add('assets/images/sidebar/water-cadre.png');
	ImagesManager.add('assets/images/sidebar/count-dead.png');
	

	ImagesManager.add('assets/images/extras/malus/f-ecureuils.png');
	ImagesManager.add('assets/images/extras/malus/f-crachat.png');
	ImagesManager.add('assets/images/extras/malus/f-ballons.png');
	ImagesManager.add('assets/images/extras/malus/f-nuit.png');

	ImagesManager.add('assets/images/extras/bonus/b-infini.png');
	ImagesManager.add('assets/images/extras/bonus/b-mitraillette.png');
	ImagesManager.add('assets/images/extras/bonus/b-speed.png');
	

	// A mettre dans le ImagesManager, quand des images seront disponibles
	

	ImagesManager.loadAll(function() {

		// Initialisation du jeu
		requestAnimFrame(GameLoop);
		sound.init();
		var menu = sound.getSound('menu');
		//menu.sound.play();

		// Premier appel pour entrer dans la boucle de jeu infinie
		
	});

	// Boucle de jeu
	function GameLoop( t ) {
		config.TIMING = t;
		input.updateGamepadsButtons();


		if(game.scene == 'menu'){
			visibilityHidden(document.getElementsByClassName('nav'));
			document.getElementById('home').style.visibility = 'visible';	
		}
		if(game.scene == 'pause'){
			visibilityHidden(document.getElementsByClassName('nav'));					
			document.getElementById('pause').style.visibility = 'visible';			
		}
		if(game.scene == 'rules-home'){
			visibilityHidden(document.getElementsByClassName('nav'));	
			document.getElementById('home').style.visibility = 'visible';			
			document.getElementById('rules-home').style.visibility = 'visible';			
		}
		if(game.scene == 'rules'){
			visibilityHidden(document.getElementsByClassName('nav'));	
			document.getElementById('rules').style.visibility = 'visible';			
		}
		if(game.scene == 'gameover'){
			visibilityHidden(document.getElementsByClassName('nav'));					
			document.getElementById('gameover').style.visibility = 'visible';			
		}

		// -- Start game
		if((game.scene == 'menu' || game.scene == 'gameover') && input.gamepad.connected && input.gamepad.O){
			game.scene = 'game';
			game.init();
		}
		if((game.scene == 'pause') && input.gamepad.connected && input.gamepad.O){
			game.scene = 'game';
		}

		// -- show rules
		if(game.scene == 'menu' && input.gamepad.connected && input.gamepad.U){
			game.scene = 'rules-home';			
		}

		// -- show menu
		if(game.scene == 'rules-home' && input.gamepad.connected && input.gamepad.A){
			game.scene = 'menu';			
		}
		if(game.scene == 'pause' && input.gamepad.connected && input.gamepad.U){
			game.scene = 'rules';			
		}
		if(game.scene == 'pause' && input.gamepad.connected && input.gamepad.Y){
			game.reset();

			var theme = sound.getSound('theme');
			theme.sound.pause();
			theme.sound.currentTime = 0;
			var menu = sound.getSound('menu');
			menu.sound.play();

			game.scene = 'menu';
		}

		// pause
		if((game.scene == 'game' && input.gamepad.connected && input.gamepad.strt) 
			|| (game.scene == 'rules' && input.gamepad.connected && input.gamepad.A)){
			game.scene = 'pause';
		};

		if(game.scene == 'game'){
			visibilityHidden(document.getElementsByClassName('nav'));					
			
			var menu = sound.getSound('menu');
			menu.sound.pause();
			menu.sound.currentTime = 0;
			
			game.update();
			game.render();
		}

		requestAnimFrame(GameLoop);
	}
});

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

navigator.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;

function rand(min, max) {
	return Math.random() * (max - min) + min;
}

function randi(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function collide(a, b) {
	return !(b.x >= a.x + a.width // Trop à droite
				|| b.x + b.width <= a.x // Trop à gauche
				|| b.y >= a.y + a.height // Trop en bas
				|| b.y + b.height <= a.y) // Trop en haut
}

function distanceBetween(a,b){
	return Math.abs(b-a);
}

function visibilityHidden(t){
	for(var i = 0; i < t.length; i++) {
	    t[i].style.visibility = 'hidden';
	}	
}