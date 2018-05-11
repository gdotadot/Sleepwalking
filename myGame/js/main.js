var game;
var player;
var cursors;
var player;
var catbowl;
var catbowlfull;

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

	 	game.physics.startSystem(Phaser.Physics.ARCADE);

	 	//  Load path
		game.load.path = 'assets/img/';
		
		//  Load atlas
		game.load.atlas('atlas', 'atlas.png', 'atlas.json');
	},
	create: function() {
	 	console.log('GamePlay: create');
	 	
	 	//  set World
		game.world.setBounds(0, 0, 1500, 540);
		var bg = game.add.sprite(0, 0, 'atlas', 'livingroomkitchen');

		//  Create object to interact with
    	catbowl = game.add.sprite(380, game.world.height - 67, 'atlas', 'catbowl');
    	game.physics.arcade.enable(catbowl);
    	catbowl.enableBody = true;

	 	player = new Player(game, 'atlas', 'player', 1);
	 	game.add.existing(player);
	 	player.anchor.x = 0.5;
		player.anchor.y = 0.5;

		game.physics.arcade.enable(player);
		catbowl.enableBody = true;
    	player.body.collideWorldBounds = true;

	 	//  Set camera to follow the player
    	game.camera.follow(player);
	},
	update: function() {

		game.physics.arcade.overlap(player, catbowl, objInteraction, null, this); 
        
        function objInteraction (player, catbowl) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            	catbowl.kill();
    			catbowlfull = game.add.sprite(380, game.world.height - 67, 'atlas', 'catbowlfull');
            }
        }
	},
	render: function() {
		game.debug.body(player);
		game.debug.body(catbowl);
	}
}