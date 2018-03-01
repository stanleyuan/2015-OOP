var Army = function (file, pic, level) {

    var right,left = 0;
    var x = 500;

    this.load = function(spotcolor){
    	if(level === 1)
            this.arm = new Framework.AnimationSprite({url: define.imagePath + file, col: 5 , row: 6 , loop: false, speed: 1});
        else if(level ===  2)
            this.arm = new Framework.AnimationSprite({url: define.imagePath + file, col: 6 , row: 6 , loop: false, speed: 1});
        else if(level === 3)
            this.arm = new Framework.AnimationSprite({url: define.imagePath + file, col: 4 , row: 3 , loop: false, speed: 1});
            
        this.position = {
    	    x: -1000,
    	    y: 530
    	};
        this.interval = 180;
	    this.rotation = 0;
        this.hittime = this.interval;
        this.health = 180;
        this.healthbase = 180;
        this.hitVal = 20;
        this.helf = 70;

        this.moveflag = false;
        this.moveflagtime = 10;
        this.idleflag = false;
        this.idleflagtime = 10;
        this.deadflag = true;
        this.deadflagtime = 10;
        this.beHitflag = true;
        this.beHitflagtime = 10;

        this.shadow = new Framework.Sprite(define.imagePath + 'shadow_01.png');
        this.shadow.position = {
            x: 200,
            y: 585
        }
        this.shadow1 = new Framework.Sprite(define.imagePath + 'shadow.png');
        this.shadow1.position = {
            x: 200,
            y: 610
        }
        this.spot = new Framework.Sprite(define.imagePath + spotcolor);
        this.spot.position = {
            x: 245,
            y: 880
        }

        this.icon = new Framework.Sprite(define.imagePath + pic);
        this.icon.position = {
            x: 305,
            y: 785
        }
        
    };

    this.initialize = function(){

    };

    this.update = function (prac, pracspeed, right, left) {
        this.arm.position = this.position;
        this.arm.position.y = this.position.y - 20;
        this.shadow.position.x = this.position.x-10;       
        this.shadow1.position.x = this.position.x-10;
        this.move(prac, pracspeed, right, left);

        if(this.hittime === 0)
            this.rotation = 0;
        if(this.hittime < this.interval)
            this.hittime += 1;
        

        if(this.hittime < this.interval)
            this.hittime += 1;

        if(this.moveflagtime < 30){
            this.moveflagtime += 1;
            if(this.moveflagtime === 30)
                this.moveflag = true;
        }
        if(this.idleflagtime < 40){
            this.idleflagtime += 1;
            if(this.idleflagtime === 40)
                this.idleflag = true;
        }
        if(this.deadflagtime < 40){
            this.deadflagtime += 1;
            if(this.deadflagtime === 40)
                this.deadflag = true;
        }
        if(this.beHitflagtime < 40){
            this.beHitflagtime += 1;
            if(this.beHitflagtime === 40)
                this.beHitflag = true;
        }

               
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

    this.idle = function(){
        if(this.idleflag === true){
            if(level === 1){
                this.arm.start({from: 20, to: 23, loop: false, speed: 2});
            }
            else if(level === 2){
                this.arm.start({from: 18, to: 21, loop: false});
            }
            else if(level === 3){
                this.arm.start({from: 0, to: 3, loop: false}) ;  
            }
            this.idleflag = false;
            this.idleflagtime = 0;
        }
    }

    this.run = function(){

        if(this.moveflag === true){
            if(level === 1){
                this.arm.start ({from: 15, to: 18, loop: true, speed: 2});
            }
            else if(level === 2){
                this.arm.start ({from: 30, to: 33, loop: false, speed: 2});
            }
            else if(level === 3){
               this.arm.start ({from: 0, to: 3, loop: false, speed: 2});
            }
            this.moveflag = false;
            this.moveflagtime = 0;    
        }
    },

    this.hit = function () {
        if(this.hittime === this.interval){
            if(level === 1){
                this.arm.start ({from: 0, to: 3, loop: false, speed: 2});
            }
            else if(level === 2){
                this.arm.start ({from: 0, to: 5, loop: false, speed: 2.5});
            }
            this.hittime = 0;
        }
       
    };
    this.beHit = function(cost) {
        if(this.beHitflag === true){
            if(level === 1){
                this.arm.start ({from: 5, to: 7, loop: false, speed: 2});
            }
            else if(level === 2){
                this.arm.start ({from: 6, to: 8, loop: false, speed: 2});
            }
            else if(level === 3){
                this.arm.start ({from: 4, to: 5, loop: false, speed: 1});
            }
            this.beHitflag = false;
            this.beHitflagtime = 0;
        }
        this.health -= cost;
    };

	this.dead = function() {
        if(this.deadflag === true){
            if(level === 1){
                this.arm.start({from: 10, to: 11, loop: false, speed: 2});
            }
            else if(level === 2){
                this.arm.start({from: 12, to: 14, loop: false});
            }
            else if(level === 3){
                this.arm.start({from: 8, to: 10, loop: false}) ;  
            }
            this.deadflag = false;
            this.deadflagtime = 0;
        }
    };
    
    this.draw = function(ctx, color){
        if(this.health != this.healthbase){
            ctx.beginPath();
            ctx.lineWidth = 15;
            ctx.moveTo(this.position.x - 40, this.position.y - this.helf);
            ctx.lineTo(this.position.x - 40 + 80 * (this.health / this.healthbase), this.position.y - this.helf);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    };
};
