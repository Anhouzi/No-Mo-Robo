/*
var sheet = new Image();
sheet.src = "http://i.imgur.com/KNsLL76.png";
*/

//====================Sprite Sources=====================================================//
var normalBot = new Image();
//Lonely Version
normalBot.src = "http://i.imgur.com/6yZDAs1.png";
//normalBot.width = 200;
//normalBot.height = 200;

var speedyBot = new Image();
//Lonely Version
speedyBot.src = "http://i.imgur.com/ry3LdWs.png";
//speedyBot.width = 200;
//speedyBot.height = 200;

var tankyBot = new Image();
//Lonely Version
tankyBot.src = "http://i.imgur.com/ULe58Pm.png";
//tankyBot.width = 200;
//tankyBot.height = 200;

var knifester = new Image();
knifester.src = "http://i.imgur.com/9rvsrtT.png";

var knife = new Image();
knife.src = "http://i.imgur.com/AKW49Cq.png";
//knifester.width = 250;
//knifester.height = 50;

//====================Example Implementation (expected) =================================//
/*
Instead of sprite.image = Textures.load("SpriteSource"), we should be able to remove that part entirely
and instead use a new animation function object and put animation.update and animation.render calls in the 
entity's update function. 

var animate = new animation({context: canvas, width: SPRITE_SRC.width, height: SPRITE_SRC.height; image:SPRITE_SRC})
animate.update();
animate.render();
*/
// var state: Changes the type of animation the sprite enacts. 
/* var that: state   - Changes the type of animation the sprite enacts.
             context - The place the spirte is being drawn.
             width   - Width of each frame.
             height  - Height of each frame.
             image   - The location of the sprite sheet being used. 
             render  - Function that draws the proper frame onto the context. 
             update  - Updates the frame that needs to be drawn. 
*/

var animation = function(options) {
    
    var that = {},
        frameIndex = 1,                           //Location of the frame finder.
        tickCount = 0,                            //Time tracker.
        
        //ticksPerFrame = 2*options.movespeed;
        ticksPerFrame = 6,                        //Time until next frame loads.
        numberOfFrames = options.width / 50;      //Number of frames in the animation. 
        //state = 0;                              //Vertical sheet manager. Defaults to "moving". 
    that.state = 0;
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    
    that.render = function(){
            that.context.drawImage(
               that.image,                                         //Sprite Image
               frameIndex * that.width + 10,                       //Source X
               that.height * that.state,                           //Source Y;
               that.width,                                         //Frame width
               that.height,                                        //Frame height
               0,                                                  //Destination X
               0,                                                  //Destination Y
               that.width + 10,                                    //Destination Width
               that.height + 10);                                  //Destination Height. 
    };
        
    that.update = function(){
        tickCount += 1;
        
        if (tickCount  > ticksPerFrame){
            tickCount = 0;
            if ( frameIndex < numberOfFrames - 1 ) {
                frameIndex += 1;
            } else if ( frameIndex >= numberOfFrames - 1 ) {
                frameIndex = 0;
            }
        }
    };
    return that;
};

/*
var canvas = document.getElementById("canvas");


var bot = new animation({
    //context: canvas,
    context: canvas.getContext("2d"),
    width: 50,
    height: 50,
    image: sheet
});


sheet.addEventListener("load", gameLoop);


function gameLoop (){
    window.requestAnimationFrame(gameLoop);
    
    bot.update();
    bot.render();
    //bot.state = 1;
}
*/
