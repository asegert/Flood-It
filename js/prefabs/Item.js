//Sets up items
var Flood = Flood || {};


Flood.Item = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Flood.Item.prototype.init = function(data)
     {
        this.sprite = this.createSprite(data[0], data[1], data[2]);
     };
     Flood.Item.prototype.createSprite = function(x, y, texture)
     {
        return this.state.add.button(x, y, texture, function()
        {
            this.reColour(this.state.currentColour)
        }, this);
     };
     Flood.Item.prototype.switchGroup = function()
     {
        
     };
     Flood.Item.prototype.reColour = function()
     {
         if(this.sprite!=undefined)
         {
            this.sprite.loadTexture(this.state.currentColour);
         }
     };
}