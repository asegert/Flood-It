var Flood = Flood || {};

Flood.BootState = {
	preload: function(){
		this.stage.backgroundColor = '#ffffff';
		this.load.image('loading-background', 'assets/images/Flood_loading-background.png');
		this.load.image('loading-progress', 'assets/images/Flood_loading-progress.png');
        //Runs the plugin for forced mobile scaling
        this.game.plugin=this.game.plugins.add(Phaser.Plugin.InvertPlugin);
	},
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        
        //Runs plugin to force mobile scaling - set to landscape
        Flood.game.plugin.setOrientation("Landscape");    
        Flood.game.plugin.invert(Flood.game.world);
        window.addEventListener("orientationchange", function() {
            Flood.game.plugin.invert(Flood.game.world);
        }, false);
        
        
		this.state.start('Preload');
	}
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/