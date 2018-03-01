var Camp = function (file) {

    var right,left=0
    var x = 500;

    this.load = function(){
        this.building = new Framework.Sprite(define.imagePath + file);
	    this.position = {
	       x: 2300,
	       y: 400
	    };
	   this.rotation = 0;
       this.health = 3500;
    
    };

    this.initialize = function(){

    };

    this.update = function (background) {
        this.building.position.x = this.position.x;
        this.building.position.y = this.position.y;
        this.building.rotation = this.rotation;
        if(this.rotation != 0)
            this.rotation = 0;
    };

    this.beHit = function(cost) {
        this.rotation += 50;
        this.health -= cost;
        console.log("camp " + this.health);
    }
    
    this.draw = function(ctx, offset){
	    ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50pt bold';
        ctx.fillText(this.health, this.position.x + offset, this.position.y-100, 260);
    };
};
