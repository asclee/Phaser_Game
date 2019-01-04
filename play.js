var player;

var map;
var backgroundLayer;
var groundLayer;
var gravityLayer;

var lives;
var livesText;
var livesString;

var cursors;

var playState = {
    
    create: function () {
        //game.world.setBounds(0, 0, 800, 800);    

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // A simple background
        game.stage.backgroundColor = "#a9f0ff";
        
        // add tilemap
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('tilesTransparent', 'tileArtTransparent'); 
        backgroundLayer = map.createLayer('BackgroundLayer');
        groundLayer = map.createLayer('GroundLayer');
        gravityLayer = map.createLayer('GravityFlipLayer');
        map.setCollision(804, true, groundLayer.index, true);
        map.setCollision(706, true, groundLayer.index, true);
        //map.setCollision(451, true, gravityLayer.index, true); //FIXME
        //groundLayer.debug = true;  // FIXME
        //gravityLayer.debug = true;  // FIXME
        backgroundLayer.setScale(2,2); // note setScale() works and properly maintains the collisions
        groundLayer.setScale(2,2);
        gravityLayer.setScale(2,2);
        /*backgroundLayer.scale.set(2); // FIXME the collision doesn't work when the tilemap is scaled larger, but works when the tilemap is unscaled! also specifically it doesn't work when the tilemap is scaled with scale.set()
        groundLayer.scale.set(2);
        gravityLayer.scale.set(2);*/
        backgroundLayer.resizeWorld();
        groundLayer.resizeWorld();
        gravityLayer.resizeWorld();
        
        // Add the player and its settings
        player = game.add.sprite(130, game.world.height - 350, 'dude');
        //player = game.add.sprite(170, 250, 'dude');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        game.physics.arcade.enable(player); //enable physics on the player
        
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        //game.world.addAt(this.player, 2); //FIXME
        game.camera.follow(player);
        
        //lives
        lives = 3;
        livesString = 'Lives : '
        livesText = game.add.text(300,16, livesString + lives, { fontSize: '32px', fill: '#000'});
        
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function() {
        
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, groundLayer);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        player.angle = 0;
        player.body.gravity.y = 300;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        //if (cursors.up.isDown && player.body.touching.down && hitPlatform) // idk why this doesn't let the sprite jump
        if (cursors.up.isDown && hitPlatform) // this makes the sprite turn into spiderman lol, double jumping when it's touching the wall
        {
            player.body.velocity.y = -350;
        }
    },

lifeLost: function(player) {

    player.position.x = 300;
    player.position.y = game.world.height - 100;
    lives -= 1;
    livesText.text = 'Lives: ' + lives;
    
},
    
};