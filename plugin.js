Phaser.Plugin.InvertPlugin = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);
    Phaser.Plugin.Orient = "Landscape"; //Default
};

Phaser.Plugin.InvertPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.InvertPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.InvertPlugin.prototype.invert = function (object) {
    console.log(screen.orientation);
    let screenOrient = screen.orientation;
    
    console.log(object);
    console.log(Phaser.Plugin.Orient);
    if(object.og===undefined)
    {
        object.og=[object.width, object.height, object.rotation];
    }
    
    if(screenOrient.angle === 0)
    {
        if(Phaser.Plugin.Orient === "Portrait")
        {
            //Portrait
            object.game.scale.setGameSize(object.og[0], object.og[1]);
            object.pivot.x=0;
            object.pivot.y=0;
            object.rotation = object.og[2];
        }
        else
        {
            //Landscape
            let t1 = object.width;
            let t2 = object.height;
            object.game.scale.setGameSize(t2, t1);
            object.pivot.x=0;
            object.pivot.y=t2;
            object.rotation = 89.535 + object.og[2];
        }
    }
    else if(screenOrient.angle === -90)
    {
        if(Phaser.Plugin.Orient === "Portrait")
        {
            //Portrait
            let t1 = object.width;
            let t2 = object.height;
            object.game.scale.setGameSize(t2, t1);
            object.pivot.x=t1;
            object.pivot.y=0;
            object.rotation = -89.535 + object.og[2];
        }
        else
        {
            //Landscape
            object.game.scale.setGameSize(object.og[0], object.og[1]);
            object.pivot.x=object.og[0];
            object.pivot.y=object.og[1];
            object.rotation = 185.355 + object.og[2];
        }
    }
    else
    {
        if(Phaser.Plugin.Orient === "Portrait")
        {
            //Portrait
            let t1 = object.width;
            let t2 = object.height;
            object.game.scale.setGameSize(t2, t1);
            object.pivot.x=0;
            object.pivot.y=t2;
            object.rotation = 89.535 + object.og[2];
        }
        else
        {
            //Landscape
            object.game.scale.setGameSize(object.og[0], object.og[1]);
            object.pivot.x=0;
            object.pivot.y=0;
            object.rotation = object.og[2];
        }
    }

    Phaser.ScaleManager.refresh;
};
Phaser.Plugin.InvertPlugin.prototype.setOrientation = function (orient) {
    Phaser.Plugin.Orient = orient;
};