// Prefab Player
// Inherits Phaser.Sprite

var speed;
var animSpeed;
function Player(game, key, frame) {
	Phaser.Sprite.call(this, game, 50, game.world.height - 23, key, frame);
	this.frameName = 'CWalk1';
	game.physics.arcade.enable(this);
	speed = 300;
	animSpeed = 35;
	var doNothing = true;
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
	this.animations.add('cWaterPlant', Phaser.Animation.generateFrameNames('CWater', 1, 6), 1, false);
	this.animations.add('cFeedCat', Phaser.Animation.generateFrameNames('CCatFood', 1, 5), 5, false);
	this.animations.add('cTakeShower', Phaser.Animation.generateFrameNames('CShower', 1, 3), 5, false);
	this.animations.add('pWaterPlant', Phaser.Animation.generateFrameNames('PWater', 1, 6), 1, false);
	this.animations.add('pFeedCat', Phaser.Animation.generateFrameNames('PCatFood', 1, 5), 5, false);
	this.animations.add('pTakeShower', Phaser.Animation.generateFrameNames('PShower', 1, 3), 5, false);
}

// Prefab prototype
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Update
Player.prototype.update = function() {

	if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		this.doNothing = false;
		if (speed < 0) {
			speed *= -1;
		}

		this.scale.x = 1;
		this.body.velocity.x = speed;
		this.body.setSize(80, 230, 0, 0);

		if(closetUsed == true){
			this.animations.play('pWalk');
		}else {
			this.animations.play('cWalk');
		};

		this.animations.currentAnim.speed = animSpeed;
		animSpeed *= 0.99945;
		speed *= 0.99945;
		//console.log(this.animations.currentAnim.speed);
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		this.doNothing = false;
		if (speed > 0) {
			speed *= -1;
		}

		this.scale.x = -1;
		this.body.velocity.x = speed;
		this.body.setSize(80, 230, 0, 0);
		
		if(closetUsed == true){
			this.animations.play('pWalk');
		}else {
			this.animations.play('cWalk');
		};

		this.animations.currentAnim.speed = animSpeed;

		animSpeed *= 0.99945;
		speed *= 0.99945;
		//console.log(this.animations.currentAnim.speed);
	} else {
		this.doNothing = true;
	}

	//console.log("We are not doing anything before we idle: " + this.doNothing);
	if(this.doNothing == true){
		if(closetUsed == true){
			this.animations.play('pIdle');
		}else {
			this.animations.play('cIdle');
		};
		this.body.velocity.x = 0;
		this.body.setSize(50, 200, 0, 0);
		this.frame = this.frame;
	}


	if (game.physics.arcade.overlap(player, plant)){
        if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && plantDead == false){
        	this.doNothing = false;
        	console.log("We are not doing anything when we press enter: " + this.doNothing);
        	this.animations.play('cWaterPlant', 2, true);
        }
        this.doNothing = true;
        console.log("We are not doing anything when the animation is over: " + this.doNothing);
    }
}

