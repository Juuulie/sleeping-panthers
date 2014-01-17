define([], function() {
	
	function Sound() {
		
		this.sounds = [];

		this.init = function() {

			var theme = {};
			theme.sound = new Audio();
			theme.sound.src = 'assets/sounds/son_ingame.ogg';
			theme.sound.volume = 0.6;
			theme.sound.loop = true;
			theme.id = 'theme';
			this.sounds.push(theme);

			var menu = {};
			menu.sound = new Audio();
			menu.sound.src = 'assets/sounds/menu.ogg';
			menu.sound.volume = 0.8;
			menu.sound.loop = true;
			menu.id = 'menu';
			this.sounds.push(menu);

			var spit = {};
			spit.sound = new Audio();
			spit.sound.src = 'assets/sounds/spit.ogg';
			spit.id = 'spit';
			this.sounds.push(spit);

			var squirrel = {};
			squirrel.sound = new Audio();
			squirrel.sound.src = 'assets/sounds/squirrel_final.ogg';
			squirrel.id = 'squirrel';
			this.sounds.push(squirrel);

			var extras = {};
			extras.sound = new Audio();
			extras.sound.src = 'assets/sounds/pop_bonus.ogg';
			extras.id = 'extras';
			this.sounds.push(extras);
			
		};

		this.getSound = function(id) {
			for (var i = 0; i < this.sounds.length; i++) {
				if(this.sounds[i].id == id){
					return this.sounds[i];
				}
			};

			return false;
		};

	}

	return new Sound();

});