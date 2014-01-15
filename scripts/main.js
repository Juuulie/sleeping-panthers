/**
 * main.js
**/

require.config({
	paths : {
		'IIG' : '../lib/IIG',
		'buzz' : '../lib/buzz'
	},
	shim : {
		'IIG' : {
			'exports' : 'IIG',
			'deps' : []
		},
		'buzz' : {
			'exports' : 'buzz',
			'deps' : []
		}
	}
});

require(['game', 'IM', 'config', 'input'], function(game, ImagesManager, config, input) {

	// ImagesManager.add('assets/images/ship.png');
	// ImagesManager.add('assets/images/shot.png');
	// ImagesManager.add('assets/images/explosion.png');
	ImagesManager.add('assets/images/sprites/sprite_bucky_ballon.png');

	// A mettre dans le ImagesManager, quand des images seront disponibles
	game.init();
	requestAnimFrame(GameLoop);

	ImagesManager.loadAll(function() {

		// Initialisation du jeu
			

		// Premier appel pour entrer dans la boucle de jeu infinie
		
	});

	// Boucle de jeu
	function GameLoop( t ) {
		config.TIMING = t;
		//console.log(t);
		input.updateGamepadsButtons();
		// Event lancement jeu
		if((game.scene == 'menu' || game.scene == 'pause') && input.gamepad.connected && input.gamepad.O){
			game.scene = 'game';
			document.getElementById('home').style.visibility = 'hidden';
			document.getElementById('regles').style.visibility = "hidden";
		};

		// Event affichage règle
		if((game.scene == 'menu' || game.scene == 'pause') && input.gamepad.connected && input.gamepad.U){
			game.scene = 'regles';
			document.getElementById('home').style.visibility = "hidden";
			document.getElementById('pauseMenu').style.visibility = "hidden";
			document.getElementById('regles').style.visibility = "visible";
		};

		if(game.scene == 'game' && input.gamepad.connected && input.gamepad.strt){
			game.scene = 'pause';
			document.getElementById('home').style.visibility = "hidden";
			document.getElementById('pauseMenu').style.visibility = "visible";
		};

		if(game.scene == 'game'){
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

function rand(min, max) {
	return Math.random() * (max - min) + min;
}
function randi(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}


function collide(a, b){
	//console.log(b.x);

	// if (b.x >= a.x + a.width) { console.log('trop a droite'); }
	// if (b.x + b.width <= a.x) { console.log('trop a gauche'); }
	// // if (b.y >= a.y + a.height) { console.log('trop en bas'); }
	// if (b.y + b.height <= a.y ) { console.log('trop en haut'); }
	return !(b.x > a.x + a.width 			// trop à droite
				|| b.x + b.width < a.x 	// trop à gauche
				|| b.y > a.y + a.height 	// trop en bas
				|| b.y + b.height < a.y ) 	// trop en haut
}