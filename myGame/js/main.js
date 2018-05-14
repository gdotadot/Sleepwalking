var game;
var player;
var cursors;
var player;
var catbowl;
var stove;
var plant;
var black;
var catFed = false;
var plantWatered = false;
var stoveOff = false;

// window load
window.onload = function() {
	game = new Phaser.Game(800, 540, Phaser.AUTO);
	game.state.add('TitleScreen', TitleScreen);
	game.state.add('GamePlay', GamePlay);
	game.state.add('GameOverWin', GameOverWin);
	game.state.add('GameOverLose', GameOverLose);
	game.state.start('TitleScreen');
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

		game.load.image('black', 'black.png');
	},
	create: function() {
	 	console.log('GamePlay: create');
	 	
	 	//  set World
		game.world.setBounds(0, 0, 1500, 540);
		var bg = game.add.sprite(0, 0, 'atlas', 'livingroomkitchen');

		//  Create cat
		var cat = game.add.sprite(480, game.world.height - 65, 'atlas', 'cat');
		cat.anchor.x = 0.5;
		cat.anchor.y = 0.5;

		//  Create catbowl to interact with
		//catbowl.frameName = 'catbowl';
    	catbowl = game.add.sprite(390, game.world.height - 48, 'atlas', 'catbowl');
    	game.physics.arcade.enable(catbowl);
    	catbowl.enableBody = true;
    	catbowl.anchor.x = 0.5;
		catbowl.anchor.y = 0.5;

    	//  Create stove to interact with
    	stove = game.add.sprite(1158, game.world.height - 117, 'atlas', 'stoveon1');
    	stove.animations.add('on', Phaser.Animation.generateFrameNames('stoveon', 1, 5), 5, true);
    	stove.animations.play('on');
    	game.physics.arcade.enable(stove);
    	stove.enableBody = true;
    	stove.anchor.x = 0.5;
		stove.anchor.y = 0.5;

		//  Create flower to interact with
		plant = game.add.sprite(560, game.world.height - 168, 'atlas', 'plantwithered');
		game.physics.arcade.enable(plant);
		plant.enableBody = true;
    	plant.anchor.x = 0.5;
		plant.anchor.y = 0.5;

	 	player = new Player(game, 'atlas', 'worker0', 18);
	 	game.add.existing(player);
	 	
	 	//  Set camera to follow the player
    	game.camera.follow(player);

    	black = game.add.sprite(0, 0, 'black');
    	black.scale.setTo(800, 540);
    	black.alpha = 0;

	},
	update: function() {

		game.physics.arcade.overlap(player, catbowl, catbowlInteraction, null, this); 
        game.physics.arcade.overlap(player, stove, stoveInteraction, null, this);
        game.physics.arcade.overlap(player, plant, plantInteraction, null, this); 

        function catbowlInteraction (player, catbowl) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            	catbowl.frameName = 'catbowlfull';
            	catFed = true;
            	console.log(catFed);
            }
        }

        function stoveInteraction (player, stove) {
            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
            	stove.animations.stop('on');
            	stove.frameName = 'stoveoff';
            	stoveOff = true;
            	console.log(stoveOff);
            }
        }

        function plantInteraction (player, plant) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            	plant.frameName = 'plant';
            	plantWatered = true;
            	console.log(plantWatered);
            }
        }

        if(catFed == true && stoveOff == true && plantWatered == true){
        	game.state.start('GameOverWin');
        }

        if (animSpeed < 8 && animSpeed > 3) {
			// have player lie down (animation)
			// fade screen to full black
			// end game
			console.log("fade out");
			game.add.tween(black).to( { alpha: 1 }, 2500, Phaser.Easing.Linear.None, true);
		}

		if (black.alpha == 1) {
			game.state.start('GameOverLose');
		}
	},
	render: function() {
		//game.debug.body(player);
		//game.debug.body(catbowl);
		//game.debug.body(stove);
		//game.debug.body(plant);
	}
}

//  GameOver State
var GameOverWin = function(game) {
	var taskText;
	var wonText;
	var playAgainText;
	var mainMenuText;
};
GameOverWin.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('GameOverWin: preload');
	},
	create: function() {
		console.log('GameOverWin: create');
		game.stage.backgroundColor = '#000';
		console.log('level: ' + this.level);
		taskText = game.add.text(150, 50, 'You Completed All Tasks', {fontSize: '32px', fill: '#000099'});
		wonText = game.add.text(150, 100, 'You Won!!!', {fontSize: '32px', fill: '#000099'});
		playAgainText = game.add.text(100, 200, 'Press [SPACEBAR] to play again', {fontSize: '24px', fill: '#000099'});
		mainMenuText = game.add.text(100, 250, 'Press [ESC] to go to main menu', {fontSize: '24px', fill: '#000099'});

		// Reset win conditions
		catFed = false;
		plantWatered = false;
		stoveOff = false;
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false, this.level);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('TitleScreen', true, false, this.level);
		}
	}
}

//  GameOver State
var GameOverLose = function(game) {
	var taskText;
	var loseText;
	var playAgainText;
	var mainMenuText;
};
GameOverLose.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('GameOverLose: preload');
	},
	create: function() {
		console.log('GameOverLose: create');
		game.stage.backgroundColor = '#000';
		console.log('level: ' + this.level);
		taskText = game.add.text(150, 50, 'You ran out of energy', {fontSize: '32px', fill: '#000099'});
		loseText = game.add.text(150, 100, 'You Lost...', {fontSize: '32px', fill: '#000099'});
		playAgainText = game.add.text(100, 200, 'Press [SPACEBAR] to play again', {fontSize: '24px', fill: '#000099'});
		mainMenuText = game.add.text(100, 250, 'Press [ESC] to go to main menu', {fontSize: '24px', fill: '#000099'});

		// Reset win conditions
		catFed = false;
		plantWatered = false;
		stoveOff = false;
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false, this.level);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('TitleScreen', true, false, this.level);
		}
	}
}