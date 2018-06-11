// Prefab Player
// Inherits Phaser.Sprite

var speed;
var animSpeed;

function Player(game, key, frame, goodSleep) {
	// console.log("Slept in bed: " + goodSleep);
	Phaser.Sprite.call(this, game, 50, game.world.height - 23, key, frame);
	this.frameName = 'CWalk1';
	game.physics.arcade.enable(this);
	speed = 300;
	animSpeed = 35;
	this.anchor.x = 0;
	this.anchor.y = 1;
	this.enableBody = true;
	this.body.setSize(50, 200, 0, 0);
    this.body.collideWorldBounds = true;
    this.game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
	this.animations.add('cWalk', Phaser.Animation.generateFrameNames('CWalk', 1, 12), animSpeed, true);
	this.animations.add('pWalk', Phaser.Animation.generateFrameNames('PWalk', 1, 12), animSpeed, true);
	this.animations.add('cIdle', Phaser.Animation.generateFrameNames('CIdleSleep', 1, 6), 5, true);
	this.animations.add('pIdle', Phaser.Animation.generateFrameNames('PIdleSleep', 1, 6), 5, true);
	this.animations.add('cSlouch', Phaser.Animation.generateFrameNames('CSlouch', 1, 12), animSpeed, true);
	this.animations.add('pSlouch', Phaser.Animation.generateFrameNames('PSlouch', 1, 12), animSpeed, true);
	this.animations.add('cCollapse', Phaser.Animation.generateFrameNames('CCollapse', 1, 11), 10, true);
	this.animations.add('pCollapse', Phaser.Animation.generateFrameNames('PCollapse', 1, 11), 10, true);
	this.animations.add('cWaterPlant', Phaser.Animation.generateFrameNames('CWater', 1, 6), 4, false);
	this.animations.add('cFeedCat', Phaser.Animation.generateFrameNames('CCatFood', 1, 5), 5, false);
	this.animations.add('cTakeShower', Phaser.Animation.generateFrameNames('CShower', 1, 3), 5, false);
	this.animations.add('pWaterPlant', Phaser.Animation.generateFrameNames('PWater', 1, 6), 1, false);
	this.animations.add('pFeedCat', Phaser.Animation.generateFrameNames('PCatFood', 1, 5), 5, false);
	this.animations.add('pTakeShower', Phaser.Animation.generateFrameNames('PShower', 1, 3), 5, false);
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
		this.body.setSize(80, 230, 0, 0);

		if(closetUsed == true){
			if (animSpeed < 5) {
				this.animations.play('pCollapse');
			} else {
				this.animations.play('pWalk');
			}
		}else {
			if (animSpeed < 5) {
				this.animations.play('cCollapse');
			} else {
				this.animations.play('cWalk');
			}
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
		this.body.setSize(80, 230, 0, 0);
		
		if(closetUsed == true){
			if (animSpeed < 5) {
				this.animations.play('pCollapse');
			} else {
				this.animations.play('pWalk');
			}
		}else {
			if (animSpeed < 5) {
				this.animations.play('cCollapse');
			} else {
				this.animations.play('cWalk');
			}
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
		if(closetUsed == true){
			this.animations.play('pIdle');
		}else {
			this.animations.play('cIdle');
		}
		this.body.velocity.x = 0;
		this.body.setSize(50, 200, 0, 0);
	}

	// game.physics.arcade.overlap(player, plant, plantAnimation, null, this);
}

// function plantAnimation (player, plant) {
//     if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && plantDead == false){
//     	this.animations.play('cWaterPlant');
//     }
//}

