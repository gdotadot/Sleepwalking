var game;
var player;

// window load
window.onload = function() {
	game = new Phaser.Game(600, 400, Phaser.AUTO);
	game.state.add('TitleScreen', TitleScreen);
	game.state.add('GamePlay', GamePlay);
	game.state.start('GamePlay');
}

// Title State
	// Display title
	// Press "SPACEBAR" to Play
var TitleScreen = function(game) {
	var TitleText;
	var switchPrompt;
};
TitleScreen.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('TitleScreen: preload');
	},
	create: function() {
		console.log('TitleScreen: create');
		game.stage.backgroundColor = '#000';
		console.log('level: ' + this.level);
		TitleText = game.add.text(100, 150, 'Sleep Walk Alpha', {fontSize: '32px', fill: '#000099'});
		switchPrompt = game.add.text(100, 300, 'Press [SPACEBAR] to continue', {fontSize: '24px', fill: '#000099'});
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false, this.level);
		}
	}
}

// Play State
var GamePlay = function(game) {
};
GamePlay.prototype = {
	init: function(lvl) {
		console.log('GamePlay: init');
		this.level = lvl + 1;
	},
	preload: function() { // preload play assets
	 	console.log('GamePlay: preload');
	 	//  Load path
		game.load.path = 'assets/img/';
		
		//  Load atlas
		game.load.atlas('atlas', 'atlas.png', 'atlas.json');
	},
	create: function() {
	 	console.log('GamePlay: create');
	 	game.physics.setBoundsToWorld();
	 	
	 	var bg = game.add.sprite(0, 0, 'atlas', 'background');

	 	player = new Player(game, 'atlas', 'player', 4);
	 	game.add.existing(player);
	},
	update: function() {
	},
}