//Sets up items
var Flood = Flood || {};


Flood.Randomizer = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Flood.Randomizer.prototype.init = function(colours, y, x, width, height, random)
     {
         //Get the scale
         let scaleFactor = this.getScaleFactor(x, y, width, height);
         //Get the x offset from the side so the combs are relatively centered
         let xOffset = this.getXOffset(x, width, scaleFactor);
         //Create a new board
         let newBoard = new Array(y);
         //If the board is not to be random
         if(!random)
         {
            //Go through the colours array which in this case is the array of colours corresponding to a board
            for(let i=0, len1=colours.length; i<len1; i++)
            {
                //For each column create a new row array
                newBoard[i]=new Array(x);
                for(let j=0, len2=colours[i].length; j<len2; j++)
                {
                    //Create a new item (floodie) and update the number of total floodies
                    let Item = new Flood.Item(this.state);
                    this.state.totalFloodiesRemaining++;
                    //For manual there can be outliers meaning rows with more or less floodies than other rows so if a location does not have a colour an empty floodie is created, but it does not need to be changed thus the total floodies remaining must be decreased
                    if(colours[i][j] === undefined)
                    {
                       this.state.totalFloodiesRemaining--; 
                    }
                    //If the row is even scale the floodies for an even row and same for odd as odd is over by 1/2, the item colour comes from the colour board passed in
                    if(i % 2 === 0)
                    {
                        newBoard[i][j] = Item.init([xOffset + ((94*scaleFactor) * j), (10*scaleFactor) +   ((73*scaleFactor) * i), colours[i][j], i, j, "floodies"]);
                        newBoard[i][j].scaleItem(scaleFactor);
                    }
                    else
                    {
                        newBoard[i][j] = Item.init([((Math.floor(height/2)*scaleFactor) + xOffset) +   ((94*scaleFactor) * j), (10*scaleFactor) + ((73*scaleFactor) * i), colours[i][j], i, j, "floodies"]);
                        newBoard[i][j].scaleItem(scaleFactor);
                    }
                }
            }
         }
         //If the board is to be random
         else
         {
            let randFactor = colours.length;
            //Create rows for the coloumns
            for(let i=0; i<y; i++)
            {
                newBoard[i]=new Array(x);
                for(let j=0; j<x; j++)
                {
                    //Create a new item
                    let Item = new Flood.Item(this.state);
                    //Increase the number of floodies
                    this.state.totalFloodiesRemaining++;
                    //If the row is even scale the floodies for an even row and same for odd as odd is over by 1/2, the colour is chosen using a random number between 0 and the length of colours as stored in randFactor
                    if(i % 2 === 0)
                    {
                        newBoard[i][j] = Item.init([xOffset + ((94*scaleFactor) * j), (10*scaleFactor) +   ((73*scaleFactor) * i), colours[Math.floor(Math.random()*randFactor)], i, j,   "floodies"]);//97 105
                        newBoard[i][j].scaleItem(scaleFactor);
                    }
                    else
                    {
                        newBoard[i][j] = Item.init([((Math.floor(height/2)*scaleFactor) + xOffset) +   ((94*scaleFactor) * j), (10*scaleFactor) + ((73*scaleFactor) *     i),colours[Math.floor(Math.random()*randFactor)], i, j, "floodies"]);
                        newBoard[i][j].scaleItem(scaleFactor);//height/2 * scaleFactor = 48
                    }
                }
            }
         }
         //Return the new board
         return newBoard;
     };
     Flood.Randomizer.prototype.getScaleFactor = function(x, y, width, height)
     {
         //Store the game size
         let innerWidth = 960;
         let innerHeight = 640;
         //Calculate the width by multiplying the number of combs by the width of each comb
         let widthFactor = x*width;
         //Calculate the width by multiplying the number of combs by the height of each comb while factoring the shortened height on the odd rows
         let heightFactor = y*Math.round(0.855 * height);
         //Reset the innerHeight to exclude the space required for the bees (5/6 height = board)
         innerHeight = Math.floor((innerHeight/3)*2.5);
         //If the innerWidth is less than the width at full scale reset the factor
         if(innerWidth<widthFactor)
         {
             widthFactor = Math.floor((innerWidth/widthFactor)*10)/10; 
             //(screen width/length of combs at full size) = scale for right size combs
             //*10 used for proper decimal reduction /10 to reset back to the correct factor
         }
         else
         {
             //If the expected width is less than or equal to the innerWidth the width scale does not need to change
             widthFactor = 1;
         }
         //If the innerHeight is less than the height at full scale reset the factor
         if(innerHeight<heightFactor)
         {
             heightFactor = Math.floor((innerHeight/heightFactor)*10)/10; 
             //(screen width/length of combs at full size) = scale for right size combs
             //*10 used for proper decimal reduction /10 to reset back to the correct factor
         }
         else
         {
             //If the expected height is less than or equal to the innerHeight the height scale does not need to change
             heightFactor = 1;
         }
         //Choose the lowest factor for scaling in order to keep from stretching one way
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
         //Subtract the space the combs will take up from the space on the screen considering the scale factor
         let innerWidth = 960;
         let comb = (x * width) * scaleFactor;
         let diff = innerWidth - comb;
         //Return half the difference (the offset of one side)
         return diff/2;
     };
}