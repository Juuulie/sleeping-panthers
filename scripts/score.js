/**
 * score.js
**/

define(['canvas','IM'], function(canvas, IM) {

	function Score(){
		
		this.init = function(){
			this.score = 0;
		};

		this.update = function(){
		};
		this.addPoint = function(){
			this.score += 1;
		};
		
		this.render = function(){
			canvas.ctx.fillStyle = "rgb(255,255,255)";
			canvas.ctx.font="30px Georgia";
			canvas.ctx.fillText(this.score,1105,200);
		};

	}
	
	return new Score();
});