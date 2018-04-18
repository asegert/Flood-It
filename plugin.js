Phaser.Plugin.InvertPlugin = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);
};

Phaser.Plugin.InvertPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.InvertPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.InvertPlugin.prototype.invert = function (object) {
    
    console.log(object);
    /*if(object.children[0]!=undefined)
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
        }, this);*/
        let temp = object.width;
    let t2=object.height;
    object.game.scale.setGameSize(t2, temp);
    object.pivot.x=0;
    object.pivot.y=640;
    object.rotation = 89.53;
    //}
    /*console.log(object.game.tweens._tweens);
    for(let i=0, len = object.game.tweens._tweens.length; i<len; i++)
    {
        if(object.game.tweens._tweens[i].horizontal === undefined)
        {
              object.game.tweens._tweens[i].horizontal = [object.game.tweens._tweens[i].x, object.game.tweens._tweens[i].y]; 
              object.game.tweens._tweens[i].vertical = [(960-(960 * (object.game.tweens._tweens[i].y/640))), (640 * (object.game.tweens._tweens[i].x/960))];
        }
        if(object.game.tweens._tweens[i].x!= undefined && object.game.tweens._tweens[i].x===object.game.tweens._tweens[i].horizontal[0])
        {
            object.game.tweens._tweens[i].x=object.game.tweens._tweens[i].vertical[0];
        }
        else if(object.game.tweens._tweens[i].x!= undefined)
        {
            object.game.tweens._tweens[i].x=object.game.tweens._tweens[i].horizontal[0];
        }
        if(object.game.tweens._tweens[i].y!= undefined && object.game.tweens._tweens[i].y===object.game.tweens._tweens[i].horizontal[1])
        {
            object.game.tweens._tweens[i].y=object.game.tweens._tweens[i].vertical[1];
        }
        else if(object.game.tweens._tweens[i].y!= undefined)
        {
            object.game.tweens._tweens[i].y=object.game.tweens._tweens[i].horizontal[1];
        }
        console.log(object.game.tweens._tweens[i]);
    }*/
    Phaser.ScaleManager.refresh;
};
Phaser.Plugin.InvertPlugin.prototype.calculateInvert = function (item) {
    
    item.horizontal = [0, item.x, item.y, item.scale.x, item.scale.y];
    item.vertical = [90, (960-(960 * (item.y/640))), (640 * (item.x/960)), (item.scale.x-0.35), (item.scale.y+0.5)];
};
