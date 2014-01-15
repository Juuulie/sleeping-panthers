/**
 * extras.js
**/

define(['canvas', 'IM'], function(canvas, IM) {

	function Extra( params ) {
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.direction = params.direction || 0;
		this.speed = 25;
		this.width = 10;
		this.height = 10;
		//this.img = IM.getInstance('assets/images/shot');
		// this.width = this.img.width;
		// this.height = this.img.height;		
	}
	function Bonus( params ) {
		this.extra = 'bonus';	
		this.eType = params.eType || 0;			
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.direction = 1;
		this.speed = 5;
		this.width = 10;
		this.height = 10;
		//this.img = IM.getInstance('assets/images/shot');
		// this.width = this.img.width;
		// this.height = this.img.height;		
	}
	function Malus( params ) {
		this.extra = 'malus';
		this.eType = params.eType || 0;
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.direction = 1;
		this.speed = 5;
		this.width = 10;
		this.height = 10;
		//this.img = IM.getInstance('assets/images/shot');
		// this.width = this.img.width;
		// this.height = this.img.height;		
	}
	
	function ExtrasManager() {
		this.extrasList = [];

		this.bonusList = [];
		this.malusList = [];


		this.addBonus = function(x, y){
			var eType = randi(1,2);

			var bonus = new Bonus({
				x : x, 
				y : y,
				eType : eType,
			});

			this.extrasList.push(bonus);
			this.bonusList.push(bonus);
		};
		this.addMalus = function(x, y){
			var eType = randi(1,5);

			var malus = new Malus({
				x : x, 
				y : y,
				eType : eType,
			});

			this.extrasList.push(malus);
			this.malusList.push(malus);


		};


		this.update = function(){
			var e;
			for (var i = 0, c = this.extrasList.length; i < c; i++) {
				e = this.extrasList[i];
				
				if(e.y+e.height < canvas.canvas.height){
					e.y += e.direction * e.speed;
				}else if(e.y+e.height >= canvas.canvas.height){
					e.y = e.y;
				}
			}			
		};

		// check collision with platform
		this.checkCollisionWith = function(obj) {
			// En prenant en compte le fait que obj est un objet contenant au moins les propriétés
			// x, y, width, height
			var p;
			for (var i = 0, c = this.extrasList.length; i < c; i++) {
				p = this.extrasList[i];

				// Si on détecte une collision avec un extra, on
				// renvoie ce extra ...
				if (collide(obj, p))
					return p;
			}
			// ... sinon, on renvoie false
			return false;
		};

		this.render = function() {
			
			var e;
			
			for (var i = 0, c = this.extrasList.length; i < c; i++) {
				e = this.extrasList[i];

				if(e.extra == 'malus')
					canvas.ctx.fillStyle = 'red';
				if(e.extra == 'bonus')
					canvas.ctx.fillStyle = 'white';
				// break;
				canvas.ctx.fillRect(e.x, e.y, e.width, e.height);
				canvas.ctx.save();
				canvas.ctx.translate(e.x, e.y);
				//canvas.ctx.drawImage(p.img.data, 0, 0);
				canvas.ctx.restore();
			}
		};

		this.remove = function(obj) {
			var p;
			for (var i = 0, c = this.extrasList.length; i < c; i++) {
				p = this.extrasList[i];

				if (p === obj) {
					this.extrasList.splice(i, 1);
					break;
				}
			}
		};
	}

	return new ExtrasManager();

});
