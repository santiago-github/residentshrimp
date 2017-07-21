/*global game_state game Phaser*/

//var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
// var game_state = {};

//game_state.main2 = function() {};
//.main2.prototype = {

	//	preload: function() {
	//		game.load.image('background', 'assets/room2.png');
	//		game.load.image('ground', 'assets/floorroom2.png');
	//		game.load.spritesheet('player', 'assets/walking.png', 192, 192);
	//	},

	//	create: function() {

	//		game.physics.startSystem(Phaser.Physics.ARCADE);
	//		game.add.tileSprite(0, 0, 2110, 600, 'background');

	//		this.cursors = game.input.keyboard.createCursorKeys();
	//		this.fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);

	//		game.world.setBounds(0, 0, 2110, 600);

	//		this.player = game.add.sprite(200, 10, 'player');
	//		game.physics.arcade.enable(this.player);
	//		game.camera.follow(this.player);

	//		this.platforms = game.add.group();
	//		this.platforms.enableBody = true;
	//
	//		var ground = this.platforms.create(0, game.world.height - 370, 'ground');

	//		ground.scale.setTo(5, 1);
	//		ground.body.immovable = true;
	//		ground.body.setSize(12000, 20, 0, 318);

	//		this.player.body.bounce.y = 0.65;
	//		this.player.body.gravity.y = 1000;
	//		this.player.body.setSize(55, 143, 60, 24);
	//		this.player.body.collideWorldBounds = true;
	//		this.player.animations.add('leftflame', [8, 9], 10, true);
	//		this.player.animations.add('rightflame', [6, 7], 10, true);
	//		this.player.animations.add('stopflame', [5], 10, true);

	//	},

	//	update: function() {

	//	},

//	},

//	game.state.add('main2', game_state.main2);