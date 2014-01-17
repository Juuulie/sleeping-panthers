/**
 * stage.js
**/

define(['canvas', 'IM', 'sound', 'water', 'player'], function(canvas, IM, sound, water, player) {
	
	function Stage() {

		this.platformsList = [];
		this.sidebarList = [];
		this.sidebarElList = [];
		this.Collider;

		this.init = function(Collider) {

			this.Collider = Collider;

			var theme = sound.getSound('theme');
			console.log(theme)
			//theme.sound.play();

			this.platformsList.push({id:'puit', x:0, y:520, width: 133, height:103, img: IM.getInstance('assets/images/platform/puit')});
			this.platformsList.push({id:'sol', x:0, y:(720-115), width: 1280, height:115, img: IM.getInstance('assets/images/platform/plateformeDebut')});
			this.platformsList.push({id:'sol_panth', x:0, y:(720-32), width: 1280, height:32, img: IM.getInstance('assets/images/platform/sol')});
			this.platformsList.push({id:'platform_left', x:-10, y:400, width: 283, height:61, img: IM.getInstance('assets/images/platform/plateforme1')});
			this.platformsList.push({id:'platform_right', x:813, y:400, width: 267, height:61, img: IM.getInstance('assets/images/platform/plateforme3')});
			
			this.sidebarList.push({id:'sidebar', x:0, y:0, width: 267, height:61, img: IM.getInstance('assets/images/bg/bg_UI')});
			this.sidebarElList.push({id:'count-dead', x:1035, y:40, width: 156, height:121, img: IM.getInstance('assets/images/sidebar/count-dead')});


			this.Collider.defineArea(0, 0, canvas.canvas.width - 310, canvas.canvas.height - 105);
			this.Collider.addBody(0, 550, 75, 50);
			this.Collider.addBody(0, 410, 270, 40);
			this.Collider.addBody(830, 410, 267, 40);
		};

		this.update = function() {
		};

		this.updateBehavior = function() {
			
		};

		this.checkCollisionWith = function(obj) {
			// En prenant en compte le fait que obj est un objet contenant au moins les propriétés
			// x, y, width, height
			var p;
			for (var i = 0, c = this.platformsList.length; i < c; i++) {
				p = this.platformsList[i];
				// Si on détecte une collision avec un projectile, on
				// renvoie ce projectile ...
				// var collision = collidePlatf(obj, p)
				// if (collision == 'top'){
				// 	obj.position.y = p.y - obj.height ;
				// 	obj.canJump = true;
				// 	obj._gravityVel = 1;
				// }else if(collision == 'bottom'){
				// 	obj.position.y = p.y + p.height ;
				// 	obj._gravityVel = 0;
				// }
			}
			// ... sinon, on renvoie false
			return false;
		};

		this.render = function() {
			var p;
			for (var i = 0, c = this.platformsList.length; i < c; i++) {
				p = this.platformsList[i];
				// Debug
				// canvas.ctx.fillRect(p.x, p.y, p.width, p.height);

				canvas.ctx.drawImage(p.img.data, p.x, p.y);

				// this.Collider.debugBodies(canvas.ctx);
			}
			for (var i = 0, c = this.sidebarList.length; i < c; i++) {
				p = this.sidebarList[i];
				// Debug
				// canvas.ctx.fillRect(p.x, p.y, p.width, p.height);

				canvas.ctx.drawImage(p.img.data, p.x, p.y);

				this.Collider.debugBodies(canvas.ctx);
			}
			
			for (var i = 0, c = this.sidebarElList.length; i < c; i++) {
				p = this.sidebarElList[i];

				canvas.ctx.drawImage(p.img.data, p.x, p.y);

				// Debug
				// canvas.ctx.fillRect(p.x, p.y, p.width, p.height);

				// this.Collider.debugBodies(canvas.ctx);
			}

		};

	}

	return new Stage();

});