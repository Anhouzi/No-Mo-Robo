/************************************
    Main
************************************/
var gameStateManager;
var inputHandler;
var stage;
var turrets;
var projectiles;
var enemies;
var collisionHandler;
var score = 0;
var scoreBox = new TextBox("Score: " + score);
scoreBox.index = 0;
scoreBox.x = CANVAS.width - 200;
scoreBox.y = 50;


var gameOver;
var houseCondition;

function Main() {
    
    initGameStateManager();
    initInput();
    
    function newGame() {
        console.log('new game');
        initStage();
         gameStateManager.gameStage().addChild(scoreBox);
        /*
        initEntities(turrets);
        initEntities(projectiles);
        initEntities(enemies);
        */
       
        initTurrets();
        initProjectiles();
        initEnemies();
        initCollision();
        houseCondition = STARTING_HOUSE_CONDITION;
    }
    
    world.update = function(dt) {
        dt = dt * MSPF / 1000;
        if(gameStateManager.inGame()) { // only update when looking at game
            if(!gameOver) {
                // clear dead
               
                gameStateManager.gameStage().removeChild(scoreBox);
                gameStateManager.gameStage().addChild(scoreBox);
                clearEntities(turrets);
                clearEntities(enemies);
                // update game
                updateEntities(turrets, dt);
                updateEntities(projectiles, dt);
                updateEntities(enemies, dt);
                // check for lose condition
                generateEnemies(dt); // bad, but works well enough for now
                  scoreBox.text = "Score: " + score;
                collisionHandler.update(dt);
                if(houseCondition <= 0) {
                    gameOver = true;
                    ENEMY_SPAWN_INTERVAL = 1000;
                    houseCondition = STARTING_HOUSE_CONDITION;
                    score = 0;
                    gameStateManager.gameStage().removeChild(scoreBox);
                    gameStateManager.gameStage().addChild(scoreBox);
                }
            } else {
                newGame();
                gameOver = false;
            }
        }
    }

}
/***********************************/




