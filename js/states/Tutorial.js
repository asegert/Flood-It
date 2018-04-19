var Flood = Flood || {};

Flood.TutorialState = {
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
        //Tracks which instruction is being worked on
        this.instructionValue = 0;
        //An array for storing the bee buttons
        this.bees = new Array();
        //Initializes the local board variables
        let board = null, boardX = 0, boardY = 0;
        //Checks if a ranom or manual board is to be created and creates the board
        if(this.allData.Tutorial[0].Random)
        {
            board = this.allData.Tutorial[0].colourArray;
            boardX = this.allData.Tutorial[0].BoardX;
            boardY = this.allData.Tutorial[0].BoardY;
        }
        else
        {
            board = this.allData.Tutorial[0].Board;
            boardX = board.length;
            boardY = board[0].length;
        }
        //Creates a Randomizer
        let ran = new Flood.Randomizer(this);
        //Complete board creation using the randomizer
        this.board = ran.init(board, boardX, boardY, this.allData.Tutorial[0].TileWidth, this.allData.Tutorial[0].TileHeight, this.allData.Tutorial[0].Random);
        //Create the buttons
        this.createButtons();
        //Set the starting floodie by making it part of the flood
        this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].group = 'flood';
        this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].sprite.loadTexture(`${this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].texture}Floodie`);
        //Start the arrow pointing out the starting floodie
        let coords = this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].sprite;
        //Create the arrow
        this.arrow = this.add.sprite(coords.x+coords.width/2, coords.y-coords.height/2, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.5, 0.5);
        //Start the tween to move the arrow
        this.dropTween = this.add.tween(this.arrow).to({y: this.arrow.y+10}, 500, "Linear", true, 0, -1);
        this.dropTween.yoyo(true, 0);
        //Create the initial hint to show
        this.hint = this.add.sprite(200, 300, 'hint');
        //Wait three seconds then move the arrow to the first bee to select
        this.arrowTime = this.game.time.events.add(Phaser.Timer.SECOND * 3, function()
        {
            //Load the new hint and raise the arrow above it and reposition it
            Flood.TutorialState.hint.loadTexture('hint2');
            Flood.TutorialState.world.bringToTop(Flood.TutorialState.arrow);
            this.repositionArrow();
        }, this);
    },
    createButtons: function()
    {
        //Stores the colour array
        let colourArray = this.allData.Tutorial[0].colourArray;
        //Goes through the colour array to create all the bee buttons
        for(let i=0, len=colourArray.length; i<len; i++)
        {
            let color = this.add.button(25 + (90 * i), 500, `${colourArray[i]}Bee`, this.checkFlood, colourArray[i]);
            color.scale.setTo(0.9, 0.9);
            color.colour = colourArray[i];
            this.bees[this.bees.length] = color;
        }
    },
    repositionArrow: function()
    {
        //Search for the bee colour that matches the colour the arrow must find
        let k=0;
        for(let len=Flood.TutorialState.bees.length; k<len; k++)
        {
            if(Flood.TutorialState.bees[k].colour === Flood.TutorialState.allData.Tutorial[0].arrow[Flood.TutorialState.instructionValue])
            {
                //Break when found
                break;
            }
        }
        //Stop the drop tween (moves arrow up and down)
        Flood.TutorialState.dropTween.stop();
        //If the bee found is a valid bee
        if(k != Flood.TutorialState.bees.length)
        {
            //Reposition the arrow above the bee
            Flood.TutorialState.arrow.position.x=Flood.TutorialState.bees[k].x+Flood.TutorialState.bees[k].width/2;
            Flood.TutorialState.arrow.position.y=Flood.TutorialState.bees[k].y- Flood.TutorialState.bees[k].height/2;
            //Restart the drop tween
            Flood.TutorialState.dropTween = Flood.TutorialState.add.tween(Flood.TutorialState.arrow).to({y: Flood.TutorialState.arrow.y+10}, 500, "Linear", true, 0, -1);
            Flood.TutorialState.dropTween.yoyo(true, 0);
        }
    },
    checkFlood: function(colourArr)
    {
        //Stop displaying the arrow
        Flood.TutorialState.arrow.alpha=0;
        //If the second hint step was skipped stop the timer from causing it
        Flood.TutorialState.time.events.remove(Flood.TutorialState.arrowTime);
        //Remove the hint
        if(Flood.TutorialState.hint != undefined)
        {
            Flood.TutorialState.hint.destroy();
        }
        //Locate the index of the current bee if it matches the instruction
        let tempColour = colourArr.key.replace("Bee", "");
        if(tempColour === Flood.TutorialState.allData.Tutorial[0].arrow[Flood.TutorialState.instructionValue])
        {
            Flood.TutorialState.currentColour = colourArr.key.replace("Bee", "");
            let k=0;
            for(let len=Flood.TutorialState.bees.length; k<len; k++)
            {
                if(Flood.TutorialState.bees[k].colour === Flood.TutorialState.currentColour)
                {
                    break;
                }
            }
            //Get the location where the bee will 'fly' to
            let boardLoc= Flood.TutorialState.board[Flood.TutorialState.allData.Tutorial[0].arrowLanding[Flood.TutorialState.instructionValue][0]][Flood.TutorialState.allData.Tutorial[0].arrowLanding[Flood.TutorialState.instructionValue][1]].sprite;
            //Move the bee
            let lowX = boardLoc.x;
            let lowY = boardLoc.y;
            if(!Flood.TutorialState.beeIsMoving[Flood.TutorialState.currentColour] && !Flood.TutorialState.beeIsMoving[Flood.TutorialState.allData.Tutorial[0].arrow[Flood.TutorialState.instructionValue-1]])
            {
                Flood.TutorialState.beeIsMoving[Flood.TutorialState.currentColour] = true;
                if(k>(Flood.TutorialState.bees.length/2)-1)
                {
                    Flood.TutorialState.bees[k].rotation = 0.1 * ((lowX - Flood.TutorialState.bees[k].x)/100);
                    Flood.TutorialState.bees[k].scale.setTo(-0.9, 0.9);
                    lowX += 100;
                }
                else
                {
                    Flood.TutorialState.bees[k].rotation = 0.1 * ((lowX - Flood.TutorialState.bees[k].x)/100);
                }
                let move = Flood.TutorialState.add.tween(Flood.TutorialState.bees[k]).to({x: lowX, y: lowY}, 500, "Linear", true);
                move.onComplete.add(function()
                {
                    //Recolour all relevant tiles. The current instruction switchers and all those who came before
                    for(let i = 0, len = Flood.TutorialState.instructionValue; i<=len; i++)
                    {
                        for(let j = 0, len2 = Flood.TutorialState.allData.Tutorial[0].switchers[i].length; j<len2; j++)
                        {   
                            Flood.TutorialState.board[Flood.TutorialState.allData.Tutorial[0].switchers[i][j][0]][Flood.TutorialState.allData.Tutorial[0].switchers[i][j][1]].reColour(null);
                        }
                    }
                    Flood.TutorialState.board[Flood.TutorialState.allData.Tutorial[0].startX][Flood.TutorialState.allData.Tutorial[0].startY].reColour(null);
                    //Increase to the next instruction
                    Flood.TutorialState.instructionValue++;
                    //Reset the bee
                    Flood.TutorialState.resetBee(k);
                }, this);
            }
        }
        //Else restart the arrow to show the right bee to click
        else
        {
            Flood.TutorialState.arrow.alpha = 1;
            Flood.TutorialState.repositionArrow();
        }
    },
    resetBee: function(index)
    {
        //Reset the bee to it's original location
        let x=700;
        if(Flood.TutorialState.bees[index].scale.x === -0.9)
        {
            x = 0;
        }
        let resetTween = Flood.TutorialState.add.tween(Flood.TutorialState.bees[index]).to({x: x, y: 0}, 1000, "Linear", true);
        resetTween.onComplete.add(function()
        {
            Flood.TutorialState.bees[index].rotation = 0;
            Flood.TutorialState.bees[index].scale.setTo(0.9, 0.9);
            Flood.TutorialState.bees[index].x = 25 + (90 * index);
            Flood.TutorialState.bees[index].y = 500;
            Flood.TutorialState.beeIsMoving[Flood.TutorialState.bees[index].colour] = false;
            //If the end of the instructions has been reached, thus the round is over
            if(Flood.TutorialState.instructionValue >= Flood.TutorialState.allData.Tutorial[0].arrow.length)
            {
                //Run the beekeeper sprite
                let beekeeper = Flood.TutorialState.add.sprite(-500, 0, 'beekeeper');
                beekeeper.animations.add('run');
                beekeeper.animations.play('run', 15, true);
                //Add the filled floodies
                let combTexture = `${Flood.TutorialState.bees[index].colour}FilledFloodie`;
                let bgTexture = Flood.TutorialState.allData.Tutorial[0].filledBG[index];
                //If necessary change the background texture
                if(bgTexture != null)
                {
                   this.background.loadTexture(bgTexture); 
                }
                //Set the filled floodies
                for(let col1 = 0, col1Len = Flood.TutorialState.board.length; col1<col1Len; col1++)
                {
                    for(let col2 = 0, col2Len = Flood.TutorialState.board[col1].length; col2<col2Len; col2++)
                    {
                        if(this.board[col1][col2] != undefined)
                        {
                            this.board[col1][col2].endCombs(combTexture);
                        }
                    }
                }
                //Once the beekeeper has run across the screen start the next stage
                let runTween = Flood.TutorialState.add.tween(beekeeper).to({x: 1000}, 3000, "Linear", true);
                runTween.onComplete.add(function()
                {
                    this.game.state.start('Game');
                }, this);
            }
            //If there are more instructions show the next instruction
            else
            {
                Flood.TutorialState.arrow.alpha = 1;
                Flood.TutorialState.repositionArrow();
            }
        }, this);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/