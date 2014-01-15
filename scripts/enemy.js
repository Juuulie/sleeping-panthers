/**
 * enemy.js
**/

define(['config', 'IM', 'canvas'], function(config, IM, canvas) {
	
	function Enemy( params ) {
		//this.image = IM.getInstance('assets/images/enemy');
		// this.width = this.image.width;
		// this.height = this.image.height;

		this.x = params.x || 0;
		this.y = params.y || 0;
		this.direction = params.direction || 0;
		this.speed = 1;
		this.width = 15;
		this.height = 15;
	};

	function EnemyManager() {

		this.enemiesList = [];
		this.mainTarget = {x:0,y:0};		

		this.init = function() {
			var i = config.enemies_number;
			while(i-- > 0){
				this.add();
			}
			
		};

		this.add = function() {
			var enemy = new Enemy({});
			this.initPosition(enemy);

			this.enemiesList.push(enemy);	
			console.log('add');		
		};

		this.initPosition = function(enemy) {
			enemy.x = rand(0, canvas.canvas.width);
			enemy.y = - this.height;
		};

		this.updateTarget = function(x, y) {
			this.mainTarget.x = x;
			this.mainTarget.y = y;			
		};

		this.update = function() {
			var e, angle;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];

				e.direction = Math.atan2(this.mainTarget.y - e.y, this.mainTarget.x - e.x );

				e.x += Math.cos(e.direction) * e.speed;
				e.y += Math.sin(e.direction) * e.speed;	
			}
			
		};

		this.render = function() {
			// Parcours du tableau de ennemies
			var e;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];

				canvas.ctx.fillStyle = 'red';
				canvas.ctx.fillRect(this.x, this.y, this.width, this.height);

				// canvas.ctx.save();
				// canvas.ctx.translate(e.x + e.width*.5 , e.y + e.height*.5);
				// canvas.ctx.rotate(e.direction);
				// canvas.ctx.drawImage(e.image.data, -e.width*.5, -e.height*.5);
				// canvas.ctx.restore();
			}
			
		};

		this.remove = function(obj) {
			
		};

	};

	return new EnemyManager();

});