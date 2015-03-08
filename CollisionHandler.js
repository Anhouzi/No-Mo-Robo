/************************************
    Collision Handler
************************************/
function CollisionHandler()
{
    //var qt = new QuadTree();

    function checkCollision(sprite1, sprite2)
    {
       if(sprite1.x + sprite1.width >= sprite2.x &&
       sprite1.x  <= sprite2.x + sprite2.width)
       {
          if(sprite1.y + sprite1.height >= sprite2.y && 
          sprite1.y <= sprite2.y + sprite2.height)
          {
            return true;
          }
       }
       
       else
       {
          return false;
       }
    }
    
    function damageStep(obj1, obj2)
    {
        
        obj2.modifyCondition(-(obj1.damage()));
        obj1.modifyCondition(-(obj2.damage()));
       
       
      // if(obj1 instanceof Projectile && obj2 instanceof Enemy)
      // {
         // obj2.modifyCondition(-(obj1.damage()));
         // obj1._collision = true;
       //} 
       
       //write condition for enemy to turret
    }
    
    function clear(node)
    {
       if(node instanceof Node)
       {
          for(node.getChildren().moveTo(0); node.getChildren.getIndex() >= 0; node.getChildren.moveNext())
          {
             if(node.getChildren.getElement() instanceof Enemy)
             {
                if(node.getChildren().condition() <= 0)
                {
                   node.getChildren().remove();
                }
                
                else if(node.getChildren.getElement() instanceof Projectile)
                {
                   if(node.getChildren().hasCollided())
                   {
                      node.getChildren().remove();
                      
                   }
                }
             }
          }
       }
    };

    
    this.update = function(elist,plist, tlist, house)
    {
       for(elist.moveTo(0); elist.getIndex() >= 0; elist.moveNext())
       {
         
          for(plist.moveTo(0); plist.getIndex() >= 0; plist.moveNext())
          {
             if(checkCollision(plist.getElement().sprite(), elist.getElement().sprite()))
             {
                            var prevIndex = plist.getIndex(); //store the previous index
                            damageStep(plist.getElement(), elist.getElement()); // resolve collision
                            plist.getElement().despawn(); //remove projectile sprite from the world
                            plist.remove(); // remove it from the list of active projectiles
                            plist.moveTo(prevIndex); // index is now -1 so restore the previous index
             }
          }
          
          if(checkCollision(elist.getElement().sprite(), house.sprite())) {
              damageStep(elist.getElement(), house);
              damageStep(house, elist.getElement());
          }
          
         for(tlist.moveTo(0); tlist.getIndex() >= 0; tlist.moveNext())
          {
             if(checkCollision(elist.getElement().sprite(), tlist.getElement().sprite()))
             {
               damageStep(elist.getElement(), tlist.getElement());
             }
          } 
       }
    };
}
/***********************************/
