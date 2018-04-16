var Flood = Flood || {};

Flood.TutorialState = {
     create: function ()
    {
        //offset: 0:47, 0:75
        this.allData = JSON.parse(this.game.cache.getText('floodData'));
        this.background = this.add.sprite(0, 0, 'bg');
        this.totalFloodiesRemaining = -1;
        this.currentColour = null;
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
        this.instructionValue = 0;
        this.bees = new Array();
        let board = null, boardX = 0, boardY = 0;
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
        let ran = new Flood.Randomizer(this);
        this.board = ran.init(board, boardX, boardY, this.allData.Tutorial[0].TileWidth, this.allData.Tutorial[0].TileHeight, this.allData.Tutorial[0].Random);
        this.createButtons();
        this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].group = 'flood';
        this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].sprite.loadTexture(`${this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].texture}Floodie`);
        
        let coords = this.board[this.allData.Tutorial[0].startX][this.allData.Tutorial[0].startY].sprite;
        this.arrow = this.add.sprite(coords.x+coords.width/2, coords.y-coords.height/2, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.5, 0.5);
        this.dropTween = this.add.tween(this.arrow).to({y: this.arrow.y+10}, 500, "Linear", true, 0, -1);
        this.dropTween.yoyo(true, 0);
        
        this.hint = this.add.sprite(200, 300, 'hint');
        
        this.arrowTime = this.game.time.events.add(Phaser.Timer.SECOND * 3, function()
        {
            Flood.TutorialState.hint.loadTexture('hint2');
            Flood.TutorialState.world.bringToTop(Flood.TutorialState.arrow);
            this.repositionArrow();
        }, this);
    },
    createButtons: function()
    {
        let colourArray = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'white', 'black'];
        
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
        let k=0;
        for(let len=Flood.TutorialState.bees.length; k<len; k++)
        {
            if(Flood.TutorialState.bees[k].colour === Flood.TutorialState.allData.Tutorial[0].arrow[Flood.TutorialState.instructionValue])
            {
                break;
            }
        }
        Flood.TutorialState.dropTween.stop();
        Flood.TutorialState.arrow.position.x=Flood.TutorialState.bees[k].x+Flood.TutorialState.bees[k].width/2;
        Flood.TutorialState.arrow.position.y=Flood.TutorialState.bees[k].y-Flood.TutorialState.bees[k].height/2;
            
        Flood.TutorialState.dropTween = Flood.TutorialState.add.tween(Flood.TutorialState.arrow).to({y: Flood.TutorialState.arrow.y+10}, 500, "Linear", true, 0, -1);
        Flood.TutorialState.dropTween.yoyo(true, 0);
    },
    checkFlood: function(colourArr)
    {
        Flood.TutorialState.arrow.alpha=0;
        Flood.TutorialState.time.events.remove(Flood.TutorialState.arrowTime);
        if(Flood.TutorialState.hint != undefined)
        {
            Flood.TutorialState.hint.destroy();
        }
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
            
            let boardLoc= Flood.TutorialState.board[Flood.TutorialState.allData.Tutorial[0].arrowLanding[Flood.TutorialState.instructionValue][0]][Flood.TutorialState.allData.Tutorial[0].arrowLanding[Flood.TutorialState.instructionValue][1]].sprite;
            
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
                    for(let i = 0, len = Flood.TutorialState.instructionValue; i<=len; i++)
                    {
                        for(let j = 0, len2 = Flood.TutorialState.allData.Tutorial[0].switchers[i].length; j<len2; j++)
                        {   
                        Flood.TutorialState.board[Flood.TutorialState.allData.Tutorial[0].switchers[i][j][0]][Flood.TutorialState.allData.Tutorial[0].switchers[i][j][1]].reColour(null);
                        }
                    }
                    Flood.TutorialState.board[Flood.TutorialState.allData.Tutorial[0].startX][Flood.TutorialState.allData.Tutorial[0].startY].reColour(null);
                    
                    Flood.TutorialState.instructionValue++;
                    
                    Flood.TutorialState.resetBee(k);
                }, this);
            }
        }
        else
        {
            Flood.TutorialState.arrow.alpha = 1;
            Flood.TutorialState.repositionArrow();
        }
    },
    resetBee: function(index)
    {
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
            if(Flood.TutorialState.instructionValue >= Flood.TutorialState.allData.Tutorial[0].arrow.length)
            {
                let beekeeper = Flood.TutorialState.add.sprite(-500, 0, 'beekeeper');
                beekeeper.animations.add('run');
                beekeeper.animations.play('run', 15, true);
                
                let combTexture = `${Flood.TutorialState.bees[index].colour}FilledFloodie`;
                let bgTexture = Flood.TutorialState.allData.Tutorial[0].filledBG[index];
                
                if(bgTexture != null)
                {
                   this.background.loadTexture(bgTexture); 
                }
                
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
                let runTween = Flood.TutorialState.add.tween(beekeeper).to({x: 1000}, 3000, "Linear", true);
                runTween.onComplete.add(function()
                {
                    this.game.state.start('Game');
                }, this);
            }
            else
            {
                Flood.TutorialState.arrow.alpha = 1;
                Flood.TutorialState.repositionArrow();
            }
        }, this);
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/