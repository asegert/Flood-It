var Flood = Flood || {};

Flood.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('black', 'assets/images/Flood_black.png');
        this.load.image('white', 'assets/images/Flood_white.png');
        this.load.image('brown', 'assets/images/Flood_brown.png');
        this.load.image('pink', 'assets/images/Flood_pink.png');
        this.load.image('red', 'assets/images/Flood_red.png');
        this.load.image('orange', 'assets/images/Flood_orange.png');
        this.load.image('yellow', 'assets/images/Flood_yellow.png');
        this.load.image('green', 'assets/images/Flood_green.png');
        this.load.image('blue', 'assets/images/Flood_blue.png');
        this.load.image('purple', 'assets/images/Flood_purple.png');
        //Bees
        this.load.image('blackBee', 'assets/images/Flood_blackBee.png');
        this.load.image('whiteBee', 'assets/images/Flood_whiteBee.png');
        this.load.image('brownBee', 'assets/images/Flood_brownBee.png');
        this.load.image('pinkBee', 'assets/images/Flood_pinkBee.png');
        this.load.image('redBee', 'assets/images/Flood_redBee.png');
        this.load.image('orangeBee', 'assets/images/Flood_orangeBee.png');
        this.load.image('yellowBee', 'assets/images/Flood_yellowBee.png');
        this.load.image('greenBee', 'assets/images/Flood_greenBee.png');
        this.load.image('blueBee', 'assets/images/Flood_blueBee.png');
        this.load.image('purpleBee', 'assets/images/Flood_purpleBee.png');
        
        this.load.text('floodData', 'assets/data/floodData.json');
    },
    create: function ()
    {
        this.state.start('Story');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/