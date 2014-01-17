/**
 * waterLevel.js
**/

define(['canvas','IM'], function(canvas, IM) {

	function WaterLevel(){
		
		this.init = function(){
			this.img = IM.getInstance('assets/images/sidebar/water');
			this.width = this.img.width;
			this.height = this.img.height;
			this.x	= 1103;
			this.y	= 288;

			this.waterMax;
			this.waterLev;
			this.waterLess;

			this.waterLevel = this.height;

			this.cadre = {id:'water-cadre', x:1095, y:280, width: 52, height:224, img: IM.getInstance('assets/images/sidebar/water-cadre')};			

		};

		this.update = function(){

		};
		
		this.useWater = function(wM, wL, wLess){
			this.waterMax = wM;
			this.waterLev = wL;
			this.waterLess = wLess;

			this.waterLevel = this.height*this.waterLev/this.waterMax;

		}
		
		this.destroy = function(){
			delete(this);
		}

		this.render = function(){

			var dx = 1103;
			var dw = 37;
			var dh = this.waterLevel; // change variable
			var dy = 288 + this.height - dh;

			var sx = 0;
			var sy = this.height - dh;
			var sw = dw;			
			var sh = dh;

			canvas.ctx.drawImage(this.img.data,sx,sy,sw,sh,dx,dy,dw,dh);
			canvas.ctx.drawImage(this.cadre.img.data,this.cadre.x, this.cadre.y);

		};

	}
	
	return new WaterLevel();
});