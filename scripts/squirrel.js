/**
 * squirrel.js
**/

define(['canvas','config','IM'], function(canvas, config, IM) {

	function Squirrel() {
		this.height = 30;
		this.width = 40;
		this.x = 10;
		this.y = 0;
		this.direction = 1;
		this.speed = 2;

		// this.img = IM.getInstance('assets/images/sprites/sprite_bucky_ballon');
		// this.width = this.img.width;
		// this.height = this.img.height;
	}

	function SquirrelManager() {
		this.squirrelList = [];

		this.init = function(){
			var i = config.squirrels_number;
			while(i-- > 0){
				this.add();
			}
		};

		this.add = function() {
			var squirrel = new Squirrel({});
			this.initPosition(squirrel);

			this.squirrelList.push(squirrel);
		};

		this.initPosition = function(squirrel){

			squirrel.x = rand(0, canvas.canvas.width-squirrel.width);
			squirrel.y = - squirrel.height;

		};

		this.update = function(){

			var e;
			for (var i = 0, c = this.squirrelList.length; i < c; i++) {
				e = this.squirrelList[i];
				
				e.y += e.direction * e.speed;
			}

		};
		this.render = function(){

			var e;
			for (var i = 0, c = this.squirrelList.length; i < c; i++) {
				e = this.squirrelList[i];
				canvas.ctx.fillStyle = 'orange';
				
				canvas.ctx.fillRect(e.x, e.y, e.width, e.height);
				canvas.ctx.save();
				canvas.ctx.translate(e.x, e.y);
				//canvas.ctx.drawImage(e.img.data, this.width, this.height);
				canvas.ctx.restore();

			}

		};
	}
	return new SquirrelManager();
});