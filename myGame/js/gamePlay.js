var GamePlay = function(game) {
};
GamePlay.prototype = {
	init: function(lvl) {
		console.log('GamePlay: init');
		dayCounter += 1;
		console.log('day: ' + dayCounter);
		console.log('cat has been fed: ' + catFed);
		console.log('cat is hungry: ' + catHungry);
		console.log('cat dead: ' + catDead);
		console.log('days cat has not been fed: ' + catNotFedDayCounter);
		console.log('days plant not watered: ' + plantNotWateredCounter);
		console.log('plant has been watered: ' + plantWatered);
		console.log('plant dead: ' + plantDead);
		console.log('kitchen burned: ' + kitchenBurned);
		console.log('intruder enterd: ' + intruderEntered);

		var catRandomNum = Math.random() * 10 + 1;
		var stoveRandomNum = Math.random() * 10 + 1;
		var windowRandomNum = Math.random() * 10 + 1;

		//  First Day Dependent Events
		if(dayCounter == 1){

			// Initialize boolean vars for interactable objects
			if (catRandomNum <= 5){
				catHungry = false;
			}
			else{
				catHungry = true;
			}
			
			if(stoveRandomNum <= 5){
				stoveOff = false;
			}else{
				stoveOff = true;
			}

			if(windowRandomNum <=5){
				windowClosed = true;
			}
			
			plantWatered = true;
	
		//  2nd Day and on
		}else{
			if(catNotFedDayCounter >= 1){
				catHungry = true;
			}
			else if(catNotFedDayCounter < 1){
				catHungry = false;
			}

			if(catNotFedDayCounter == 3){
				catDead = true;
				catHungry = false;
			}
			
			if(stoveRandomNum <= 5){
				stoveOff = true;
			}else{
				stoveOff = false;
			}

			if(windowRandomNum <=5){
				windowClosed = true;
			}else{
				windowClosed = false;
			}

			if(plantNotWateredCounter == 3){
				plantDead = true;
			}

			catFed = false;
		}	
		// Independent Events
		if (stoveRandomNum <= 5) {
			stoveOff = true;
		}
		if (windowRandomNum <= 5) {
			windowClosed = true;
		}

		console.log('day: ' + dayCounter);
		console.log('cat has been fed: ' + catFed);
		console.log('cat is hungry: ' + catHungry);
		console.log('days cat has not been fed: ' + catNotFedDayCounter);
		console.log('plant has been watered: ' + plantWatered);
		console.log('window has been closed: ' + windowClosed);

	},
	preload: function() { // preload play assets
	 	console.log('GamePlay: preload');

	 	game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//  Load atlas
		game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
		game.load.image('black', 'assets/img/black.png');


		//  load sounds
		game.load.audio('meow', 'assets/audio/meow.mp3');
		game.load.audio('watering', 'assets/audio/watering.wav');
		game.load.audio('gas', 'assets/audio/gas.wav');
		game.load.audio('wind', 'assets/audio/windSFX.wav');


	},
	create: function() {
	 	console.log('GamePlay: create');

	 	// var livingroomFilter = game.add.sprite(0, 540, 'atlas', 'livingroomfilter');
	 	// var bedroomFilter = game.add.sprite(0, 0, 'atlas', 'bedroomfilter');

	 	// set time delay for audio
	 	catDelay = 0;
	 	windDelay = 0;
	 	gasDelay = 0;
	 	
	 	//  set World
		game.world.setBounds(0, 0, 1500, 1080);
		var bg = game.add.sprite(0, 0, 'atlas', 'background');

		//  Add sounds
		meowSFX = game.add.audio('meow');
		meowSFX.volume = 0.25;
		gasSFX = game.add.audio('gas');
		gasSFX.volume = 1.1;
		wateringSFX = game.add.audio('watering');
		windSFX = game.add.audio('wind');

		//  Living Room Objects------------------------------------------------------

		//  Create cat
		var cat = game.add.sprite(975, game.world.height - 65, 'atlas', 'catalive');
		if(catDead == true){
			cat.frameName = 'catdead';
			var clawMarks = game.add.sprite(0, 540, 'atlas', 'clawmarks');
			catHungry = false;
			cat.x = 200;
		}
		cat.anchor.x = 0.5;
		cat.anchor.y = 0.5;
		cat.scale.x = 0.6;
		cat.scale.y = 0.6;

		//  Create catbowl to interact with
		//catbowl.frameName = 'catbowl';
    	catbowl = game.add.sprite(897, game.world.height - 48, 'atlas', 'catbowl');
    	game.physics.arcade.enable(catbowl);
    	catbowl.enableBody = true;
    	catbowl.anchor.x = 0.3;
		catbowl.anchor.y = 0.3;

    	//  Create stove to interact with
    	console.log('stoveOff: ' + stoveOff);
    	stove = game.add.sprite(1158, game.world.height - 117, 'atlas', 'stoveon1');
    	stove.animations.add('on', Phaser.Animation.generateFrameNames('stoveon', 1, 5), 5, true);
    	stove.animations.play('on');
    	if (stoveOff == true){
    		stove.animations.stop('on');
            stove.frameName = 'stoveoff';
    	}
    	game.physics.arcade.enable(stove);
    	stove.enableBody = true;
    	stove.anchor.x = 0.5;
		stove.anchor.y = 0.5;

		//  Create flower to interact with
		plant = game.add.sprite(575, game.world.height - 168, 'atlas', 'plant');
		if(plantDead == true){
			plant.frameName = 'plantdead';
			plantLove = false;
		}else if(plantWatered == false){
			plant.frameName = 'plantwithered';
			plantLove = true;
		}else{
			plant.frameName = 'plant';
			plantLove = false;		
		}
		game.physics.arcade.enable(plant);
		plant.enableBody = true;
    	plant.anchor.x = 0.5;
		plant.anchor.y = 0.5;

		//  Create window to interact with
    	slidingWindow = game.add.sprite(320, game.world.height - 300, 'atlas', 'windowopen');
    	if(windowClosed == true){
    		slidingWindow.frameName = 'windowclosed';
    	}else if(windowClosed == false){
    		slidingWindow.frameName = 'windowopen';
    	}
    	game.physics.arcade.enable(slidingWindow);
    	slidingWindow.body.setSize(200, 180);
    	slidingWindow.enableBody = true;
    	slidingWindow.anchor.x = 0.5;
		slidingWindow.anchor.y = 0.5;

		//  Create Door from living room to bedroom
		livingroomToBedroom = game.add.sprite(735, game.world.height - 174, 'atlas', 'door');
		game.physics.arcade.enable(livingroomToBedroom);
		livingroomToBedroom.enableBody = true;
		livingroomToBedroom.anchor.x = 0.5;
		livingroomToBedroom.anchor.y = 0.5;

		//  Add burned effect to kitchen cabinets if stove not turned off night before
		if(kitchenBurned == true){
			burnedCabinets = game.add.sprite(1162, game.world.height - 344, 'atlas', 'burnedcabinet');
			burnedCabinets.anchor.x = 0.5;
			burnedCabinets.anchor.y = 0.5;
		}

		if(intruderEntered == true){
			livingroomGraffiti = game.add.sprite(0,game.world.height - 540, 'atlas', 'graffiti(livingrm)');
			bedroomGraffiti = game.add.sprite(0, 0, 'atlas', 'graffiti(bedroom)');

		}


		//  Bedroom Objects----------------------------------------------------------------

		//  Create closet to interact with
		closet = game.add.sprite(340, game.world.height - 717, 'atlas', 'closetpj');
		game.physics.arcade.enable(closet);
		closet.enableBody = true;
		closet.anchor.x = 0.5;
		closet.anchor.y = 0.5;

		//  Create bed to interact with
		bed = game.add.sprite(573, game.world.height - 665, 'atlas', 'bed');
		game.physics.arcade.enable(bed);
		bed.enableBody = true;
		bed.anchor.x = 0.5;
		bed.anchor.y = 0.5;

		//  Create Door from bedroom to living room
		bedroomToLivingroom = game.add.sprite(120, game.world.height - 726, 'atlas', 'door');
		game.physics.arcade.enable(bedroomToLivingroom);
		bedroomToLivingroom.enableBody = true;
		bedroomToLivingroom.anchor.x = 0.5;
		bedroomToLivingroom.anchor.y = 0.5;

		//  Create Door from bedroom to bathroom
		bedroomToBathroom = game.add.sprite(15, game.world.height - 726, 'atlas', 'sidedoor');
		game.physics.arcade.enable(bedroomToBathroom);
		bedroomToBathroom.enableBody = true;
		bedroomToBathroom.anchor.x = 0.5;
		bedroomToBathroom.anchor.y = 0.5;

		//  Create invisible wall
		bedroomWall = game.add.sprite(745, game.world.height - 726);
		game.physics.arcade.enable(bedroomWall);
		bedroomWall.enableBody = true;
		bedroomWall.body.immovable = true;
		bedroomWall.anchor.x = 0.5;
		bedroomWall.anchor.y = 0.5;


		//  Bathroom Objects--------------------------------------------------------------

		//  Create Shower to interact with
		shower = game.add.sprite(1266, game.world.height - 750, 'atlas', 'shower');
		game.physics.arcade.enable(shower);
		shower.enableBody = true;
		shower.anchor.x = 0.5;
		shower.anchor.y = 0.5;

		//  Create Door from bathroom to the bedroom
		bathroomToBedroom = game.add.sprite(882, game.world.height - 720, 'atlas', 'sidedoor');
		game.physics.arcade.enable(bathroomToBedroom);
		bathroomToBedroom.enableBody = true;
		bathroomToBedroom.anchor.x = 0.5;
		bathroomToBedroom.anchor.y = 0.5;

		//  Create invisible wall
		bathroomWall = game.add.sprite(1370, game.world.height - 726);
		game.physics.arcade.enable(bathroomWall);
		bathroomWall.enableBody = true;
		bathroomWall.body.immovable = true;
		bathroomWall.anchor.x = 0.5;
		bathroomWall.anchor.y = 0.5;

		//  Main Gameplay Objects--------------------------------------------------------

		//  Create Player Object
	 	player = new Player(game, 'atlas', 'CWalk1', goodSleep);
	 	game.add.existing(player);
		goodSleep = false;
	 	
	 	//  Set camera to follow the player
    	//game.camera.follow(player);
    	game.camera.x = 0;
    	game.camera.y = 540;
    	//game.camera.y = game.world.height - 540;
    	game.camera.follow(player); 
    	game.camera.deadzone = new Phaser.Rectangle(100, 0, 550, 540);

    	//  Interaction Icon
    	interactionIcon = game.add.sprite(1600, 1100, 'atlas', 'notification');
    	interactionIcon.anchor.x = 0;
    	interactionIcon.anchor.y = 1;

    	black = game.add.sprite(0, 0, 'black');
    	black.scale.setTo(800, 540);
    	black.alpha = 0;

	},
	update: function() {
        //  Interact key will decrease energy if used on uniteractable item
        if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
        	speed *= 0.9;
        	animSpeed *= 0.9;
        	console.log(animSpeed);
        }

        if(game.physics.arcade.overlap(player, catbowl) || game.physics.arcade.overlap(player, stove) || game.physics.arcade.overlap(player, plant) ||
        	game.physics.arcade.overlap(player, slidingWindow) || game.physics.arcade.overlap(player, shower) || game.physics.arcade.overlap(player, closet) ||
        	game.physics.arcade.overlap(player, bed) || game.physics.arcade.overlap(player, livingroomToBedroom) || game.physics.arcade.overlap(player, bedroomToLivingroom)){
        		interactionIcon.x = player.x;
        		interactionIcon.y = player.y - 190;
        } else {
        	interactionIcon.x = 1700;
        	interactionIcon.y = 1100;
        }

        // Livingroom Interactions------------------------------------------------------------

        game.physics.arcade.overlap(player, catbowl, catbowlInteraction, null, this); 
        game.physics.arcade.overlap(player, stove, stoveInteraction, null, this);
        game.physics.arcade.overlap(player, plant, plantInteraction, null, this);
        game.physics.arcade.overlap(player, slidingWindow, windowInteraction, null, this);
        game.physics.arcade.overlap(player, livingroomToBedroom, doorToBedroom, null, this);


        function catbowlInteraction (player, catbowl) {
        	if(game.time.now > catDelay) {
        		if (catHungry == true) {
        			meowSFX.play();
        			catDelay = game.time.now + 5000;
        		}
        	}

            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && catHungry == true && !catDead){
            	catbowl.frameName = 'catbowlfull';
            	player.animations.play('cFeedCat');
            	if(closetUsed == true){
            		player.frameName = 'PHand1'; 
            	} else {
            		player.frameName = 'CHand1';
            	}
 				meowSFX.stop();
            	catFed = true;
            	catHungry = false;
            	console.log(catFed);
            	speed *= 1.4;
            	animSpeed *= 1.4;
            }
        }

        function stoveInteraction (player, stove) {
        	if (game.time.now > gasDelay) {
        		if (stoveOff == false) {
        			gasSFX.play();
        			gasDelay = game.time.now + 2000;
        		}
        	}

            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && stoveOff == false){
            	stove.animations.stop('on');
            	gasSFX.stop();
            	stove.frameName = 'stoveoff';
            	if(closetUsed == true){
            		player.frameName = 'PHand1'; 
            	} else {
            		player.frameName = 'CHand1';
            	}
            	stoveOff = true;
            	console.log(stoveOff);
            	speed *= 1.015;
            	animSpeed *= 1.015;
            }
        }

        function plantInteraction (player, plant) {
            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && plantDead == false){
            	plant.frameName = 'plant';
            	if(closetUsed == true){
            		player.frameName = 'PHand1'; 
            	} else {
            		player.frameName = 'CHand1';
            	}
            	wateringSFX.play();
            	plantWatered = true;
            	console.log(plantWatered);
            	if (plantLove == false){
            		speed *= 1.2;
                   	animSpeed *= 1.2;
                   	plantLove = true;
                }
            }
        }

        function windowInteraction (player, slidingWindow) {       
			if (game.time.now > windDelay) {
        		if (windowClosed == false) {
        			windSFX.play();
        			windDelay = game.time.now + 25000;
        		}
        	}

            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && windowClosed == false){
            	slidingWindow.frameName = 'windowclosed';
            	if(closetUsed == true){
            		player.frameName = 'PHand1'; 
            	} else {
            		player.frameName = 'CHand1';
            	}	
            	windowClosed = true;
            	windSFX.stop();
            	// speed *= 1.015;
            	// animSpeed *= 1.015;
            }
        }

        function doorToBedroom (player, livingroomToBedroom) {
        	if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
        		player.x = 120,
        		player.y = game.world.height - 563;
        		game.camera.x = 0;
        		game.camera.y = 0;
        		speed *= 1.015;
            	animSpeed *= 1.015;
        	}
        }

        //  Bedroom Interactions-------------------------------------------------------------

        game.physics.arcade.overlap(player, closet, closetInteraction, null, this);
        game.physics.arcade.overlap(player, bed, goToSleep, null, this);
        game.physics.arcade.overlap(player, bedroomToLivingroom, doorToLivingRoom, null, this);
        game.physics.arcade.overlap(player, bedroomToBathroom, doorToBathroom, null, this);
        game.physics.arcade.collide(player, bedroomWall);

        function closetInteraction (player, closet) {

        	if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && closetUsed == false){
            	closet.frameName = 'closetempty';
            	if(closetUsed == true){
            		player.frameName = 'PHand1'; 
            	} else {
            		player.frameName = 'CHand1';
            	}
            	closetUsed = true;
            	speed *= 1.015;
            	animSpeed *= 1.015;
            }
        }

        function goToSleep (player, bed) {
        	if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
        		goodSleep = true;
        		game.state.start('DayOver');
        	}
        }

        function doorToLivingRoom (player, bedroomToLivingroom) {
        	if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)){
        		player.x = 735;
        		player.y = game.world.height - 23;
        		game.camera.x = 400;
        		game.camera.y = game.world.height - 540;
        		speed *= 1.015;
            	animSpeed *= 1.015;
        	}
        }

        function doorToBathroom (player, bedroomToBathroom) {
        	player.x = 1000;
        	player.y = game.world.height - 563;
        	game.camera.x = 750;
        	game.camera.y = 0;
        }

        //  Bathroom Interactions-----------------------------------------------------------
        game.physics.arcade.overlap(player, bathroomToBedroom, doorBathToBedroom, null, this);
        game.physics.arcade.overlap(player, shower, showerInteraction, null, this);
        game.physics.arcade.collide(player, bathroomWall);

        function showerInteraction (player, closet) {
        	if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && showerUsed == false){
            	showerUsed = true;
            	shower.frameName = 'closedshower';
            	if(closetUsed == true){
            		player.frameName = 'PHand1'; 
            	} else {
            		player.frameName = 'CHand1';
            	}
            	speed *= 1.015;
            	animSpeed *= 1.015;
            }
        }

        function doorBathToBedroom (player, bathroomToBedroom) {
        	player.x = 150;
        	player.y = game.world.height - 563;
        	game.camera.x = 0;
        	game.camera.y = 0;
        }

        //  Player Slow Down----------------------------------------------------------------
        if (animSpeed < 8 && animSpeed > 4) {
			// have player lie down (animation)
			// fade screen to full black
			// end game
			// console.log("fade out");
			game.add.tween(black).to( { alpha: 1 }, 2500, Phaser.Easing.Linear.None, true);
		}

		if (animSpeed < 3.5) {
			black.alpha = 1;
		}

		if (black.alpha == 1 && animSpeed < 5) {
			game.state.start('DayOver');
		}

		// if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		// 	game.state.start('DayOver');
		// }
	},
	render: function() {
		//  Check Hitboxes
		// game.debug.body(player);
		//game.debug.body(catbowl);
		// game.debug.body(slidingWindow);
		//game.debug.body(plant);
	}
}