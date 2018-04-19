//Sets up items
var Flood = Flood || {};


Flood.Item = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Flood.Item.prototype.init = function(data)
     {
         //Create the comb sprite
         this.sprite = this.createSprite(data[0], data[1], data[2]);
         //Create an empty end sprite which will overlay the comb with the floodie
         this.endSprite = this.createSprite(data[0], data[1], null);
         //Track the item of the sprite from the sprite
         this.sprite.item = this;
         //Store the texture
         this.texture = data[2];
         //Store the board coordinates
         this.x = data[3];
         this.y = data[4];
         //Set the group to the default floodie
         this.group = 'floodie';
         //Return the item
         return this;
     };
     Flood.Item.prototype.createSprite = function(x, y, texture)
     {
        //Set the sprite and its rotation
        let sprite = this.state.add.sprite(x, y, texture);
        sprite.rotation= -0.045;
        //Return the sprite
        return sprite;
     };
     Flood.Item.prototype.reColour = function(type)
     {
         //If a sprite exists
         if(this.sprite!=undefined)
         {
             //If the texture is changing
             if(type === 'texture')
             {
                 //Reset the texture variable to the new colour, this does not change the sprite's colour
                 this.texture = this.state.currentColour;
             }
             else
             {
                 //If the type is anything else the new texture is loaded to the sprite
                 this.sprite.loadTexture(`${this.state.currentColour}Floodie`);
             }
         }
     };
    Flood.Item.prototype.endCombs = function(tex)
    {
        //Change the end texture to have the floodie as the texture and ensure it is scaled correctly
        this.endSprite.loadTexture(tex);
        this.endSprite.scale.setTo(this.sprite.scale.x, this.sprite.scale.y);
    };
    Flood.Item.prototype.switchGroup = function(group, item)
    {
        //Place the sprite into either the floodies or the flood group
        item.group = group;
        if(group === "floodies")
        {
            Flood.GameState.floodies.add(item.sprite);
        }
        else if (group === "flood")
        {
            Flood.GameState.flood.add(item.sprite);
        }
    };
    Flood.Item.prototype.scaleItem = function(scale)
    {
        //Scale the sprite
        this.sprite.scale.setTo(scale, scale);
    };
}