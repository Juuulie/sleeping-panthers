/**
 * stage.js
**/

define(['canvas', 'water'], function(canvas, water) {
	
	function Stage() {
		

		this.init = function() {
			water.init();
		};

		this.update = function() {
			water.update();
		};

		this.updateBehavior = function() {
			
		};

		this.render = function() {
			water.render();
		};
	}

	return new Stage();

});