Phaser.Plugin.InvertPlugin = function (game, parent) {
	//Initialize the plugin to the game
    Phaser.Plugin.call(this, game, parent);
    //Set default orientation based on world dimensions-smart orientation
    if(game.world._width < game.world._height)
    {
        Phaser.Plugin.Orient = "Portrait";
    }
    else
    {
        Phaser.Plugin.Orient = "Landscape";
    }
};

Phaser.Plugin.InvertPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.InvertPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.InvertPlugin.prototype.invert = function (object) {
    //Stops the plugin from running if the device is a desktop
    if(!Phaser.Device.desktop)
    {
        //Stores the screen orientation
        let screenOrient = screen.orientation;
        //If the object (world) does not have it's original values (the ones coded by the programmer) stored do so
        if(object.og===undefined)
        {
            object.og=[object.width, object.height, object.rotation];
        }
        //Check the screen orientation 0=portrait 90,-90= Landscape left, right
        if(screenOrient.angle === 0)
        {
            //Check if portrait or landscape is being forced and change values accordingly
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
            //Check if portrait or landscape is being forced and change values accordingly
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
            //Check if portrait or landscape is being forced and change values accordingly
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
        //Refresh the scale
        Phaser.ScaleManager.refresh;
    }
};
Phaser.Plugin.InvertPlugin.prototype.setOrientation = function (orient) {
    //Set the orientation
    Phaser.Plugin.Orient = orient;
};