Phaser.Plugin.InvertPlugin = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);
};

Phaser.Plugin.InvertPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.InvertPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.InvertPlugin.prototype.invert = function (object) {
    console.log(screen.orientation);
    let screenOrient = screen.orientation;
    
    console.log(object);
    if(object.og===undefined)
    {
        object.og=[object.width, object.height, object.rotation];
    }
    
    if(screenOrient.angle === 0)
    {
        let t1 = object.width;
        let t2 = object.height;
        object.game.scale.setGameSize(t2, t1);
        object.pivot.x=0;
        object.pivot.y=t2;
        object.rotation = 89.53 + object.og[2];
    }
    else if(screenOrient.angle === -90)
    {
        object.game.scale.setGameSize(object.og[0], object.og[1]);
        object.pivot.x=object.og[0];
        object.pivot.y=object.og[1];
        object.rotation = 185.355;
    }
    else
    {
        object.game.scale.setGameSize(object.og[0], object.og[1]);
        object.pivot.x=0;
        object.pivot.y=0;
        object.rotation = object.og[2];
    }

    Phaser.ScaleManager.refresh;
};
