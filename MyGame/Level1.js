/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

	preload: function() {
		game.load.image('background', 'assets/room1.png');
		game.load.image('ground', 'assets/platform.png');
		game.load.image('flamethrower', 'assets/flamethrower.png');
		game.load.spritesheet('player', 'assets/walking.png', 192, 192);
		game.load.image('text1', 'assets/text1.png');
		game.load.image('text2', 'assets/text2.png');
		game.load.image('text3', 'assets/text3.png');
		game.load.image('text4', 'assets/text4.png');
		game.load.image('arrow', 'assets/arrow.png');
		game.load.image('pressf', 'assets/pressf');
		game.load.spritesheet('makimono', 'assets/makimono.png', 128, 128);
		game.load.spritesheet('flameflame', 'assets/flameflame.png', 192, 192);
		game.load.spritesheet('smoke', 'assets/smoke.png', 192, 192);
	},

	create: function() {

		this.carrying = "none";
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.tileSprite(0, 0, 2110, 600, 'background');
		this.cursors = game.input.keyboard.createCursorKeys();
		this.fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);

		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		
		var ground = this.platforms.create(0, game.world.height - 370, 'ground');
		ground.scale.setTo(5, 1);
		ground.body.immovable = true;
		ground.body.setSize(12000, 20, 0, 318);

		var storyTxt1 = game.add.sprite(410, 440, 'text1');
		storyTxt1.anchor.setTo(0.5, 0.5);
		storyTxt1.alpha = 0;
		game.add.tween(storyTxt1).to({
			alpha: 1
		}, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		storyTxt1.scale.setTo(0.5, 0.5);

		game.add.sprite(600, 180, 'arrow');
		game.world.setBounds(0, 0, 2110, 600);

		var storyTxt2 = game.add.sprite(1100, 440, 'text2');
		storyTxt2.anchor.setTo(0.5, 0.5);
		storyTxt2.alpha = 0;
		game.add.tween(storyTxt2).to({
			alpha: 1
		}, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		storyTxt2.scale.setTo(0.5, 0.5);

		var storyTxt3 = game.add.sprite(1760, 300, 'text3');
		storyTxt3.anchor.setTo(0.5, 0.5);
		storyTxt3.alpha = 0;
		game.add.tween(storyTxt3).to({
			alpha: 9
		}, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		storyTxt3.scale.setTo(1.2, 1.2);
		
		var storyTxt4 = game.add.sprite(1760, 350, 'text4');
		storyTxt4.anchor.setTo(0.5, 0.5);
		storyTxt4.alpha = 0 ;
		game.add.tween(storyTxt4).to({
			alpha:	1
		}, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		storyTxt4.scale.setTo(1.2, 1.2);
		
		this.flamethrower = game.add.sprite(1150, 100, 'flamethrower');
		game.physics.arcade.enable(this.flamethrower);
		this.flamethrower.body.gravity.y = 1000;
		this.flamethrower.body.collideWorldBounds = true;
		this.flamethrower.body.setSize(65, 80, 143, 140);

		this.makimonos = game.add.group();
		this.makimono = this.makimonos.create(1900, 300, 'makimono');
		this.makimono.life = 50;
		game.physics.arcade.enable(this.makimono);

		this.makimono.body.bounce.y = 0.7;
		this.makimono.body.gravity.y = 1000;
		this.makimono.body.collideWorldBounds = true;
		this.makimono.body.setSize(62, 120, 31, 8);
		this.makimono.animations.add('makimonoing', [0, 1, 2, 3, 4, 5], 10, true);

		this.player = game.add.sprite(200, 10, 'player');
		game.physics.arcade.enable(this.player);
		game.camera.follow(this.player);

		game.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0.65;
		this.player.body.gravity.y = 1000;
		this.player.body.setSize(55, 143, 60, 24);
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('leftflame', [8, 9], 10, true);
		this.player.animations.add('rightflame', [6, 7], 10, true);
		this.player.animations.add('stopflame', [5], 10, true);
		this.player.animations.add('leftnone', [3, 4], 10, true);
		this.player.animations.add('rightnone', [1, 2], 10, true);
		this.player.animations.add('stopnone', [0], 10, true);

		this.flameflame = game.add.sprite(this.player.body.x, this.player.body.y, 'flameflame');
		game.physics.arcade.enable(this.flameflame);
		this.flameflame.animations.add('flaming', [0, 1, 2], 10, true);
		this.flameflame.body.setSize(60, 100, 30, 20);
		this.flameflame.scale.setTo(0.5, 0.5);
		this.flameflame.frame = 3;

		this.smoke = game.add.sprite(this.player.body.x, this.player.body.y, 'smoke');
		this.smoke.animations.add('smoking', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		this.smoke.frame = 9;
	},

	hitSprite: function(player, flamethrower) {

		this.carrying = "flame";
		this.flamethrower.kill();
	},

	hitDamage: function(flames, enemy) {
		enemy.life--;
		if (enemy.life <= 0) {
			enemy.kill();
			game.state.start('main2');
		}
	},

	update: function() {
		if (this.carrying === "flame") {
			if (this.fKey.isDown) {
				this.flameflame.animations.play("flaming");
				game.physics.arcade.overlap(this.flameflame, this.makimonos, this.hitDamage, null, this);
			}
			else if (this.fKey.isUp) {
				this.flameflame.frame = 3;
			}
		}

		this.makimono.animations.play("makimonoing");
		//if (this.fkey.isDown && this.flameflame.collide)

		if (this.carrying === "flame") {
			if (this.fKey.isDown) {
				this.smoke.animations.play("smoking");
			}
			else if (this.fKey.isUp) {
				this.smoke.frame = 9;
			}

			//if (this.makimomo =)

		}

		game.physics.arcade.collide(this.flamethrower, this.platforms);
		game.physics.arcade.collide(this.makimono, this.platforms);
		game.physics.arcade.overlap(this.player, this.flamethrower, this.hitSprite, null, this);

		this.makimonos.forEach(function(maki) {
			if (maki.body.touching.down) {
				maki.body.velocity.y = -300;
				if (Math.random() < 0.5) {
					maki.body.velocity.x = -40;
				}
				else {
					maki.body.velocity.x = 150;
				}

			}
		});



		this.flameflame.x = this.player.x + 120;
		this.flameflame.y = this.player.y + 70;

		this.smoke.x = this.player.x + 62;
		this.smoke.y = this.player.y - 2;

		game.physics.arcade.collide(this.player, this.platforms);
		this.player.body.velocity.x = 0;
		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -150;
			this.player.animations.play('right' + this.carrying);
		}
		else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = 150;
			this.player.animations.play('right' + this.carrying);
		}
		else {
			this.player.animations.play('stop' + this.carrying);

		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -300;
		}

		this.platforms.forEach(function(item) {

		});
	}
};
game.state.add('main', game_state.main);
