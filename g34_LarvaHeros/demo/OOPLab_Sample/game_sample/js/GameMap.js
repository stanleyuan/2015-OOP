var GameMap = function(){
    
    this.position = {
	    x : 800,
	    y : 450
    };
    	
    //this.mapleft should equal nagetive of half of map plus 800
    this.mapleft = -(1500 - Framework.Game.getCanvasWidth()/2);
    this.mapright = 1500 + Framework.Game.getCanvasWidth()/2;

    this.mapleft = 0;
    this.mapright = 3000;
    //var x = 500;
    var right,left = 0;
	
    

    this.load = function(mappic){
	    this.map = new Framework.Sprite(mappic);	
    };

    this.initialize = function(){

    };

    this.update = function(prac, pracspeed, right, left){

        this.map.position = this.position;
        this.map.rotation = this.rotation;
        this.move(prac, pracspeed, right, left);
	};
	
    this.move = function (prac, pracspeed, right, left) {
    	
		    
    
        if (right === 1) {
            if (prac >= (Framework.Game.getCanvasWidth()/2)) {
				this.position.x -= pracspeed;
				this.mapleft -= pracspeed;
				this.mapright -= pracspeed;
				if(this.mapright <= 1600){
					this.position.x += pracspeed;
					this.mapleft += pracspeed;
					this.mapright += pracspeed;
				};
            };
        }

        if (left === 1) {
            if (prac <= (Framework.Game.getCanvasWidth()/2)) {
				this.position.x += pracspeed;
				this.mapleft += pracspeed;
				this.mapright += pracspeed;
				if(this.mapleft >= 0){
					this.position.x -= pracspeed;
					this.mapleft -= pracspeed;
					this.mapright -= pracspeed;
				};
	   		};
        }
    };

    
    this.draw = function(ctx){
		var mapPosition = {
			x: 800,
			y: 450
		}
	
	this.map.position = mapPosition;
	this.map.draw(ctx);
    };
}
