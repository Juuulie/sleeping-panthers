/**
 * water.js
**/

define(['canvas'], function(canvas) {

	function Water() {
		this.height = 30;
		this.width = 40;
		this.x = 200;
		this.y = canvas.canvas.height-this.height-10;

		//this.img = IM.getInstance('assets/images/water');
		//this.width = this.img.width;
		//this.height = this.img.height;


		this.init = function(){

		};

		this.update = function(){

		};
		
		this.render = function(){
			canvas.ctx.fillStyle = 'blue';
			
			canvas.ctx.fillRect(this.x, this.y, this.width, this.height);

		};
	}
	return new Water();
});