/**
 * squirrel.js
**/

define(['canvas','config','IM'], function(canvas, config, IM) {

	function Squirrel( params ) {
		this.width = params.img.width/16;
		this.height = params.img.height;
		this.x = 10;
		this.y = 0;
		this.direction = 1;
		this.speed = 3;
		this.img = params.img;
		this.img.animation = new IIG.Animation({
			sWidth : this.width,
			sHeight : 200,
			sx : 0,
			sy : 0,
			iterations : 'infinite',
			alternate  : true,
			animByFrame : 5
		});

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
			var squirrel = new Squirrel({img : IM.getInstance('assets/images/sprites/sprite_bucky_ballon')});
			this.initPosition(squirrel);

			this.squirrelList.push(squirrel);
		};

		this.initPosition = function(squirrel){

			squirrel.x = rand(0, canvas.canvas.width-squirrel.width-310);
			squirrel.y = - squirrel.height;

		};

		this.update = function(){

			var e;
			for (var i = 0, c = this.squirrelList.length; i < c; i++) {
				e = this.squirrelList[i];
				
				e.y += e.direction * e.speed;
			}

		};
		this.destroy = function(){
			for (var i = 0; i < this.squirrelList.length; i++) {
				this.squirrelList.splice(i,1);
				//delete(this.squirrelList[i]);
			};
		}

		this.render = function(){

			var e;
			for (var i = 0, c = this.squirrelList.length; i < c; i++) {
				e = this.squirrelList[i];
				//canvas.ctx.strokeStyle = 'lime';
				canvas.ctx.strokeRect(e.x, e.y, e.width, e.height);
				IM.drawImage(canvas.ctx, e.img, e.x, e.y);
			}

		};
	}
	return new SquirrelManager();
});