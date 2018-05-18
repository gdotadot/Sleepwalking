//  Global Variables

//  Game and Assets
var game;
var player;
var cursors;
var player;
var catbowl;
var stove;
var plant;
var black;

//  Counters
var dayCounter = 0;
var catNotFedDayCounter = 0;

//  Booleans for object interaction
var catFed = false;
var catHungry;
var plantWatered = false;
var stoveOff;

//  Music and SFX
var music;
var meowSFX;
var wateringSFX;
var gasSFX;

// window load
window.onload = function() {
	game = new Phaser.Game(800, 540, Phaser.AUTO);
	game.state.add('TitleScreen', TitleScreen);
	game.state.add('GamePlay', GamePlay);
	game.state.add('DayOver', DayOver);
	game.state.start('TitleScreen');
}

// Title State
	// Display title
	// Press "SPACEBAR" to Play
var TitleScreen = function(game) {
	var TitleText;
	var MainInstruct; 
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
		TitleText = game.add.text(150, 50, 'Sleep Walk Alpha', {fontSize: '32px', fill: '#ffffff'});
		MainInstruct = game.add.text(50, 100, 'Complete all tasks before you run out of energy', {fontSize: '32px', fill: '#ffffff'});
		instruction1 = game.add.text(100, 200, 'Press [A] to move left', {fontSize: '24px', fill: '#ffffff'});
		instruction2 = game.add.text(100, 250, 'Press [D] to move right', {fontSize: '24px', fill: '#ffffff'});
		instruction3 = game.add.text(100, 300, 'Press [ENTER] to interact with object', {fontSize: '24px', fill: '#ffffff'});
		switchPrompt = game.add.text(100, 350, 'Press [SPACEBAR] to Start Game', {fontSize: '24px', fill: '#ffffff'});
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
		dayCounter += 1;

		console.log('day: ' + dayCounter);
		console.log('cat has been fed: ' + catFed);
		console.log('cat is hungry: ' + catHungry);
		console.log('days cat has not been fed: ' + catNotFedDayCounter);
		console.log('plant has been watered: ' + plantWatered);

		var i = Math.random() * 10 + 1;

		
		if(dayCounter == 1){

			// Initialize boolean vars for interactable objects
			if (i <= 5){
				catHungry = false;	
			} else{
				catHungry = true;
			}
			plantWatered = true;
	
		}else{
			if(catNotFedDayCounter = 1){
				catHungry = true;
			}
		}	

	},
	preload: function() { // preload play assets
	 	console.log('GamePlay: preload');

	 	game.physics.startSystem(Phaser.Physics.ARCADE);

	 	//  Load path
		//game.load.path = 'assets/img/';
		
		//  Load atlas
		game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');

		game.load.image('black', 'assets/img/black.png');

		//  load sounds
		game.load.audio('bgMusic', 'assets/audio/backgroundMusicGameover.mp3');
		game.load.audio('meow', 'assets/audio/meow.mp3');
		game.load.audio('watering', 'assets/audio/watering.mp3');
		game.load.audio('gas', 'assets/audio/gas.mp3');


	},
	create: function() {
	 	console.log('GamePlay: create');
	 	
	 	//  set World
		game.world.setBounds(0, 0, 1500, 540);
		var bg = game.add.sprite(0, 0, 'atlas', 'livingroomkitchen');

		//  Add sounds
		music = game.add.audio('bgMusic');
		meowSFX = game.add.audio('meow');
		gasSFX = game.add.audio('gas');
		wateringSFX = game.add.audio('watering');

		//  Start bg music
		music.loop = true;
		music.play();
		meowSFX.loop = true;
		gasSFX.loop = true;
		gasSFX.play();

		console.log(catHungry);
		if(catHungry == true){
			meowSFX.play();	
		}

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
		plant = game.add.sprite(560, game.world.height - 168, 'atlas', 'plant');
		if(plantWatered == false){
			plant.frameName = 'plantwithered';
		}else{
			plant.frameName = 'plant'
;		}
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
 				meowSFX.stop();
            	catFed = true;
            	console.log(catFed);
            }
        }

        function stoveInteraction (player, stove) {
            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
            	stove.animations.stop('on');
            	gasSFX.stop();
            	stove.frameName = 'stoveoff';
            	stoveOff = true;
            	console.log(stoveOff);
            }
        }

        function plantInteraction (player, plant) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            	plant.frameName = 'plant';
            	wateringSFX.play();
            	plantWatered = true;
            	console.log(plantWatered);
            }
        }

        if (animSpeed < 8 && animSpeed > 3) {
			// have player lie down (animation)
			// fade screen to full black
			// end game
			console.log("fade out");
			game.add.tween(black).to( { alpha: 1 }, 2500, Phaser.Easing.Linear.None, true);
		}

		if (black.alpha == 1) {
			game.state.start('DayOver');
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
var DayOver = function(game) {
	var asleeptaskText;
	var playAgainText;
	var mainMenuText;
};
DayOver.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('DayOver: preload');
	},
	create: function() {
		console.log('DayOver: create');
		
		//  Set menu text
		game.stage.backgroundColor = '#000';
		asleepText = game.add.text(150, 50, 'You Fell Asleep', {fontSize: '32px', fill: '#ffffff'});
		playAgainText = game.add.text(100, 200, 'Press [SPACEBAR] to Begin Next Day', {fontSize: '24px', fill: '#ffffff'});
		mainMenuText = game.add.text(100, 250, 'Press [ESC] to go to main menu', {fontSize: '24px', fill: '#ffffff'});

		//  Check object states and set consequences
		if(catFed == false){
			catNotFedDayCounter += 1;
		}

		if(dayCounter % 2 == 1){
			plantWatered = false;
		}

		// Reset conditions
		stoveOff = false;
	},
	update: function() {
		music.stop();
		meowSFX.stop();
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false, this.level);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('TitleScreen', true, false, this.level);
		}
	}
}

