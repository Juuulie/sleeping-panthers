/**
 * extras.js
**/

define(['canvas', 'config', 'IM'], function(canvas, config, IM) {

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

		this.addBonus = function(x, y){
			var eType = randi(1,2);

			var bonus = new Bonus({
				x : x, 
				y : y,
				eType : eType,
			});

			this.extrasList.push(bonus);
		};
		this.addMalus = function(x, y){
			var eType = randi(1,5);

			var malus = new Malus({
				x : x, 
				y : y,
				eType : eType,
			});

			this.extrasList.push(malus);

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
				// if (collidePlatf(obj, p) == 'bottom'){
				// 	this.playExtras(obj, p.extra, p.eType);
				// 	this.remove(p);
				// }
			}
			// ... sinon, on renvoie false
			return false;
		};

		this.playExtras = function(player, e, t){
			if(e == "bonus"){

				switch(t){
					case 1 :
						this.moreWater(player);
						break;
					case 2 :
						this.moreSpeed(player);
						break;
				}

			}else if(e == "malus"){

				switch(t){
					case 1 :
						this.moreSquirrel();
						break;
					case 2 :
						this.waterCost(player);
						break;
					case 3 :
						this.twoBalloons();
						break;
					case 4 :
						this.night();
						break;
					case 5 :
						this.lessSpeed(player);
						break;
				}
			}
		};

		this.moreWater = function(player){
			player.maxWater = 100;
		}

		this.moreSpeed = function(player){
			player.speed = 15;
		}

		this.lessSpeed = function(){
			player.speed = 5;
		}

		this.moreSquirrel = function(){
			config.squirrels_number += 2;
		}

		this.waterCost = function(player){
			player.lessWater = 10;
		}

		this.twoBalloons = function(){
			config.squirrel_life = 2;
		}

		this.night = function(){

		}

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
				canvas.ctx.fillStyle = 'none';
			}
		};

		this.destroy = function(){
			for (var i = 0; i < this.extrasList.length; i++) {
				this.extrasList.splice(i,1);
				//delete(this.extrasList[i]);
			};
		}

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
