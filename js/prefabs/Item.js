//Sets up items
var Flood = Flood || {};


Flood.Item = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Flood.Item.prototype.init = function(data)
     {
         this.sprite = this.createSprite(data[0], data[1], data[2]);
         this.endSprite = this.createSprite(data[0], data[1], null);
         this.sprite.item = this;
         this.texture = data[2];
         this.x = data[3];
         this.y = data[4];
         this.group = 'floodie';
         return this;
     };
     Flood.Item.prototype.createSprite = function(x, y, texture)
     {
        return this.state.add.sprite(x, y, texture);
     };
     Flood.Item.prototype.reColour = function(type)
     {
         if(this.sprite!=undefined)
         {
             if(type === 'texture')
             {
                 this.texture = this.state.currentColour;
             }
             else
             {
                 this.sprite.loadTexture(`${this.state.currentColour}Floodie`);
             }
         }
     };
    Flood.Item.prototype.endCombs = function(tex)
    {
        this.endSprite.loadTexture(tex);
    };
    Flood.Item.prototype.switchGroup = function(group, item)
    {
        item.group = group;
        if(group === "floodies")
        {
            Flood.GameState.floodies.add(item.sprite);
        }
        else if (group === "flood")
        {
            console.log('flooded');
            Flood.GameState.flood.add(item.sprite);
            console.log(Flood.GameState.flood);
        }
    };
}