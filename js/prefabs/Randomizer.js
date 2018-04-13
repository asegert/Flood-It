//Sets up items
var Flood = Flood || {};


Flood.Randomizer = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Flood.Randomizer.prototype.init = function(colours, y, x, width, height)
     {
         let scaleFactor = this.getScaleFactor(x, y, width, height);
         let xOffset = this.getXOffset(x, width, scaleFactor);//width
         
         let randFactor = colours.length;
         let newBoard = new Array(y);
         
         for(let i=0; i<y; i++)
         {
             newBoard[i]=new Array(x);
             for(let j=0; j<x; j++)
             {
                 //newBoard[i][j]=colours[Math.floor(Math.random()*randFactor)];
                 
                let Item = new Flood.Item(this.state);
                Flood.GameState.totalFloodiesRemaining++;
                if(i % 2 === 0)
                {
                    newBoard[i][j] = Item.init([xOffset + ((94*scaleFactor) * j), (10*scaleFactor) + ((73*scaleFactor) * i), colours[Math.floor(Math.random()*randFactor)], i, j, "floodies"]);//97 105
                    newBoard[i][j].scaleItem(scaleFactor);
                }
                else
                {
                    newBoard[i][j] = Item.init([((Math.floor(height/2)*scaleFactor) + xOffset) + ((94*scaleFactor) * j), (10*scaleFactor) + ((73*scaleFactor) * i),colours[Math.floor(Math.random()*randFactor)], i, j, "floodies"]);
                    newBoard[i][j].scaleItem(scaleFactor);//height/2 * scaleFactor = 48
                }
             }
         }
         return newBoard;
     };
     Flood.Randomizer.prototype.getScaleFactor = function(x, y, width, height)
     {
         let innerWidth = window.innerWidth;
         let innerHeight = window.innerHeight;
         let widthFactor = x*width;
         let heightFactor = y*Math.round(0.855 * height);

         if(innerWidth>960)
         {
             innerWidth = 960;//9-105 945
         }
         if(innerHeight>640)
         {
             innerHeight = 640;//6-97 (83) 415 /3*2
         }
         
         innerHeight = Math.floor((innerHeight/3)*2.5);

         if(innerWidth<widthFactor)
         {
             widthFactor = Math.floor((innerWidth/widthFactor)*10)/10; //(screen width/length of combs at full size) = scale for right size combs
         }
         else
         {
             widthFactor = 1;
         }
         
         if(innerHeight<heightFactor)
         {
             heightFactor = Math.floor((innerHeight/heightFactor)*10)/10; //(screen width/length of combs at full size) = scale for right size combs
         }
         else
         {
             heightFactor = 1;
         }
         if(widthFactor<heightFactor)
         {
             return widthFactor;
         }
         else
         {
             return heightFactor;
         }
     };
     Flood.Randomizer.prototype.getXOffset = function(x, width, scaleFactor)
     {
         let innerWidth = window.innerWidth;
         if(innerWidth>960)
         {
             innerWidth = 960;
         }
         let comb = (x * width) * scaleFactor;
         let diff = innerWidth - comb;
         return diff/2;
     };
}