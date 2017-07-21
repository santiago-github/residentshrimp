/* global game phaser game_state */
game_state.StartScreen = function() {};

game_state.StartScreen.prototype = {

    preload: function() {

        this.cursors = game.input.keyboard.createCursorKeys();
        game.load.spritesheet('background', 'assets/background.png', 800, 600);
        game.load.image('gamelogo', 'assets/gamelogo.png', 210, 14);
        game.load.image('flameflakme', 'assets/flameflame.png', 210, 14);
        game.load.image('title', 'assets/title.png', 840, 840);
        game.load.image('play', 'assets/play.png', 142, 142);
        game.load.image('copyright', 'assets/copyright.png', 142, 142);
    },

    create: function() {
        var background;
        var button;

        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.set(0.5);
        background.smoothed = false;

        background.animations.add('walk');
        background.animations.play('walk', 15, true);

        button = game.add.button(345, 240, 'play', actionOnClick, this);
        button.onInputUp.add(up, this);

        function actionOnClick() {

            game.state.start('main');
        }

        function up() {
            console.log('button up', arguments);
        }

        game.add.image(590, 585, 'gamelogo');
        game.add.image(673, 570, 'copyright');
        game.add.sprite(240, 0, 'title');
    },

    update: function() {},
};

game.state.add('StartScreen', game_state.StartScreen);
game.state.start('StartScreen');