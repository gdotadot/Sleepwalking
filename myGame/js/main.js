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

//  Booleans for object interaction
var catFed = false;
var catHungry = false;
var catDead = false;
var plantWatered = false;
var plantDead = false;
var stoveOff = false;
var kitchenBurned = false;
var windowClosed = false;
var intruderEntered = false;
var closetUsed = false;
var showerUsed = false;


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