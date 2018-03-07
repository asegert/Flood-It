var Flood = Flood || {};

Flood.GameState = {
    create: function ()
    {
        //offset: 0:47, 0:75
        this.createBoard([['black', 'red'], ['orange', 'pink'], ['blue', 'yellow']]);
    },
    createBoard: function(board)
    {
        for(let i=0, len1=board.length; i<len1; i++)
        {
            for(let j=0, len2=board[i].length; j<len2; j++)
            {
                if(i%2===0)
                {
                    this.add.sprite(0 + (93 * j), 0 + (74.5 * i), board[i][j]);
                }
                else
                {
                    this.add.sprite(47 + (93 * j), + (74.5 * i), board[i][j])
                }
            }
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