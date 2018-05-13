// Prefab Player
// Inherits Phaser.Sprite

var speed;
var animSpeed = 25;
function Player(game, key, frame) {
	Phaser.Sprite.call(this, game, 1000, game.world.height - 160, key, frame);
	this.frame = 18;
	game.physics.arcade.enable(this);
	speed = 150;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.enableBody = true;
    this.body.collideWorldBounds = true;
	this.animations.add('right', Phaser.Animation.generateFrameNames('worker', 0, 11), 10, true);
    this.animations.add('left', Phaser.Animation.generateFrameNames('worker', 12, 23), 10, true);
}

// Prefab prototype
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


// override init
Player.prototype.init = function() {
	speed = 250;
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
		this.frame = this.frame;
	}
}