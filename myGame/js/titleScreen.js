var TitleScreen = function(game) {
	var clicks;
};
TitleScreen.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('TitleScreen: preload');
		game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
		game.load.audio('bgMusic', 'assets/audio/LoFiLullaby2.wav');
		clicks = 0;
	},
	create: function() { 
		console.log('TitleScreen: create');
		console.log('level: ' + this.level);
		game.add.sprite(0, 0, 'atlas', 'titlescreen');
		clouds = game.add.tileSprite(0, 100, 750, 540,'atlas', 'clouds');
		music = game.add.audio('bgMusic');
		music.loop = true;
		music.play();
		music.volume = 0.1;
	},
	update: function() {
		clouds.tilePosition.x -= 1;

		if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
			console.log('enter pressed');
			game.add.sprite(0, 0, 'atlas', 'instructions');
			clicks++;
		}
		if (clicks == 2){
			game.state.start('GamePlay', true, false, this.level);
		}
	}
}