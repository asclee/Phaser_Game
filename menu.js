var menuState = {
    create: function () {   
        var nameLabel = game.add.text(80, 80, "MC Escher-inspired platformer", {font: '50px Arial', fill: '#ffffff'});
        
        var startLabel = game.add.text(80, game.world.height - 80, "press S key to start", {font: '25px Arial', fill: '#ffffff'});
        
        var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

        sKey.onDown.addOnce(this.start, this);
    },
    
    start: function () {
        game.state.start('play');
    }
};