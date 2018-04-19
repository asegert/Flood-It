var Flood = Flood || {};

Flood.GameState = {
    create: function ()
    {
        //Pulls the JSON data
        this.allData = JSON.parse(this.game.cache.getText('floodData'));
        //Add the background
        this.background = this.add.sprite(0, 0, 'bg');
        //Tracks how many 'floodies' are not part of the flood
        this.totalFloodiesRemaining = -1;
        //The current colour colouring the flood
        this.currentColour = null;
        //An array of any bees that are currently moving initialized to false
        this.beeIsMoving = [];
        this.beeIsMoving['red'] = false;
        this.beeIsMoving['orange'] = false;
        this.beeIsMoving['yellow'] = false;
        this.beeIsMoving['green'] = false;
        this.beeIsMoving['blue'] = false;
        this.beeIsMoving['purple'] = false;
        this.beeIsMoving['pink'] = false;
        this.beeIsMoving['brown'] = false;
        this.beeIsMoving['white'] = false;
        this.beeIsMoving['black'] = false;
        //An array for storing the bee buttons
        this.bees = new Array();
        //Initializes the local board variables
        let board = null, boardX = 0, boardY = 0;
        //Checks if a ranom or manual board is to be created and creates the board
        if(this.allData.Rounds[Flood.currentRound].Random)
        {
            board = this.allData.Rounds[Flood.currentRound].colourArray;
            boardX = this.allData.Rounds[Flood.currentRound].BoardX;
            boardY = this.allData.Rounds[Flood.currentRound].BoardY;
        }
        else
        {
            board = this.allData.Rounds[Flood.currentRound].Board;
            boardX = board.length;
            boardY = board[0].length;
        }
        //Creates a Randomizer
        let ran = new Flood.Randomizer(this);
        //Complete board creation using the randomizer
        this.board = ran.init(board, boardX, boardY, this.allData.Rounds[Flood.currentRound].TileWidth, this.allData.Rounds[Flood.currentRound].TileHeight, this.allData.Rounds[Flood.currentRound].Random);
        //Create the buttons
        this.createButtons();
        //Set the starting floodie by making it part of the flood
        this.board[this.allData.Rounds[Flood.currentRound].startX][this.allData.Rounds[Flood.currentRound].startY].group = 'flood';
        this.board[this.allData.Rounds[Flood.currentRound].startX][this.allData.Rounds[Flood.currentRound].startY].sprite.loadTexture(`${this.board[this.allData.Rounds[Flood.currentRound].startX][this.allData.Rounds[Flood.currentRound].startY].texture}Floodie`);
        //Start the arrow pointing out the starting floodie
        let coords = this.board[this.allData.Rounds[Flood.currentRound].startX][this.allData.Rounds[Flood.currentRound].startY].sprite;
        //Create the arrow
        this.arrow = this.add.sprite(coords.x+coords.width/2, coords.y-coords.height/2, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.5, 0.5);
        //Start the tween to move the arrow
        this.dropTween = this.add.tween(this.arrow).to({y: this.arrow.y+10}, 500, "Linear", true, 0, -1);
        this.dropTween.yoyo(true, 0);
        //Create an empty recolour array to be used later
        this.adjacentRecolour = [];
    },
    createButtons: function()
    {
        //Stores the colour array
        let colourArray = this.allData.Rounds[Flood.currentRound].colourArray;
        //Goes through the colour array to create all the bee buttons
        for(let i=0, len=colourArray.length; i<len; i++)
        {
            let color = this.add.button(25 + (90 * i), 500, `${colourArray[i]}Bee`, this.checkFlood, colourArray[i]);
            color.scale.setTo(0.9, 0.9);
            color.colour = colourArray[i];
            this.bees[this.bees.length] = color;
        }
    },
    getAdjacent: function(item)
    {
        //Boolean to check that any adjacent tile had the same colour and thus gets added to the flood
        let sameColour = true;
        //Checks if it is an even or odd row as the location is altered a bit due to the shape
        if(item.x % 2 === 0)
        {
            //if sameColour is still true assign it the return value of checking if the item at the adjacent position is a valid item (is not outside the game board or already part of the flood) if sameColour is false still check the item but don't save it to sameColour
            sameColour? sameColour = this.checkValid(item.x-1, item.y-1, item):this.checkValid(item.x-1, item.y-1, item);//[0, 1]
            sameColour? sameColour = this.checkValid(item.x, item.y-1, item):this.checkValid(item.x, item.y-1, item);//[1, 1]
            sameColour? sameColour = this.checkValid(item.x-1, item.y, item):this.checkValid(item.x-1, item.y, item);//[0, 2]
            sameColour? sameColour = this.checkValid(item.x, item.y+1, item):this.checkValid(item.x, item.y+1, item);//[2, 2]
            sameColour? sameColour = this.checkValid(item.x+1, item.y-1, item):this.checkValid(item.x+1, item.y-1, item);//[0, 3]
            sameColour? sameColour = this.checkValid(item.x+1, item.y, item):this.checkValid(item.x+1, item.y, item);//[1, 3]
        }
        else
        {
            sameColour? sameColour = this.checkValid(item.x-1, item.y, item):this.checkValid(item.x-1, item.y, item);//[1, 0]
            sameColour? sameColour = this.checkValid(item.x-1, item.y+1, item):this.checkValid(item.x-1, item.y+1, item);//[2, 0]
            sameColour? sameColour = this.checkValid(item.x, item.y-1, item):this.checkValid(item.x, item.y-1, item);//[0, 1]
            sameColour? sameColour = this.checkValid(item.x+1, item.y, item):this.checkValid(item.x+1, item.y, item);//[2, 1]
            sameColour? sameColour = this.checkValid(item.x, item.y+1, item):this.checkValid(item.x, item.y+1, item);//[1, 2]
            sameColour? sameColour = this.checkValid(item.x+1, item.y+1, item):this.checkValid(item.x+1, item.y+1, item);//[2, 2]
        }
        
        return sameColour;
    },
    checkValid: function(startX, startY, item)
    {
        //If the item coordinates are within the gameboard
        if(startX > -1 && startX < this.board.length)
        {
            //Y is a valid index
            if(startY > -1 && startY < this.board[startX].length)
            {
                //Check if the item shares the flood colour and return the result
                return this.checkColour(item, this.board[startX][startY]);
            }
        }
        return false;
    },
    checkColour: function(item, checkItem)
    {
        if(checkItem != undefined && item.texture === checkItem.texture)
        {
            //add to main group
            if(checkItem.group != 'flood')
            {
                checkItem.group = 'flood';
                this.adjacentRecolour[this.adjacentRecolour.length] = checkItem;
                //checkItem.sprite.loadTexture(`${checkItem.texture}Floodie`);
                this.getAdjacent(checkItem);
                this.totalFloodiesRemaining--;
            }
            return true;
        }
        return false;
    },
    checkFlood: function(colourArr)
    {
        //Remove input so another bee cannot be activated overriding the current operation
        Flood.GameState.game.input.enabled = false;
        //Locate the index of the current bee
        Flood.GameState.currentColour = colourArr.key.replace("Bee", "");
        let k=0;
        for(let len=Flood.GameState.bees.length; k<len; k++)
        {
            if(Flood.GameState.bees[k].colour === Flood.GameState.currentColour)
            {
                break;
            }
        }
        let beeX = Flood.GameState.bees[k].x;
        let lowY = 0;
        let lowX = 0;
        let colourArray = new Array();
        //Go through the board and check all members of the flood. Locate the x and y coordinate closest to the bee as that will be where the bee will 'fly' to. For every flood member change the texture to the right comb and add it to the colour array then get the adjacent combs
        for(let i=0, len1 = Flood.GameState.board.length; i<len1; i++)
        {
            for(let j=0, len2 = Flood.GameState.board[i].length; j<len2; j++)
            {
                if(Flood.GameState.board[i][j] != undefined && Flood.GameState.board[i][j].group === "flood")
                {
                    if(Flood.GameState.board[i][j].sprite.y > lowY)
                    {
                        lowY = Flood.GameState.board[i][j].sprite.y;
                        lowX = Flood.GameState.board[i][j].sprite.x;
                    }
                    else if(Flood.GameState.board[i][j].sprite.y === lowY && Math.abs(beeX - Flood.GameState.board[i][j].sprite.x) < Math.abs(beeX - lowX))
                    {
                        lowX = Flood.GameState.board[i][j].sprite.x;
                    }
                    Flood.GameState.board[i][j].reColour('texture');
                    colourArray[colourArray.length] = Flood.GameState.board[i][j];
                    Flood.GameState.getAdjacent(Flood.GameState.board[i][j]);
                }
            }
        }
        //If the bee is not currently moving, begin moving the bee
        if(!Flood.GameState.beeIsMoving[Flood.GameState.currentColour])
        {
            Flood.GameState.beeIsMoving[Flood.GameState.currentColour] = true;
            if(k>(Flood.GameState.bees.length/2)-1)
            {
                Flood.GameState.bees[k].rotation = 0.1 * ((lowX - Flood.GameState.bees[k].x)/100);
                Flood.GameState.bees[k].scale.setTo(-0.9, 0.9);
                lowX += 100;
            }
            else
            {
                Flood.GameState.bees[k].rotation = 0.1 * ((lowX - Flood.GameState.bees[k].x)/100);
            }
            let move = Flood.GameState.add.tween(Flood.GameState.bees[k]).to({x: lowX, y: lowY}, 500, "Linear", true);
            move.onComplete.add(function()
            {
                //Combine the colour array with the array of adjacent tiles that needed recoloured (2nd check tiles)
                colourArray = colourArray.concat(Flood.GameState.adjacentRecolour);
                //Recolour all items
                for(let o=0, len=colourArray.length; o<len; o++)
                {
                    colourArray[o].reColour('colour');
                }
                //Reset the bee
                Flood.GameState.resetBee(k);
            }, this);
        }
    },
    resetBee: function(index)
    {
        //Reset the bee to it's original location
        let x=700;
        if(Flood.GameState.bees[index].scale.x === -0.9)
        {
            x = 0;
        }
        let resetTween = Flood.GameState.add.tween(Flood.GameState.bees[index]).to({x: x, y: 0}, 1000, "Linear", true);
        resetTween.onComplete.add(function()
        {
            Flood.GameState.bees[index].rotation = 0;
            Flood.GameState.bees[index].scale.setTo(0.9, 0.9);
            Flood.GameState.bees[index].x = 25 + (90 * index);
            Flood.GameState.bees[index].y = 500;
            Flood.GameState.beeIsMoving[Flood.GameState.bees[index].colour] = false;
            //If there are no more floodies thus all members are flood members and the round is over
            if(Flood.GameState.totalFloodiesRemaining === 0 && Flood.GameState.currentColour === Flood.GameState.bees[index].colour)
            {
                //Run the beekeeper sprite
                let beekeeper = Flood.GameState.add.sprite(-500, 0, 'beekeeper');
                beekeeper.animations.add('run');
                beekeeper.animations.play('run', 15, true);
                //Add the filled floodies
                let combTexture = `${Flood.GameState.bees[index].colour}FilledFloodie`;
                let bgTexture = Flood.GameState.allData.Rounds[Flood.currentRound].filledBG[index];
                //If necessary change the background texture
                if(bgTexture != null)
                {
                   this.background.loadTexture(bgTexture); 
                }
                //Set the filled floodies
                for(let col1 = 0, col1Len = Flood.GameState.board.length; col1<col1Len; col1++)
                {
                    for(let col2 = 0, col2Len = Flood.GameState.board[col1].length; col2<col2Len; col2++)
                    {
                        if(this.board[col1][col2] != undefined)
                        {
                            this.board[col1][col2].endCombs(combTexture);
                        }
                    }
                }
                //Once the beekeeper has run across the screen start the next stage
                let runTween = Flood.GameState.add.tween(beekeeper).to({x: 1000}, 3000, "Linear", true);
                runTween.onComplete.add(function()
                {
                        Flood.HoneyType = Flood.GameState.allData.Rounds[Flood.currentRound].honeyArray[index];
                        Flood.HoneyPot = this.currentColour;
                        Flood.GameState.game.state.start('End');
                }, this);
            }
            //If the flood is not complete allow bees to be clicked again
            else
            {
                Flood.GameState.game.input.enabled = true;
            }
        }, this);
    },
    update: function ()
    {
        //If the arrow exists and the player has pressed down we assume they found the starting floodie so remove the arrow
        if(this.arrow != undefined && this.input.activePointer.isDown)
        {
            this.dropTween.stop();
            this.arrow.destroy();
        }
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/