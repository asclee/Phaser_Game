var player;
var platforms;
var h1 = 300;//heights of ledges
var h2 = 350;
var wormHole;
var cursors;
var deathZone;
var stars;
var score = 0;
var scoreText;
var scoreString;

var lives;
var livesText;
var livesString;

var playState = {
    preload: function () {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('pink', 'assets/pink.png');
        game.load.image('lava', 'assets/lava.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    
    create: function () {
        game.world.setBounds(0, 0, 1500, 600);    

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // A simple background
        game.add.sprite(0, 0, 'sky');

        //  the platforms group contains the ground and the 2 ledges
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Ledges
        var ledge = platforms.create(400, h1, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, h2, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(1100, game.world.height - 64, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1,2);

        // Death Zone
        deathZone = game.add.group();
        deathZone.enableBody = true;
        lava = deathZone.create(800, game.world.height - 32, 'lava');
        lava.scale.setTo(.47,.1);

        // WORM HOLE
        wormHole = game.add.group();
        wormHole.enableBody = true;
        hole = wormHole.create(-150, h2+30, 'pink');
        hole.scale.setTo(1, 3.5);

        hole2 = wormHole.create(400, h1+30, 'pink');
        hole2.scale.setTo(1, 3.5);


        // The player and its settings
        player = game.add.sprite(232, game.world.height - 150, 'dude');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;



        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //game.camera.fallow(player);

        //  Finally some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        score= 0;
        scoreString = 'Score : ';
        scoreText = game.add.text(16, 16, scoreString + score, { fontSize: '32px', fill: '#000' });

        //lives
        lives = 3;
        livesString = 'Lives : '
        livesText = game.add.text(300,16, livesString + lives, { fontSize: '32px', fill: '#000'});
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(player);
    },
    
    update: function() {
        
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);

        //  Checks if the player overlaps with any of the stars, call collectStar function
        game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if(game.physics.arcade.overlap(player, lava))
        {
            if(lives<1){
            this.gameOver(score);
            }
            else{ this.lifeLost(player); }
        }

        if(game.physics.arcade.overlap(player, wormHole))
        {
            this.flipgravity(player, wormHole);
        }
        else{
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
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }
    },
    
flipgravity: function(player, wormHole) {
    
    player.body.gravity.y = -300;
    //player.body.velocity.y = -300;
    player.angle = 180;
    
    if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('right');

        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('left');
        }

        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
    
    if (cursors.up.isDown)// && player.body.touching.down)// && hitPlatform)
    {
        player.body.velocity.y = 350;
    }
    
}, // end of fliped gravity

collectStar: function(player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

},

lifeLost: function(player) {

    player.position.x = 300;
    player.position.y = game.world.height - 100;
    lives -= 1;
    livesText.text = 'Lives: ' + lives;
    
},
    
gameOver: function(score) {

    var gameOverText = game.add.text(600,200, 'GAME OVER', { fontSize: '48px', fill: '#999'});
    player.kill();
}
    
};