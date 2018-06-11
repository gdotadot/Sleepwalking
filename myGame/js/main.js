//  Global Variables

//  Game and Assets
var game;
var player;
var cursors;
var player;
var catbowl;
var stove;
var burnedCabinets;
var plant;
var slidingWindow;
var closet;
var bed;
var shower;
var livingroomToBedroom;
var bedroomToLivingroom;
var bedroomToBathroom;
var bathroomToBedroom;
var livingroomGraffiti;
var bedroomGraffiti;
var black;
var bedroomWall;
var bathroomWall;
var interactionIcon;


//  Counters
var dayCounter = 0;
var catNotFedDayCounter = 0;
var plantNotWateredCounter = 0;
var difficulty = 0;
var goodSleep = true;
var daysUnclean = 0;

//  Booleans for object interaction
var catFed = false;
var catHungry = false;
var plantWatered = false;
var plantLove;
var stoveOff = false;
var windowClosed = false;
var closetUsed = false;
var showerUsed = false;

// permanent consequences
var catDead = false;
var catDeadDays = 0;
var plantDead = false;
var plantDeadDays = 0;
var kitchenBurned = false;
var kitchenBurnedDays = 0;
var intruderEntered = false;
var intruderEnteredDays = 0;


//  Music and SFX
var music;
var meowSFX;
var wateringSFX;
var gasSFX;
var windSFX;

// window load
window.onload = function() {
	game = new Phaser.Game(750, 540, Phaser.AUTO);
	game.state.add('TitleScreen', TitleScreen);
	game.state.add('GamePlay', GamePlay);
	game.state.add('DayOver', DayOver);
	game.state.start('TitleScreen');
}