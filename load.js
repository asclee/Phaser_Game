var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, "loading....", {font: '30px Courier', fill: '#ffffff'});
        
        //game.load.image('mario', 'assets/mario.jpg');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('pink', 'assets/pink.png');
        game.load.image('lava', 'assets/lava.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.tilemap('tilemap', 'assets/tileMapLevel0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tilesColoredBG', 'assets/simples_pimples.png');
        game.load.image('tilesTransparent', 'assets/tileArtTransparent.png');
    },
    
    create: function() {
        game.state.start('menu');
        //game.add.sprite(0, 0, 'mario');
    }
};