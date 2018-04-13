var Flood = Flood || {};

Flood.StoryState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'main');
        let start = this.add.button(550, 500, 'start', function()
        {
            if(this.background != null)
            {
                this.add.sprite(0, 0, 'bgStory');
                this.add.sprite(0, 100, 'ins');
                this.background.destroy();
                this.background=null;
                this.world.bringToTop(start);
            }
            else
            {
                Flood.currentRound = 0;
                this.game.state.start('Game');
            }
        }, this);
        start.scale.setTo(0.9, 0.9);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/