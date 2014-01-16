/**
 * enemy.js
**/

define(['config', 'IM', 'canvas', 'IIG'], function(config, IM, canvas, IIG) {
	
	function Panthers( params ) {
		this.img = IM.getInstance(params.img);
		this.width = params.width;
		this.height = params.height;
		this.x = params.x;
		this.y = params.y - this.img.height - 5;
		this.img.animation = new IIG.Animation({
			sWidth : this.width,
			sHeight : this.height,
			sx : 0,
			sy : 0,
			animByFrame : 7
		});

	};

	function PanthersManager() {

		this.panthersList = [];
		

		this.init = function() {
			this.panthersList.push(new Panthers({
				width : 220,
				height : 84,
				x : 200,
				y : 720,
				img : 'assets/images/sprites/sprite_panth_respire'
			}));

			this.panthersList.push(new Panthers({
				width : 220,
				height : 81,
				x : 500,
				y : 720,
				img : 'assets/images/sprites/sprite_panth_respire_2'
			}));

			// this.panthersList.push(new Panthers({
			// 	width : 220,
			// 	height : 81,
			// 	x : 700,
			// 	y : 720,
			// 	img : 'assets/images/sprites/sprite_panth_awake'
			// }));
		};

		this.update = function() {
			
		};

		this.destroy = function(){
			for (var i = 0; i < this.panthersList.length; i++) {
				this.panthersList.splice(i,1);
				//delete(this.panthersList[i]);
			};
		}

		this.render = function() {
			var p;
			for (var i = this.panthersList.length - 1; i >= 0; i--) {
				p = this.panthersList[i];
				// canvas.ctx, this.img, this.Controller.position.x, this.Controller.position.y
				IM.drawImage(canvas.ctx, p.img, p.x, p.y);
			};
			
		};

	};

	return new PanthersManager();

});