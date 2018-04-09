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
        
        this.load.image('blackFloodie', 'assets/images/Flood_black_floodie.png');
        this.load.image('whiteFloodie', 'assets/images/Flood_white_floodie.png');
        this.load.image('brownFloodie', 'assets/images/Flood_brown_floodie.png');
        this.load.image('pinkFloodie', 'assets/images/Flood_pink_floodie.png');
        this.load.image('redFloodie', 'assets/images/Flood_red_floodie.png');
        this.load.image('orangeFloodie', 'assets/images/Flood_orange_floodie.png');
        this.load.image('yellowFloodie', 'assets/images/Flood_yellow_floodie.png');
        this.load.image('greenFloodie', 'assets/images/Flood_green_floodie.png');
        this.load.image('blueFloodie', 'assets/images/Flood_blue_floodie.png');
        this.load.image('purpleFloodie', 'assets/images/Flood_purple_floodie.png');
        
        this.load.image('iceFloodie', 'assets/images/Flood_ice_floodie.png');
        this.load.image('honeyFloodie', 'assets/images/Flood_honey_floodie.png');
        this.load.image('rainFloodie', 'assets/images/Flood_rain_floodie.png');
        this.load.image('fireFloodie', 'assets/images/Flood_fire_floodie.png');
        this.load.image('bearFloodie', 'assets/images/Flood_bear_floodie.png');
        this.load.image('thunderFloodie', 'assets/images/Flood_thunder_floodie.png');
        this.load.image('roseFloodie', 'assets/images/Flood_rose_floodie.png');
        this.load.image('luckyFloodie', 'assets/images/Flood_lucky_floodie.png');
        this.load.image('bugFloodie', 'assets/images/Flood_bug_floodie.png');
        this.load.image('nightFloodie', 'assets/images/Flood_night_floodie.png');
        
        this.load.image('bgFire', 'assets/images/Flood_fireBG.png');
        this.load.image('bgBug', 'assets/images/Flood_bugGameBG.png');
        this.load.image('bgLucky', 'assets/images/Flood_luckyGameBG.png');
        this.load.image('bgNight', 'assets/images/Flood_nightGameBG.png');
        this.load.image('bgRain', 'assets/images/Flood_rainGameBG.png');
        this.load.image('bgRose', 'assets/images/Flood_roseGameBG.png');
        this.load.image('bgThunder', 'assets/images/Flood_thunderGameBG.png');
        
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
        
        this.load.image('main', 'assets/images/Flood_main.png');
        this.load.image('bg', 'assets/images/Flood_gameBG.png');
        this.load.image('start', 'assets/images/Flood_start.png');
        
        this.load.spritesheet('beekeeper', 'assets/images/Flood_BeekeeperSprite.png', 548, 610, 5);
        
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