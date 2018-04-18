var Flood = Flood || {};

Flood.StoryState = {
    create: function ()
    {
        //Main background with title
        this.background = this.add.sprite(0, 0, 'main');
        //Button to proceed
        let start = this.add.button(550, 500, 'start', function()
        {
            //Check if the second screen needs to load
            if(this.background != null)
            {
                //Add a new background and instructions
                this.add.sprite(0, 0, 'bgStory');
                this.add.sprite(0, 100, 'ins');
                //Remove the background so you can proceed to the game
                this.background.destroy();
                this.background=null;
                //Bring the start button back up to the top
                this.world.bringToTop(start);
            }
            else
            {
                //Set the current round and start the game tutorial
                Flood.currentRound = 0;
                this.game.state.start('Tutorial');
            }
        }, this);
        start.scale.setTo(0.9, 0.9);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/