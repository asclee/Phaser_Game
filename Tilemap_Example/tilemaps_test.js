var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {

    game.load.tilemap('tilemap', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tileArtTransparent.png');

}

var map;
var layer;
var framelayer;

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('tilemap');

    map.addTilesetImage('tileArtTransparent', 'tiles');
    
    framelayer = map.createLayer('framelayer');
    
    framelayer.resizeWorld();


}

function update() {


}