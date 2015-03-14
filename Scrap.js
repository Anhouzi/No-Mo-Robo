   var scrapList = new DList();
    var consumed = new DList();

function Scrap()
{
 
    
    
    this.generateScrap = function(pos)
    {
       scrapList.append(initSprite(pos, SCRAP, gameStateManager.gameStage()));
    };
    
    this.update = function() 
    {
        var current;
        var pos = {x: inputHandler.mouseX(), y: inputHandler.mouseY()};
      for(scrapList.moveTo(0); scrapList.getIndex() >= 0; scrapList.moveNext()) {
        current = scrapList.getElement();
        
        if(contains(pos, current)) {
                    console.log('!');
            consumed.append(scrapList.getIndex());
        }
    }
    
    for(consumed.moveTo(consumed.size() - 1); consumed.getIndex() >= 0; consumed.movePrev()) {
        current = consumed.getElement()
        scrapList.moveTo(current)
        gameStateManager.gameStage().removeChild(scrapList.getElement())
        scrapList.remove();
        scrap++;
    }
    consumed.clear();

    }
}
