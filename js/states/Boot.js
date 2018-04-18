var Flood = Flood || {};

Flood.BootState = {
	preload: function(){
		this.stage.backgroundColor = '#ffffff';
		this.load.image('loading-background', 'assets/images/Flood_loading-background.png');
		this.load.image('loading-progress', 'assets/images/Flood_loading-progress.png');
        
        this.game.plugin=this.game.plugins.add(Phaser.Plugin.InvertPlugin);
	},
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false); //Forces scaling to be horizontal - landscape
        
        
        Flood.game.plugin.setOrientation("Landscape");    
        Flood.game.plugin.invert(Flood.game.world);
        
        window.addEventListener("orientationchange", function() {
	       // Announce the new orientation number
	       //alert(screen.orientation);
            Flood.game.plugin.invert(Flood.game.world);
        }, false);
        
        
		this.state.start('Preload');
	}
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/