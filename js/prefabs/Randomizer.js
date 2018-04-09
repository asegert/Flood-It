//Sets up items
var Flood = Flood || {};


Flood.Randomizer = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Flood.Randomizer.prototype.init = function(colours, x, y)
     {
         let randFactor = colours.length;
         let newBoard = [][];
         
         for(let i = 0; i<x; i++)
         {
             for(let j=0; j<y; j++)
             {
                 newBoard[i][j]=colors[Math.floor(Math.rand()*randFactor)];
             }
         }
         return newBoard;
     };
}