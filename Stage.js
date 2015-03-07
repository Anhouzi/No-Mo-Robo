
function Stage() {
    var ofs = (3 * CANVAS_HEIGHT) / 50; 
    
    var background = new Sprite();
    background.x = 0;
    background.y = 0;
    background.index = 10;
    background.width = CANVAS_WIDTH;
    background.height = CANVAS_HEIGHT; 
    background.image = Textures.load("http://i.imgur.com/HqFojBs.png");

    var fence = new Sprite();
    fence.x = 0;
    fence.y = CANVAS_HEIGHT/2 - 100;
    fence.index = 9;
    fence.width = CANVAS_WIDTH; 
    fence.image = Textures.load("http://i.imgur.com/pxjoAxj.png");

    function Grid(rows, cols, tileSize, tileType) {
        //Inner class for the level which draws each tile individually.
        //i = row #, j = col #
        var _row = rows;
        var _col = cols;
        var _tileSize = tileSize;
        
        var Tile = function(i, j, tileSize, tileType) {
            var tileSprite = new Sprite();
            //X.Starting_Position = 1/5 of the canvas width - the offset for the tile Sprite
                    //Then add the length of each tile - that same offset. 
            //Y.Starting_Position = 1/2 of the canvas height + the height of each lane. 
            tileSprite.x = (CANVAS_WIDTH/5 - i*(tileSize*0.2)) + (i*tileSize - j*(tileSize*0.18));
            tileSprite.y = CANVAS_HEIGHT/2 + j*tileSize;
            tileSprite.index = 7;
            tileSprite.width = tileSize;
            tileSprite.height = tileSize;
            tileSprite.image = Textures.load(tileType);
            world.addChild(tileSprite);
           };
        //Number of rows, columns, and the size of each tile.
        this.rows = rows;
        this.cols = cols;
        this.tileSize = tileSize;
        this.tiles = [];
        //Nested for loop initiallized each tile.
        for (var i = 0; i < cols; i++) {
            this.tiles[i] = [];        
            for (var j = 0; j < rows; j++) {
                this.tiles[i][j] = new Tile(i, j, tileSize, tileType);
            }
        }
        /*
        function findTile(pos){
            var _newPosition = {x: 0, y: 0};
            _newPosition.x = Math.floor((pos.x-100) / ( (3 * CANVAS_HEIGHT) / 50 ));			//Returns a whole number that is the column of the tile. 
            _newPosition.y = Math.floor((pos.y - (CANVAS_HEIGHT / 2)) / CANVAS_HEIGHT/5);		//Returns a whole number that is the row of the tile. 
            
            //(Column Number * Tile Size) + (House offset + ((5 - Lane Number) * Tile Offset))
            _newPosition.x = (_newPosition.x * (CANVAS_HEIGHT / 10)) + (100 + ((5 - _newPosition.y) * CANVAS_HEIGHT / 50)); 
            
            //(Row number * Tile Size) + 1/2 Canvas height
            _newPosition.y = (_newPosition.y * (CANVAS_HEIGHT / 10)) + (CANVAS_HEIGHT/2); 
            return _newPosition;
        }
        */
        
        this.getTile = function(pos){ 

        	var r;     
        	var c;
        	var _newPosition = {x: 0, y: 0};	
        	//Between house and the right side of the screen. And between the middle and bottom of the screen. 
            if (pos.x > 100 && pos.x < CANVAS_WIDTH && pos.y >= CANVAS_HEIGHT/2 && pos.y < CANVAS_HEIGHT ){
            	//Go through each row to see where the cursor clicked. 
            	for ( var i = 0; i < _row; i++){
            		if ( pos.y <= (this._tileSize * i) &&  pos.y >= (this._tileSize * (i-1))){	
            			r = i;
            		}
            	}
            	//Go through each column to see where the cursor clicked. 
            	for ( var j = 0; j < _col - 2; j++) {
            		if ( pos.x <= ((ofs * i) + (j * _tileSize - ofs) - ofs) && pos.x >= ((ofs * i) + ((j - 1) * _tileSize) - ofs)){
            			c = j;
            		}
            	}
            	newPosition.x = (ofs * r) + ((c - 1) * _tileSize - ofs);
            	newPosition.y = _tileSize * r;
                return newPosition;
            } else {
                return {x: 0, y: 0};
            }
        };
    };

    
    var _grid;
    
    this.getTile = function(pos) { 
        return _grid.getTile(pos);
    };
    
    function stageInit (){
        var tileType = "http://i.imgur.com/9IqHhrM.png";
        
        world.addChild(background);
        world.addChild(fence);
        //world.addChild(tempHouse);
        _grid = new Grid(5, 15, CANVAS_HEIGHT/10, tileType);
    }
    
    stageInit();
}
