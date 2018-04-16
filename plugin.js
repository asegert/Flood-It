Phaser.Plugin.InvertPlugin = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);
};

Phaser.Plugin.InvertPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.InvertPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.InvertPlugin.prototype.invert = function (object) {
	
    console.log(object);
    
    object.children.forEach(function(child)
    {
        let newX = Math.floor((child.x/960) * object.height);
        let newY = Math.floor((child.y/640) * object.width);
        
        child.x = 0;//newX;
        child.y = 0;//newY;
        
        console.log(child);
    }, this);
};