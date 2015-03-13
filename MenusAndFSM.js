clearColor = [0, 0, 0, 0];
use2D = true;
initGame("canvas");

function Screen(alwaysUpdate, alwaysDraw){
    Sprite.call(this);
    
    this.alwaysUpdate = alwaysUpdate;
    this.alwaysDraw = alwaysDraw;
    
    this.stage = new Sprite();
    this.addChild(this.stage);
    
    this.gui = new GUI(gInput);
    this.addChild(this.gui);
    
    this.initialized = false;
}
Screen.prototype = new Sprite();

Screen.prototype.init = function(){
}

function ScreenManager(){
    Sprite.call(this);
    
    this.screens = new List();
}
ScreenManager.prototype = new Sprite();

ScreenManager.prototype.push = function(screen){
    this.screens.remove(screen);
    this.screens.push(screen);
}

ScreenManager.prototype.pop = function(){
    this.screens.tail.item.gui.visible = false;
    return this.screens.pop();
}
ScreenManager.prototype.peek = function()
{
    return this.screens.tail;
}

ScreenManager.prototype.remove = function(screen){
    screen.gui.visible = false;
    this.screens.remove(screen);
}

ScreenManager.prototype.update = function(d){
    var screens = this.screens;
    
    for(var node = screens.head; node != null; node = node.link){
        var screen = node.item;
        
        if(node != screens.tail){
            screen.gui.visible = false;
        }else{
            screen.gui.visible = true;
        }
        
        if(screen.alwaysUpdate || node == screens.tail){
            if(!screen.initialized){
                screen.init();
                screen.initialized = true;
            }
            
            screen.update();
        }
    }
}

ScreenManager.prototype.draw = function(ctx){
    var screens = this.screens;
    
    for(var node = screens.head; node != null; node = node.link){
        var screen = node.item;
        
        if(screen.alwaysDraw || node == screens.tail){
            screen.draw(ctx);
        }
    }    
}

var screenMan = new ScreenManager();
world.addChild(screenMan);

var mainMenu = new Screen(false, false);
screenMan.push(mainMenu);
mainMenu.image = Textures.load();

mainMenu.init = function(){
    
    
    use2D = true;
    var titleScreen = new Sprite();
    titleScreen.width = 800;
    titleScreen.height = 600;
    titleScreen.image = Textures.load("http://i.imgur.com/NB3xxSp.png");
    mainMenu.addChild(titleScreen);
        var newgame = new TextButton("New Game");
    newgame.setLabelColors("#aaaaaa", "#00ff00", "#ff0000");
    newgame.x = 350;
    newgame.y = 325;
    newgame.scaleX *= 2;
    newgame.scaleY *= 2;
    this.gui.addChild(newgame);
    mainMenu.addChild(newgame);
    newgame.func = function(){
        screenMan.push(gameScreen);
        
    } 
   
}

var gameScreen = new Screen(false, true);
gameScreen.init = function(){
    var sprite = new Sprite();
   function newGame()
   {
    var stage = new Stage();
    var ph = new PlayerHandler(stage);
    var eh = new EnemyHandler();
    var ch = new CollisionHandler();
    
    world.update = function(dt) {
        dt = dt * MSPF / 1000;
        if(!gameOver) {
            ph.update(dt);
            eh.update(dt);
            ch.update(eh.enemies(), ph.projectiles(), ph.turrets(), ph.house());
   
        } else {
            stage = new Stage();
            
            ph = new PlayerHandler(stage);
            eh.reset();
            eh = new EnemyHandler();
            ch = new CollisionHandler();
            gameOver = false;
        }
    };
   } 
initGame("canvas");
 newGame();    
    this.stage.addChild(sprite);
}

var pauseMenu = new Screen(true, true);
pauseMenu.init = function(){
    var unpause = new TextButton("Paused");
    var resume = new TextButton("Resume");
    var quit = new TextButton("Quit");
    unpause.setLabelColors("#aaaaaa", "#00ff00", "#ff0000");
    resume.setLabelColors("#aaaaaa", "#00ff00", "#ff0000");
    quit.setLabelColors("#aaaaaa", "#00ff00", "#ff0000");
      resume.x =400;
      resume.y = 400;
      quit.x = 75;
      quit.y = 110;
    this.gui.addChild(unpause);
    this.gui.addChild(resume);
    this.gui.addChild(quit);
    pauseMenu.addChild(resume);
    pauseMenu.addChild(unpause);
    pauseMenu.addChild(quit);
    resume.func = function(){ 
        screenMan.remove(pauseMenu);
    };
    quit.func = function(){
    screenMan.remove(pauseMenu);
    screenMan.remove(gameScreen);
    }
}

//Map the p key to launch the Pause Menu
gInput.addFunc(80, function(){
    screenMan.push(pauseMenu);
    
});


