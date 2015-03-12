/************************************
    Entity
************************************/
function Entity(pos, type) {
    this.sprite = initSprite(pos, type);
    this.condition = type.condition;
    this.damage = type.damage;
    this.speed = type.speed;
    
    function initSprite(pos, type) = {
        var ret = new Sprite();
        ret.image = Textures.load(type.spriteSource);
        ret.index = type.spriteIndex;
        ret.width = type.spriteWidth;
        ret.height = type.spriteHeight;
        ret.x = pos.x;
        ret.y = pos.y;
        ret.offsetX = -ret.width / 2;
        ret.offsetY = -ret.height / 2;
        world.addChild(ret);
        return ret;
    }
    
    this.updateSprite = function(delta) {
        this.sprite.x += delta.x;
        this.sprite.y += delta.y;
    }
    
    this.removeSprite = function {
        world.removeChild(this.sprite);
    }
}
/************************************/




/************************************
    Type
************************************/
function Type(s, i, w, h, c, d, sp) {
    this.spriteSource = s;
    this.spriteIndex = i;
    this.spriteWidth = w;
    this.spriteHeight = h;
    
    this.condition = c;
    this.damage = d;
    this.speed = sp;
}
/***********************************/
