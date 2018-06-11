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
		console.log('stove off: ' + stoveOff);
		
		//  Set menu text
		game.stage.backgroundColor = '#000';
		asleepText = game.add.text(150, 50, 'You Fell Asleep', {fontSize: '32px', fill: '#ffffff'});
		playAgainText = game.add.text(100, 200, 'Press [SPACEBAR] to Begin Next Day', {fontSize: '24px', fill: '#ffffff'});
		mainMenuText = game.add.text(100, 250, 'Press [ESC] to go to main menu', {fontSize: '24px', fill: '#ffffff'});

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
		music.stop();
		meowSFX.stop();
		gasSFX.stop();
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false, this.level);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('TitleScreen', true, false, this.level);
		}
	}
}