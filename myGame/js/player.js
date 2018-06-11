// Prefab Player
// Inherits Phaser.Sprite

var speed;
var animSpeed;
function Player(game, key, frame, goodSleep) {
	// console.log("Slept in bed: " + goodSleep);
	Phaser.Sprite.call(this, game, 150, game.world.height - 135, key, frame);
	this.frame = 37;
	game.physics.arcade.enable(this);
	speed = 300;
	animSpeed = 35;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.enableBody = true;
	this.body.setSize(80, 230, 0, 0);
    this.body.collideWorldBounds = true;
    this.game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
	this.animations.add('cWalk', Phaser.Animation.generateFrameNames('CWalk', 1, 12), animSpeed, true);
	this.animations.add('pWalk', Phaser.Animation.generateFrameNames('PWalk', 1, 12), animSpeed, true);
	this.animations.add('cIdle', Phaser.Animation.generateFrameNames('IdleSleep', 1, 6), 5, true);
	this.animations.add('cCollapse', Phaser.Animation.generateFrameNames('CCollapse', 1, 11), 10, true);
	this.animations.add('pCollapse', Phaser.Animation.generateFrameNames('PCollapse', 1, 11), 10, true);
	if (goodSleep == false) {
		speed -= 50;
		animSpeed -= 10;
	}
	// console.log("speed: " + speed);
	// console.log("animation speed: " + animSpeed);
}

// Prefab prototype
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

var energyDecay = [0.99945, 0.999, 0.9975, 0.9925];

// override Update
Player.prototype.update = function() {
	if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		if (speed < 0) {
			speed *= -1;
		}

		this.scale.x = 1;
		this.body.velocity.x = speed;

		if(closetUsed == true){
			this.animations.play('pWalk');
		}else {
			this.animations.play('cWalk');
		};

		this.animations.currentAnim.speed = animSpeed;
		if (difficulty == 0)
		{
			animSpeed *= energyDecay[0];
			speed *= energyDecay[0];
		} else if (difficulty > 0 && difficulty <= 5) {
			animSpeed *= energyDecay[1];
			speed *= energyDecay[1];
		} else if (difficulty > 5 && difficulty <= 15) {
			animSpeed *= energyDecay[2];
			speed *= energyDecay[2];
		} else {
			animSpeed *= energyDecay[3];
			speed *= energyDecay[3];
		}
		console.log(this.animations.currentAnim.speed);
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		if (speed > 0) {
			speed *= -1;
		}

		this.scale.x = -1;
		this.body.velocity.x = speed;
		
		if(closetUsed == true){
			this.animations.play('pWalk');
		}else {
			this.animations.play('cWalk');
		};

		this.animations.currentAnim.speed = animSpeed;

		if (difficulty == 0)
		{
			animSpeed *= energyDecay[0];
			speed *= energyDecay[0];
		} else if (difficulty > 0 && difficulty <= 5) {
			animSpeed *= energyDecay[1];
			speed *= energyDecay[1];
		} else if (difficulty > 5 && difficulty <= 15) {
			animSpeed *= energyDecay[2];
			speed *= energyDecay[2];
		} else {
			animSpeed *= energyDecay[3];
			speed *= energyDecay[3];
		}

		console.log(this.animations.currentAnim.speed);
	} else {
		this.body.velocity.x = 0;
		this.animations.play('cIdle');
		this.frame = this.frame;
	}
}