var Victory = function () {

    var right,left=0
    

    this.load = function(){
        this.victory = new Framework.Sprite(define.imagePath + 'clear.png');
	    this.position = {
	       x: 800,
	       y: -900
	    };
	    this.rotation = 0;
        };
        this.loss = new Framework.Sprite(define.imagePath + 'gameover.png');
        this.position = {
           x: 800,
           y: -900
        };

    this.initialize = function(){

    };

    this.update = function (background) {
       
        this.victory.position = this.position;
        this.victory.rotation = this.rotation;
        this.loss.position = this.position;
        this.loss.rotation = this.rotation;
        
    };
};
