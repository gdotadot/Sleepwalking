var DayOver = function(game) {
};
DayOver.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('DayOver: preload');
		game.load.image('office', 'office.png');
	},
	create: function() {
		console.log('DayOver: create');
		console.log('stove off: ' + stoveOff);
		game.world.setBounds(0, 0, 1350, 540);
		game.add.image(0,0, 'office');
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
		}else{
			plantNotWateredCounter = 0;
		}

		if(stoveOff == false){
			kitchenBurned = true;
		}

		if(windowClosed == false){
			intruderEntered = true;
		}

		// Reset conditions

		stoveOff = false;
		windowClosed = false;
		closetUsed = false;
	},
	update: function() {
		game.camera.x += 1;
		music.stop();
		meowSFX.stop();
		gasSFX.stop();
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('GamePlay', true, false, this.level);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('TitleScreen', true, false, this.level);
		}
	}
}