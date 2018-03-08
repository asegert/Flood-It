var Flood = Flood || {};

Flood.GameState = {
    create: function ()
    {
        //offset: 0:47, 0:75
        this.currentColour = 'black';
        this.flood = this.add.group();
        this.floodies = this.add.group();
        this.board = this.createBoard([['black', 'red'], ['orange', 'pink'], ['blue', 'yellow'], ['blue', 'purple']]);
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
    getAdjacent: function(item)
    {
        console.log(`x: ${item.x} y: ${item.y}`);
        let startX = item.x-1;
        let startY = item.y-1;
        for(let i=0; i<3; i++)
        {
            //X is a valid index
            if(startX > -1 && startX < this.board.length)
            {
                let tempStartY = startY;
                for(let j=0; j<3; j++)
                {
                    console.log(`x: ${startX} y: ${tempStartY}`);
                    //Y is a valid index
                    if(tempStartY > -1 && tempStartY < this.board[startX].length)
                    {
                        this.checkColour(item, this.board[startX][tempStartY]);
                    }
                    tempStartY++;
                }
            }
            startX++;
        }
    },
    checkColour: function(item, checkItem)
    {
        console.log('colour');
        console.log(item.texture);
        console.log(checkItem.texture);
        if(item.texture === checkItem.texture)
        {
            //add to main group
            console.log('add');
        }
    },
    switchGroup: function(group, item)
    {
        if(item.group != undefined)
        {
            //remove from group
        }
        item.group = group;
        if(group === "floodies")
        {
            this.floodies.add(item);
        }
        else
        {
            this.flood.add(item);
        }
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/