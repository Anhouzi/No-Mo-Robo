
function Stage() {

    
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
    
    

    /*
    var tempHouse = new Sprite();
    tempHouse.x = 0; 
    tempHouse.y = 10;
    tempHouse.index = 8;
    tempHouse.width = 200;
    tempHouse.height = CANVAS_HEIGHT;
    tempHouse.image = Textures.load("hhttp://i.imgur.com/GjCuaSO.png");
    */
   

    function Grid(rows, cols, tileSize, tileType) {
        //Inner class for the level which draws each tile individually.
        //i = row #, j = col #
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
        
        function findTile(pos){
            var mX = pos.x;
            var mY = pos.y;
            
            var currentRow;
            var currentCol;
            
            for(i = 0; i < NUM_ROWS; ++i) {
                if(mY < CANVAS_HEIGHT - (i * TILE_HEIGHT) && mY > CANVAS_HEIGHT - ((i + 1) * TILE_HEIGHT))
                {
                    currentRow = i + 1;
                }
            }
            if(currentRow) {
                var totalOfs = currentRow * TILE_OFS;
                var startingPos = totalOfs + HOUSE_BASE_ACTUAL;
                for(j = 0; j < NUM_COLS; ++j) {
                    if(mX > startingPos + j * TILE_WIDTH && mX < startingPos + (j + 1) * TILE_WIDTH)
                    {
                        currentCol = j + 1;
                    }
                }
                if(currentCol) {
                    return {i: currentRow, j: currentCol};
                }
            }
        }
        
        this.getTile = function(pos){
            if (pos.x > 100 && pos.y >= CANVAS_HEIGHT / 2){
                var tile = findTile(pos);
                console.log(tile);
                if(tile) {
                    var tilePos = {x: 0, y: 0};
                    tilePos.x += HOUSE_BASE_ACTUAL + (TILE_OFS * tile.i);
                    tilePos.x += TILE_WIDTH * (tile.j - 1) - (TILE_OFS / tile.j * (tile.j - 1));
                    tilePos.y += CANVAS_HEIGHT - (TILE_HEIGHT * (tile.i));
                    return tilePos;
                }
            } 
            return -1;
            
        };
    };

    
    var _grid;
    
    this.getTile = function(pos) { 
        return _grid.getTile(pos);
    }
    
    function stageInit (){
        var tileType = "http://i.imgur.com/9IqHhrM.png";
        
        world.addChild(background);
        world.addChild(fence);
        //world.addChild(tempHouse);
        _grid = new Grid(5, 15, CANVAS_HEIGHT/10, tileType);
    }
    stageInit();
}
