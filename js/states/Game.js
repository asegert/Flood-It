var Flood = Flood || {};

Flood.GameState = {
    create: function ()
    {
        //offset: 0:47, 0:75
        this.allData = JSON.parse(this.game.cache.getText('floodData'));
        this.currentColour = null;
        this.board = this.createBoard(this.allData.Rounds[0].Board);
        this.createButtons();
        this.board[0][0].group = 'flood';
    },
    createBoard: function(board)
    {
        for(let i=0, len1=board.length; i<len1; i++)
        {
            for(let j=0, len2=board[i].length; j<len2; j++)
            {
                let Item = new Flood.Item(this);
                
                if(i % 2 === 0)
                {
                    board[i][j] = Item.init([0 + (93.2 * j), 0 + (74.5 * i), board[i][j], i, j, "floodies"]);
                }
                else
                {
                    board[i][j] = Item.init([47 + (93.2 * j), 0 + (74.5 * i), board[i][j], i, j, "floodies"]);
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
            checkItem.group = 'flood';
            return true;
        }
        return false;
    },
    checkFlood: function(colourArray)
    {
        Flood.GameState.currentColour = colourArray.key.replace("Bee", "");
        for(let i=0, len1 = Flood.GameState.board.length; i<len1; i++)
        {
            for(let j=0, len2 = Flood.GameState.board[i].length; j<len2; j++)
            {
                if(Flood.GameState.board[i][j].group === "flood")
                {
                    Flood.GameState.board[i][j].reColour();
                    console.log(Flood.GameState.getAdjacent(Flood.GameState.board[i][j]));
                }
            }
        }
        console.log(Flood.GameState.board);
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/