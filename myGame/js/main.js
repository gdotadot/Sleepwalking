var game;
var player;
var cursors;
var player;
var catbowl;
var catbowlFull;
var stoveOn;
var stoveOff;
var plantwithered;
var plant;

// window load
window.onload = function() {
	game = new Phaser.Game(800, 540, Phaser.AUTO);
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
	var instruction1;
	var instruction2;
	var instruction3;
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
		TitleText = game.add.text(150, 50, 'Sleep Walk Alpha', {fontSize: '32px', fill: '#000099'});
		instruction1 = game.add.text(100, 200, 'Press [A] to move left', {fontSize: '24px', fill: '#000099'});
		instruction2 = game.add.text(100, 250, 'Press [D] to move right', {fontSize: '24px', fill: '#000099'});
		instruction3 = game.add.text(100, 300, 'Press [ENTER] to interact with object', {fontSize: '24px', fill: '#000099'});
		switchPrompt = game.add.text(100, 350, 'Press [SPACEBAR] to Start Game', {fontSize: '24px', fill: '#000099'});
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

		//  Create catbowl to interact with
		//catbowl.frameName = 'catbowl';
    	catbowl = game.add.sprite(390, game.world.height - 48, 'atlas', 'catbowl');
    	game.physics.arcade.enable(catbowl);
    	catbowl.enableBody = true;
    	catbowl.anchor.x = 0.5;
		catbowl.anchor.y = 0.5;

		//  Create cat
		var cat = game.add.sprite(480, game.world.height - 65, 'atlas', 'cat');
		cat.anchor.x = 0.5;
		cat.anchor.y = 0.5;

    	//  Create stove to interact with
    	stoveOn = game.add.sprite(1158, game.world.height - 117, 'atlas', 'stoveon1');
    	game.physics.arcade.enable(stoveOn);
    	stoveOn.enableBody = true;
    	stoveOn.anchor.x = 0.5;
		stoveOn.anchor.y = 0.5;

		//  Create flower to interact with
		plantwithered = game.add.sprite(560, game.world.height - 168, 'atlas', 'plantwithered');
		game.physics.arcade.enable(plantwithered);
		plantwithered.enableBody = true;
    	plantwithered.anchor.x = 0.5;
		plantwithered.anchor.y = 0.5;

	 	player = new Player(game, 'atlas', 'worker0', 18);
	 	game.add.existing(player);
	 	
	 	//  Set camera to follow the player
    	game.camera.follow(player);
	},
	update: function() {

		game.physics.arcade.overlap(player, catbowl, catbowlInteraction, null, this); 
        game.physics.arcade.overlap(player, stoveOn, stoveOnInteraction, null, this);
        game.physics.arcade.overlap(player, plantwithered, plantInteraction, null, this); 

        function catbowlInteraction (player, catbowl) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            	catbowl.kill();
    			catbowlFull = game.add.sprite(390, game.world.height - 48, 'atlas', 'catbowlfull');
    			catbowlFull.anchor.x = 0.5;
    			catbowlFull.anchor.y = 0.5;
    			catbowlFull.moveDown();
            }
        }

        function stoveOnInteraction (player, stoveOn) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            	stoveOn.kill();
    			stoveOff = game.add.sprite(1158, game.world.height - 120, 'atlas', 'stoveoff');
    			stoveOff.anchor.x = 0.5;
    			stoveOff.anchor.y = 0.5;
    			stoveOff.moveDown();
            }
        }

        function plantInteraction (player, stoveOn) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            	plantwithered.kill();
    			plant = game.add.sprite(560, game.world.height - 168, 'atlas', 'plant');
    			plant.anchor.x = 0.5;
    			plant.anchor.y = 0.5;
    			plant.moveDown();
            }
        }
	},
	render: function() {
		//game.debug.body(player);
		//game.debug.body(catbowl);
		//game.debug.body(stoveOn);
		//game.debug.body(plantwithered);
	}
}