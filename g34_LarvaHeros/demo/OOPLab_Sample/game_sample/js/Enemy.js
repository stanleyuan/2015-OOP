var Enemy = function (file, level) {

    var x = 500;

    this.load = function(enemycamp, spotcolor){
    	this.ene = new Framework.Sprite(define.imagePath + file);
        if(level === 1)
            this.ene = new Framework.AnimationSprite({url: define.imagePath + file, col: 5 , row: 6 , loop: false, speed: 1});
        else if(level ===  2)
            this.ene = new Framework.AnimationSprite({url: define.imagePath + file, col: 8 , row: 6 , loop: false, speed: 1});
    
        
    	this.position = {
    	    x: enemycamp,
    	    y: 530
    	};
	    this.rotation = 0;

        this.interval = 180;
        this.health = 180;
        this.healthbase = 180;
        this.hittime = this.interval;
        this.hitVal = 20;
        this.helf = 70;

        this.shadow = new Framework.Sprite(define.imagePath + 'shadow_01.png');
        this.shadow.position = {
            x: 200,
            y: this.position.y + 50
        }
        this.shadow1 = new Framework.Sprite(define.imagePath + 'shadow.png');
        this.shadow1.position = {
            x: 200,
            y: 610
        }
        this.spot = new Framework.Sprite(define.imagePath + spotcolor);
        this.spot.position = {
            x: 690,
            y: 880
        }

        this.moveflag = false;
        this.moveflagtime = 10;
        this.idleflag = false;
        this.idleflagtime = 10;
        this.deadflag = true;
        this.deadflagtime = 10;
        this.beHitflag = true;
        this.beHitflagtime = 10;
    };
    

    this.initialize = function(){

    };

    this.update = function (prac, pracspeed, right, left) {
        this.ene.position = this.position; 
        this.ene.rotation = this.rotation;
        this.shadow.position.x = this.position.x;
        this.shadow.position.y = 585;
        this.shadow1.position.x = this.position.x + 20;
        this.shadow1.position.y = 585;
        this.move(prac, pracspeed, right, left);

        if(this.hittime < this.interval)
            this.hittime += 1;
        if(this.hittime === 0)
            this.rotation = 0;
        if(this.rotation != 0)
            this.rotation = 0;

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
                this.ene.start({from: 15, to: 17, loop: false, speed: 2});
            }
            else if(level === 2){
                this.ene.start({from: 24, to: 26, loop: false});
            }
            
            this.idleflag = false;
            this.idleflagtime = 0;
        }
    }

    this.run = function(){

        if(this.moveflag === true){
            if(level === 1){
                this.ene.start ({from: 20, to: 22, loop: true, speed: 2});
            }
            else if(level === 2){
                this.ene.start ({from: 32, to: 39, loop: false, speed: 2});
            }
            
            this.moveflag = false;
            this.moveflagtime = 0;    
        }
    },

    this.hit = function () {
        if(this.hittime === this.interval){
            if(level === 1){
                this.ene.start ({from: 0, to: 4, loop: false, speed: 2});
            }
            else if(level === 2){
                this.ene.start ({from: 0, to: 4, loop: false, speed: 2});
            }

            this.hittime = 0;
        }
       
    };

    this.beHit = function(cost) {
        if(this.beHitflag === true){
            if(level === 1){
                this.ene.start ({from: 5, to: 7, loop: false, speed: 2});
            }
            else if(level === 2){
                this.ene.start ({from: 8, to: 10, loop: false, speed: 2});
            }
            this.beHitflag = false;
            this.beHitflagtime = 0;
        }
        this.health -= cost;
        console.log("enemy " + this.health);
    };

    this.dead = function() {
        if(this.deadflag === true){
            if(level === 1){
                this.ene.start({from: 10, to: 14, loop: false, speed: 1});
            }
            else if(level === 2){
                this.ene.start({from: 16, to: 20, loop: false});
            }
            
            this.deadflag = false;
            this.deadflagtime = 0;
        }
        //console.log("jaja");
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
