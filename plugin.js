Phaser.Plugin.InvertPlugin = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);
};

Phaser.Plugin.InvertPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.InvertPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.InvertPlugin.prototype.invert = function (object) {
    
    console.log(object);
    if(object.children[0]!=undefined)
    {
        object.children.forEach(function(child)
        {
            if(child.horizontal === undefined)
            {
                this.calculateInvert(child);
            }
            if(child.angle === child.horizontal[0])
            {
                child.angle   = child.vertical[0];
                child.x       = child.vertical[1];
                child.y       = child.vertical[2];
                child.scale.x = child.vertical[3];
                child.scale.y = child.vertical[4];
            }
            else
            {
                child.angle   = child.horizontal[0];
                child.x       = child.horizontal[1];
                child.y       = child.horizontal[2];
                child.scale.x = child.horizontal[3];
                child.scale.y = child.horizontal[4];
            }
        }, this);
    }
    Phaser.ScaleManager.refresh;
    console.log(Phaser.TweenManager);
};
Phaser.Plugin.InvertPlugin.prototype.calculateInvert = function (item) {
    
    console.log(item);
    
    item.horizontal = [0, item.x, item.y, item.scale.x, item.scale.y];
    item.vertical = [90, (960-(960 * (item.y/640))), (640 * (item.x/960)), (item.scale.x-0.35), (item.scale.y+0.5)];
};
