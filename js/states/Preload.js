var Flood = Flood || {};

Flood.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('black', 'assets/images/black.png');
        this.load.image('white', 'assets/images/white.png');
        this.load.image('brown', 'assets/images/brown.png');
        this.load.image('pink', 'assets/images/pink.png');
        this.load.image('red', 'assets/images/red.png');
        this.load.image('orange', 'assets/images/orange.png');
        this.load.image('yellow', 'assets/images/yellow.png');
        this.load.image('green', 'assets/images/grreen.png');
        this.load.image('blue', 'assets/images/blue.png');
        this.load.image('purple', 'assets/images/purple.png');
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