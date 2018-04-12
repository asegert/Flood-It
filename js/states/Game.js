var Flood = Flood || {};

Flood.GameState = {
    create: function ()
    {
        //offset: 0:47, 0:75
        this.allData = JSON.parse(this.game.cache.getText('floodData'));
        this.background = this.add.sprite(0, 0, 'bg');
        this.totalFloodiesRemaining = -1;
        this.currentColour = null;
        this.beeIsMoving = false;
        let ran = new Flood.Randomizer(this);
        this.board = this.createBoard(ran.init(this.allData.Rounds[Flood.currentRound].colourArray, 6, 9));
        this.bees = new Array();
        this.createButtons();
        this.board[this.allData.Rounds[Flood.currentRound].startX][this.allData.Rounds[Flood.currentRound].startY].group = 'flood';
        this.board[this.allData.Rounds[Flood.currentRound].startX][this.allData.Rounds[Flood.currentRound].startY].sprite.loadTexture(`${this.board[this.allData.Rounds[Flood.currentRound].startX][this.allData.Rounds[Flood.currentRound].startY].texture}Floodie`);
        this.adjacentRecolour = [];
    },
    createBoard: function(board)
    {
        for(let i=0, len1=board.length; i<len1; i++)
        {
            for(let j=0, len2=board[i].length; j<len2; j++)
            {
                let Item = new Flood.Item(this);
                this.totalFloodiesRemaining++;
                if(i % 2 === 0)
                {
                    board[i][j] = Item.init([10 + (93.2 * j), 0 + (74.5 * i), board[i][j], i, j, "floodies"]);
                }
                else
                {
                    board[i][j] = Item.init([57 + (93.2 * j), 0 + (74.5 * i), board[i][j], i, j, "floodies"]);
                }
            }
        }
        return board;
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
    getAdjacent: function(item)
    {
        console.log(`x: ${item.x} y: ${item.y}`);
        let sameColour = true;
        
        if(item.x % 2 === 0)
        {
            sameColour? sameColour = this.checkValid(item.x-1, item.y-1, item):this.checkValid(item.x-1, item.y-1, item);//[0, 1]
            sameColour? sameColour = this.checkValid(item.x, item.y-1, item):this.checkValid(item.x, item.y-1, item);//[1, 1]
            sameColour? sameColour = this.checkValid(item.x-1, item.y, item):this.checkValid(item.x-1, item.y, item);//[0, 2]
            sameColour? sameColour = this.checkValid(item.x, item.y+1, item):this.checkValid(item.x, item.y+1, item);//[2, 2]
            sameColour? sameColour = this.checkValid(item.x+1, item.y-1, item):this.checkValid(item.x+1, item.y-1, item);//[0, 3]
            sameColour? sameColour = this.checkValid(item.x+1, item.y, item):this.checkValid(item.x+1, item.y, item);//[1, 3]
        }
        else
        {
            console.log('k');
            sameColour? sameColour = this.checkValid(item.x-1, item.y, item):this.checkValid(item.x-1, item.y, item);//[1, 0]
            sameColour? sameColour = this.checkValid(item.x-1, item.y+1, item):this.checkValid(item.x-1, item.y+1, item);//[2, 0]
            sameColour? sameColour = this.checkValid(item.x, item.y-1, item):this.checkValid(item.x, item.y-1, item);//[0, 1]
            sameColour? sameColour = this.checkValid(item.x+1, item.y, item):this.checkValid(item.x+1, item.y, item);//[2, 1]
            sameColour? sameColour = this.checkValid(item.x, item.y+1, item):this.checkValid(item.x, item.y+1, item);//[1, 2]
            sameColour? sameColour = this.checkValid(item.x+1, item.y+1, item):this.checkValid(item.x+1, item.y+1, item);//[2, 2]
        }
        
        console.log(sameColour);
        return sameColour;
    },
    checkValid: function(startX, startY, item)
    {
        if(startX > -1 && startX < this.board.length)
        {
            console.log(`x: ${startX} y: ${startY}`);
            //Y is a valid index
            if(startY > -1 && startY < this.board[startX].length)
            {
                return this.checkColour(item, this.board[startX][startY]);
            }
        }
        return false;
    },
    checkColour: function(item, checkItem)
    {
        console.log('colour');
        console.log(item.texture);
        console.log(checkItem.texture);
        if(item.texture === checkItem.texture)
        {
            //add to main group
            console.log(`add`);
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
        Flood.GameState.currentColour = colourArr.key.replace("Bee", "");
        let k=0;
        for(let len=Flood.GameState.bees.length; k<len; k++)
        {
            if(Flood.GameState.bees[k].colour === Flood.GameState.currentColour)
            {
                break;
            }
        }
        let finished = false;
        let beeX = Flood.GameState.bees[k].x;
        let lowY = 0;
        let lowX = 0;
        let colourArray = new Array();
        for(let i=0, len1 = Flood.GameState.board.length; i<len1; i++)
        {
            for(let j=0, len2 = Flood.GameState.board[i].length; j<len2; j++)
            {
                if(Flood.GameState.board[i][j].group === "flood")
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
                    console.log(Flood.GameState.getAdjacent(Flood.GameState.board[i][j]));
                }
            }
        }
        if(!Flood.GameState.beeIsMoving)
        {
            Flood.GameState.beeIsMoving = true;
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
            console.log(`rotation: ${Flood.GameState.bees[k].rotation}`);
            let move = Flood.GameState.add.tween(Flood.GameState.bees[k]).to({x: lowX, y: lowY}, 500, "Linear", true);
            move.onComplete.add(function()
            {
                colourArray = colourArray.concat(Flood.GameState.adjacentRecolour);
                console.log(Flood.GameState.adjacentRecolour);
                for(let o=0, len=colourArray.length; o<len; o++)
                {
                    colourArray[o].reColour('colour');
                }
                Flood.GameState.resetBee(k);
            }, this);
        }
    },
    resetBee: function(index)
    {
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
            Flood.GameState.beeIsMoving = false;
            if(Flood.GameState.totalFloodiesRemaining === 0)
            {
                console.log('gameOver');
                let beekeeper = Flood.GameState.add.sprite(-500, 0, 'beekeeper');
                beekeeper.animations.add('run');
                beekeeper.animations.play('run', 15, true);
                
                let combTexture = null;
                if(Flood.GameState.bees[index].colour === 'red')
                {
                    this.background.loadTexture("bgBug");
                    combTexture = 'bugFloodie';//Buggy Honey
                }
                else if(Flood.GameState.bees[index].colour === 'orange')
                {
                    this.background.loadTexture("bgFire");
                    combTexture = 'fireFloodie';//Fiery Honey
                }
                else if(Flood.GameState.bees[index].colour === 'yellow')
                {
                    combTexture = 'honeyFloodie';//Natural Honey
                }
                else if(Flood.GameState.bees[index].colour === 'green')
                {
                    this.background.loadTexture("bgLucky");
                    combTexture = 'luckyFloodie';//Lucky Honey
                }
                else if(Flood.GameState.bees[index].colour === 'blue')
                {
                    this.background.loadTexture("bgRain");
                    combTexture = 'rainFloodie';//Cool Honey
                }
                else if(Flood.GameState.bees[index].colour === 'purple')
                {
                    this.background.loadTexture("bgThunder");
                    combTexture = 'thunderFloodie';//Stormy Honey
                }
                else if(Flood.GameState.bees[index].colour === 'pink')
                {
                    this.background.loadTexture("bgRose");
                    combTexture = 'roseFloodie';//Rose Honey
                }
                else if(Flood.GameState.bees[index].colour === 'brown')
                {
                    combTexture = 'bearFloodie';//Hunny Bear Hunny
                }
                else if(Flood.GameState.bees[index].colour === 'white')
                {
                    this.background.loadTexture("bgRain");
                    combTexture = 'iceFloodie';//Whiteout Honey
                }
                else if(Flood.GameState.bees[index].colour === 'black')
                {
                    this.background.loadTexture("bgNight");
                    combTexture = 'nightFloodie';//Midnight Honey
                }
                
                for(let col1 = 0, col1Len = Flood.GameState.board.length; col1<col1Len; col1++)
                {
                    for(let col2 = 0, col2Len = Flood.GameState.board[col1].length; col2<col2Len; col2++)
                    {
                        this.board[col1][col2].endCombs(combTexture);
                    }
                }
                let runTween = Flood.GameState.add.tween(beekeeper).to({x: 1000}, 3000, "Linear", true);
                runTween.onComplete.add(function()
                {
                    /*if(Flood.currentRound < Flood.GameState.allData.Rounds.length-1)
                    {
                        Flood.currentRound++;
                        Flood.GameState.game.state.start('Game');
                    }
                    else
                    {*/
                        Flood.HoneyPot = `${this.currentColour}HoneyJar`;
                        Flood.GameState.game.state.start('End');
                    /*}
                    let tempArray = new Array();//Fill Array with board and randomly remove
                    
                    for(let i=0, len1 = this.board.length; i<len1; i++)
                    {
                        for(let j=0, len2 = this.board[i].length; j<len2; j++)
                        {
                            
                        }
                    }*/
                }, this);
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