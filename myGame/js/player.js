// Prefab Player
// Inherits Phaser.Sprite

// This prefab creates a spaceship object
// of random x/y scale
// of random x/y screen position
// of random horizontal velocity
// that will wrap to the opposite side of the screen 
// on reaching either screen edge

// this prefab will loop 50 times to add 50 ships all going one direction
var speed;
var animSpeed = 25;
function Player(game, key, frame) {
	Phaser.Sprite.call(this, game, 150, 200, key, frame);
	this.frame = 4;
	game.physics.enable(this);
	speed = 150;
	this.animations.add('left', Phaser.Animation.generateFrameNames('player', 0, 3), 10, true);
    this.animations.add('right', Phaser.Animation.generateFrameNames('player', 5, 8), 10, true);
}

// Prefab prototype
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


// override init
Player.prototype.init = function() {
	speed = 150;
	animSpeed = 25;
}
// override Update
Player.prototype.update = function() {
	if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		if (speed < 0) {
			speed *= -1;
		}
		this.body.velocity.x = speed;
		this.animations.play('right');
		this.animations.currentAnim.speed = animSpeed;
		animSpeed *= 0.99945;
		speed *= 0.99945;
		console.log(this.animations.currentAnim.speed);
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		if (speed > 0) {
			speed *= -1;
		}
		this.body.velocity.x = speed;
		this.animations.play('left');
		this.animations.currentAnim.speed = animSpeed;
		animSpeed *= 0.99945;
		speed *= 0.99945;
		console.log(this.animations.currentAnim.speed);
	} else {
		this.body.velocity.x = 0;
		this.animations.stop();
		this.frame = 4;
	}
}