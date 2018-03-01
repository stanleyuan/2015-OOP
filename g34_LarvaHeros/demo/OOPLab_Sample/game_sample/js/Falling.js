var Falling = function (file) {

    var right,left=0
    var x = 500;

    this.load = function(){
        this.things = new Framework.Sprite(define.imagePath + file);
	    this.position = {
	       x: 500,
	       y: 10
	    };
	   this.rotation = 0;
       this.count = 0;
    };

    this.initialize = function(){

    };

    this.update = function (prac, pracspeed, right, left) {
        this.things.position.x = this.position.x;
        this.things.position.y = this.position.y;
        this.things.rotation = this.rotation + 10;
        this.move(prac, pracspeed, right, left);

    };


   this.move = function (prac, pracspeed, right, left) {
        
        
        if (right === 1) {
            if (prac === Framework.Game.getCanvasWidth()/2) {
                this.position.x -= pracspeed;
            };
        }

        if (left === 1) {
            if(prac === Framework.Game.getCanvasWidth()/2){
                this.position.x += pracspeed;
            }
        }
    };
};