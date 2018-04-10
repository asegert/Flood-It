//Sets up items
var Flood = Flood || {};


Flood.Randomizer = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Flood.Randomizer.prototype.init = function(colours, x, y)
     {
         let randFactor = colours.length;
         let newBoard = new Array(x);
         
         for(let i=0; i<x; i++)
         {
             newBoard[i]=new Array(y);
             for(let j=0; j<y; j++)
             {
                 newBoard[i][j]=colours[Math.floor(Math.random()*randFactor)];
             }
         }
         return newBoard;
     };
}