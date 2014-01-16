/**
 * canvas.js
**/

define(['IM'], function(IM) {
	var canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = 1280;
	canvas.height = 720;
	// Force le canvas à s'adapter à l'écran
	canvas.style.position = 'absolute';
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.right = 0;
	canvas.style.bottom = 0;
	canvas.style.backgroundImage = "url('assets/images/bg/bg_entier.png')";
	canvas.style.backgroundRepeat = "no-repeat";
	

	// Ajout du canvas à la page
	window.document.body.appendChild( canvas );

	return {
		canvas : canvas,
		ctx : ctx
	};
});