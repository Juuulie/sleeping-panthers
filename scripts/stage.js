/**
 * stage.js
**/

define(['canvas', 'water'], function(canvas, water) {
	
	function Stage() {
		

		this.init = function() {
			water.init();
		};

		this.update = function() {
		};

		this.updateBehavior = function() {
			
		};

		this.render = function() {
			water.render();
		};
	}

	return new Stage();

});