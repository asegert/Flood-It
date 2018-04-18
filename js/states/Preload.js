var Flood = Flood || {};

Flood.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        //Colour Assets
        
        //Bee
        this.load.image('redBee', 'assets/images/Red/Flood_redBee.png');
        //Initial Flood Comb
        this.load.image('red', 'assets/images/Red/Flood_red.png');
        //Flooded Comb
        this.load.image('redFloodie', 'assets/images/Red/Flood_red_floodie.png');
        //Honey Floodie
        this.load.image('redFilledFloodie', 'assets/images/Red/Flood_bug_floodie.png');
        //End BG
        this.load.image('bgBug', 'assets/images/Red/Flood_bugGameBG.png');
        //Honey Jar
        this.load.image('redHoneyJar', 'assets/images/Red/Flood_redJar.png');
        
        //Bee
        this.load.image('orangeBee', 'assets/images/Orange/Flood_orangeBee.png');
        //Initial Flood Comb
        this.load.image('orange', 'assets/images/Orange/Flood_orange.png');
        //Flooded Comb
        this.load.image('orangeFloodie', 'assets/images/Orange/Flood_orange_floodie.png');
        //Honey Floodie
        this.load.image('orangeFilledFloodie', 'assets/images/Orange/Flood_fire_floodie.png');
        //End BG
        this.load.image('bgFire', 'assets/images/Orange/Flood_fireBG.png');
        //Honey Jar
        this.load.image('orangeHoneyJar', 'assets/images/Orange/Flood_orangeJar.png');
        
        //Bee
        this.load.image('yellowBee', 'assets/images/Yellow/Flood_yellowBee.png');
        //Initial Flood Comb
        this.load.image('yellow', 'assets/images/Yellow/Flood_yellow.png');
        //Flooded Comb
        this.load.image('yellowFloodie', 'assets/images/Yellow/Flood_yellow_floodie.png');
        //Honey Floodie
        this.load.image('yellowFilledFloodie', 'assets/images/Yellow/Flood_honey_floodie.png');
        //End BG same as main
        //Honey Jar
        this.load.image('yellowHoneyJar', 'assets/images/Yellow/Flood_yellowJar.png');
        
        //Bee
        this.load.image('greenBee', 'assets/images/Green/Flood_greenBee.png');
        //Initial Flood Comb
        this.load.image('green', 'assets/images/Green/Flood_green.png');
        //Flooded Comb
        this.load.image('greenFloodie', 'assets/images/Green/Flood_green_floodie.png');
        //Honey Floodie
        this.load.image('greenFilledFloodie', 'assets/images/Green/Flood_lucky_floodie.png');
        //End BG
        this.load.image('bgLucky', 'assets/images/Green/Flood_luckyGameBG.png');
        //Honey Jar
        this.load.image('greenHoneyJar', 'assets/images/Green/Flood_greenJar.png');
        
        //Bee
        this.load.image('blueBee', 'assets/images/Blue/Flood_blueBee.png');
        //Initial Flood Comb
        this.load.image('blue', 'assets/images/Blue/Flood_blue.png');
        //Flooded Comb
        this.load.image('blueFloodie', 'assets/images/Blue/Flood_blue_floodie.png');
        //Honey Floodie
        this.load.image('blueFilledFloodie', 'assets/images/Blue/Flood_rain_floodie.png');
        //End BG
        this.load.image('bgRain', 'assets/images/Blue/Flood_rainGameBG.png');
        //Honey Jar
        this.load.image('blueHoneyJar', 'assets/images/Blue/Flood_blueJar.png');
        
        //Bee
        this.load.image('purpleBee', 'assets/images/Purple/Flood_purpleBee.png');
        //Initial Flood Comb
        this.load.image('purple', 'assets/images/Purple/Flood_purple.png');
        //Flooded Comb
        this.load.image('purpleFloodie', 'assets/images/Purple/Flood_purple_floodie.png');
        //Honey Floodie
        this.load.image('purpleFilledFloodie', 'assets/images/Purple/Flood_thunder_floodie.png');
        //End BG
        this.load.image('bgThunder', 'assets/images/Purple/Flood_thunderGameBG.png');
        //Honey Jar
        this.load.image('purpleHoneyJar', 'assets/images/Purple/Flood_purpleJar.png');
        
        //Bee
        this.load.image('pinkBee', 'assets/images/Pink/Flood_pinkBee.png');
        //Initial Flood Comb
        this.load.image('pink', 'assets/images/Pink/Flood_pink.png');
        //Flooded Comb
        this.load.image('pinkFloodie', 'assets/images/Pink/Flood_pink_floodie.png');
        //Honey Floodie
        this.load.image('pinkFilledFloodie', 'assets/images/Pink/Flood_rose_floodie.png');
        //End BG
        this.load.image('bgRose', 'assets/images/Pink/Flood_roseGameBG.png');
        //Honey Jar
        this.load.image('pinkHoneyJar', 'assets/images/Pink/Flood_pinkJar.png');
        
        //Bee
        this.load.image('brownBee', 'assets/images/Brown/Flood_brownBee.png');
        //Initial Flood Comb
        this.load.image('brown', 'assets/images/Brown/Flood_brown.png');
        //Flooded Comb
        this.load.image('brownFloodie', 'assets/images/Brown/Flood_brown_floodie.png');
        //Honey Floodie
        this.load.image('brownFilledFloodie', 'assets/images/Brown/Flood_bear_floodie.png');
        //End BG same as main
        //Honey Jar
        this.load.image('brownHoneyJar', 'assets/images/Brown/Flood_brownJar.png');
        
        //Bee
        this.load.image('whiteBee', 'assets/images/White/Flood_whiteBee.png');
        //Initial Flood Comb
        this.load.image('white', 'assets/images/White/Flood_white.png');
        //Flooded Comb
        this.load.image('whiteFloodie', 'assets/images/White/Flood_white_floodie.png');
        //Honey Floodie
        this.load.image('whiteFilledFloodie', 'assets/images/White/Flood_ice_floodie.png');
        //End BG same as blue
        //Honey Jar
        this.load.image('whiteHoneyJar', 'assets/images/White/Flood_whiteJar.png');
        
        //Bee
        this.load.image('blackBee', 'assets/images/Black/Flood_blackBee.png');
        //Initial Flood Comb
        this.load.image('black', 'assets/images/Black/Flood_black.png');
        //Flooded Comb
        this.load.image('blackFloodie', 'assets/images/Black/Flood_black_floodie.png');
        //Honey Floodie
        this.load.image('blackFilledFloodie', 'assets/images/Black/Flood_night_floodie.png');
        //End BG
        this.load.image('bgNight', 'assets/images/Black/Flood_nightGameBG.png');
        //Honey Jar
        this.load.image('blackHoneyJar', 'assets/images/Black/Flood_blackJar.png');
        
        
        
        this.load.image('main', 'assets/images/Flood_main.png');
        this.load.image('bg', 'assets/images/Flood_gameBG.png');
        this.load.image('bgStory', 'assets/images/Flood_bg.png');
        this.load.image('ins', 'assets/images/Flood_ins.png');
        this.load.image('start', 'assets/images/Flood_start.png');
        this.load.image('end', 'assets/images/Flood_bg.png');
        this.load.image('arrow', 'assets/images/Flood_arrow.png');
        this.load.image('hint', 'assets/images/hint.png');
        this.load.image('hint2', 'assets/images/Flood_hint2.png');
        this.load.image('coupon', 'assets/images/Flood_coupon.jpg');
        this.load.spritesheet('flyBee', 'assets/images/Flood_flyBee.png', 202, 204, 5);
        
        this.load.spritesheet('beekeeper', 'assets/images/Flood_BeekeeperSprite.png', 548, 610, 5);
        
        this.load.text('floodData', 'assets/data/floodData.json');
    },
    create: function ()
    {
        this.state.start('Story');
    }
    /*
    JSON:
    
    Rounds->
            An array of round Objects
                Board: Array holding the colour strings for the board (manual board)
                BoardX: The number of rows on the board
                BoardY: The number of columns on the board
                startX: The x index of the starting point
                startY: The y index of the starting point
                TileWidth: The width of each comb, used for scaling boards that are too large
                TileHeight: The height of each comb, used for scaling boards that are too large
                colourArray: An array of all the colours used in order
                honeyArray: An array of all the 'honey types' used to display the honey text at the end, same order as the colour array
                filledBG: An array of the backgrounds that are used for the winning filled comb display, same order as the colour array
                Random: A boolean indicating whether or not to use the board array for the board as created here (true), or to use the column number (BoardY) and row number (BoardX) to create a random board of those dimensions filled with random colours (false)
    Tutorial->
            An array of round Objects only one object should be present for one tutorial
                Board: Array holding the colour strings for the board (manual board)
                BoardX: The number of rows on the board
                BoardY: The number of columns on the board
                startX: The x index of the starting point
                startY: The y index of the starting point
                TileWidth: The width of each comb, used for scaling boards that are too large
                TileHeight: The height of each comb, used for scaling boards that are too large
                arrow: An array of colours that the arrow should point to indicating a move to be made
                arrowLanding: An array of indices which correspond to the arrows as to where the bee will go. As the tutorial is designed to move step by step hardcoding this allows for faster computing.
                switchers: A 2D array of indices per arrow. This indicates which board pieces now become part of the flood. As the tutorial is designed to move step by step hardcoding this allows for faster computing.
                colourArray: An array of all the colours used in order
                filledBG: An array of the backgrounds that are used for the winning filled comb display, same order as the colour array
                Random: A boolean indicating whether or not to use the board array for the board as created here (true), or to use the column number (BoardY) and row number (BoardX) to create a random board of those dimensions filled with random colours (false). Although it is present it should not be used as much of the tutorial is designed to be hardcoded, that said if there is a desire to randomize this the general structure still exists to do so.
    */
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/