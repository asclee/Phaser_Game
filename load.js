var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, "loading....", {font: '30px Courier', fill: '#ffffff'});
        
        game.load.image('mario', 'assets/mario.jpg');
    },
    
    create: function() {
        game.state.start('menu');
        //game.add.sprite(0, 0, 'mario');
    }
};