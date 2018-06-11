var DayOver = function(game) {
};
DayOver.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('DayOver: preload');
		game.load.image('office', 'assets/img/office.png');
		game.load.image('enter', 'assets/img/enter-button.png');
		game.load.image('esc', 'assets/img/esc.png');
	},
	create: function() {
		console.log('DayOver: create');
		console.log('stove off: ' + stoveOff);
		game.world.setBounds(0, 0, 1350, 540);
		game.add.image(0,0, 'office');
		game.add.image(610, 50, 'enter');
		var escicon = game.add.image(480, 260, 'esc');
		escicon.scale.x = 0.9;
		escicon.scale.y = 0.9;


		//  Sets counter for how many days the cat has not been fed
		if(catFed == false){
			catNotFedDayCounter += 1;
		}else{
			catNotFedDayCounter = 0;
		}

		//  Makes it so that player must water the plant every other day
		if(dayCounter % 2 == 1){
			plantWatered = false;
		}
		if(plantWatered == false){
			plantNotWateredCounter += 1;
		} else {
			plantNotWateredCounter = 0;
		}
		if(stoveOff == false){
			kitchenBurned = true;
		}
		if(windowClosed == false){
			intruderEntered = true;
		}

		// permanent energy consequences
		if (catDead == true && catDeadDays < 6) {
			catDeadDays++;
			difficulty++;
		}
		if (plantDead == true && plantDeadDays < 3) {
			plantDeadDays++;
			difficulty++;
		}
		if (kitchenBurned == true && kitchenBurnedDays < 4) {
			kitchenBurnedDays++;
			difficulty++;
		}
		if (intruderEntered == true && intruderEnteredDays < 7) {
			intruderEnteredDays++;
			difficulty++;
		}

		// Reset conditions

		stoveOff = false;
		windowClosed = false;
		closetUsed = false;

		console.log("plantdead: " + plantDead);
		console.log("not watered: " + plantNotWateredCounter);
	},
	update: function() {
		windSFX.stop();
		gasSFX.stop();
		meowSFX.stop();
		wateringSFX.stop()
		game.camera.x += 1;
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('GamePlay', true, false, this.level);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('TitleScreen', true, false, this.level);
			music.stop();
		}

		


	}
}