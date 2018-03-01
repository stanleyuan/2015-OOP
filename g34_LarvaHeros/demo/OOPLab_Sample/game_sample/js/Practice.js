var Practice = function (main, chara, icon, cases) {

    this.load = function(){
        this.pic = new Framework.AnimationSprite({url: define.imagePath + main, col: 7 , row: 6 , loop: false, speed: 1});
        
        if(cases === 1)
            this.picir = new Framework.AnimationSprite({url: define.imagePath + chara, col: 6 , row: 6 , loop: true, speed: 1});
        else if(cases === 2)
            this.picvi = new Framework.AnimationSprite({url: define.imagePath + chara, col: 8 , row: 6 , loop: true, speed: 1});
        this.position = {
	       x: 200,
	       y: 550
	    };
        this.moveflag = false;
        this.moveflagtime = 10;
        this.idleflag = false;
        this.idleflagtime = 10;
        this.deadflag = true;
        this.deadflagtime = 10;
        
        this.shadow = new Framework.Sprite(define.imagePath + 'shadow_01.png');
        this.shadow.position = {
            x: 200,
            y: -10 + this.position.y
        }
        
        
	    this.rotation = 0;
	    this.velocity = {
	    	horizential: 5,
	    	vertical: 10
	    };

        this.pic.start({from: 35, to: 38, loop: true});

        this.righthandside = 0;
        this.lefthandside = 0;
        this.up = 0;
        this.drop = 0;

        this.spot = new Framework.Sprite(define.imagePath + 'yellow.png');
        this.spot.position = {
            x: 250,
            y: 880
        }

        this.icon1 = new Framework.Sprite(define.imagePath + 'practice/image3.png');
        this.icon1.position = {
            x: 60,
            y: 52
        }
        this.icon2 = new Framework.Sprite(define.imagePath + icon);
        this.icon2.position = {
            x: 60,
            y: 52
        }
        

    };
        this.interval = 70;
        this.hittime = this.interval;
        this.health = 800;//400
        this.hitVal = 50;//30
        this.power = 0;
        this.changeval = 100;//0
        this.changetime = 0;
        this.changestatus = 0;

    this.initialize = function(){

    };

    this.update = function (map) {
        this.pic.position = this.position;
        this.pic.rotation = this.rotation;
        if(cases === 1){
            this.picir.position.x = this.position.x;
            this.picir.position.y = this.position.y - 30;
        }
        else if(cases === 2){
            this.picvi.position.x = this.position.x;
            this.picvi.position.y = this.position.y - 30;
        }    
        this.shadow.position.x = this.position.x;
        this.shadow.position.y = this.position.y+60;
        
        this.move(map);
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
    };

    this.keydown = function (e, list) {
        console.log(e);
        if (e.key === 'Right') {
            this.righthandside = 1;
            this.lefthandside = 0;
            this.running = 1;
        }
        if (e.key === 'Left') {
            this.lefthandside = 1;
            this.righthandside = 0;
            this.running = 1;
        }
        if (e.key === 'Space') {
            //this.up = 1;
            this.hitpara = 1;
        }
        if (e.key ==='Tab'){
            this.changepara = 1;
        }
    };

    this.keyup = function (e, list) {
        console.log(e);
        if (e.key === 'Right') {
            this.righthandside = 0;
            this.running = 0;
        }
        if (e.key === 'Left') {
            this.lefthandside = 0; 
            this.running = 0;
        }
        if (e.key === 'Space') {
            //up = 0;
            this.hitpara = 0;
        }
        if (e.key ==='Tab'){
            this.changepara = 0;
        }

    };
    this.move = function (map) {
        if(this.idleflag === true && this.righthandside != 1 && this.lefthandside != 1 && this.health > 0){
            if(this.changestatus === 0){
                this.pic.start({from: 35, to: 38, loop: false});
            }
            else if(cases === 1 && this.changestatus === 1){
                this.picir.start({from: 18, to: 19, loop: false})
            }
            else if(cases === 2 && this.changestatus === 1){
                this.picvi.start({from: 24, to: 30, loop: false, speed: 2})   
            }
            this.idleflag = false;
            this.idleflagtime = 0;    
        }
    
        if (this.righthandside === 1) {
			//1500 is half width of map
            if(this.moveflag === true){
                if(this.changestatus === 0){
                this.pic.start({from: 21, to: 23, loop: false});
                }
                else if(cases === 1 && this.changestatus === 1){
                    this.picir.start({from: 24, to: 26, loop: false});
                }
                else if(cases === 2 && this.changestatus === 1){
                    this.picvi.start({from: 32, to: 34, loop: false});   
                }
                
                this.moveflag = false;
                this.moveflagtime = 0;
            }
	     	if(map <= 1500 && map >= 95){
            	this.position.x += this.velocity.horizential;
                if(this.position.x > Framework.Game.getCanvasWidth()/2){
                    this.position.x -= this.velocity.horizential;
                };	
			};
            
			if(map <= 105){
				this.position.x += this.velocity.horizential;
				if(this.position.x >= (Framework.Game.getCanvasWidth() - 250)) {
					this.position.x -= this.velocity.horizential;
				};    
			};
        }

        else if (this.lefthandside === 1) {
            if(this.moveflag === true){
                if(this.changestatus === 0){
                    this.pic.start({from: 28, to: 30, loop: false});
                }
                else if(cases === 1 && this.changestatus === 1){
                    this.picir.start({from: 30, to: 32, loop: false});
                }
                else if(cases === 2 && this.changestatus === 1){
                    this.picvi.start({from: 40, to: 42, loop: false});   
                }
                
                this.moveflag = false;
                this.moveflagtime = 0;
            }
            if(map >= 90 && map <= 1500){
                this.position.x -= this.velocity.horizential;
                if (this.position.x < Framework.Game.getCanvasWidth()/2) {
                this.position.x += this.velocity.horizential;   
                };            
            };

            if(map >= 1490){
                this.position.x -= this.velocity.horizential;
                if(this.position.x <= 190){
                    this.position.x += this.velocity.horizential;
                };
            };
        }
	};
    
    this.hit = function () {
        if (this.hitpara === 1 && this.hittime === this.interval){
            if(this.changestatus === 0){
                this.pic.start({from: 0, to: 7, loop: false, speed: 2});
            }
            else if(cases === 1 && this.changestatus === 1){
                this.picir.start({from: 0, to: 4, loop: false, speed: 2});
            }
            else if(cases === 2 && this.changestatus === 1){
                this.picvi.start({from: 0, to: 8, loop: false, speed: 3});
            }
            this.hittime = 0;
            
        }       
    };
    
    this.beHit = function (cost) {
            if(this.changestatus === 0){
                this.pic.start({from: 7, to: 9, loop: false, speed: 2});
            }
            else if(cases === 1 && this.changestatus === 1){
                this.picir.start({from: 6, to: 8, loop: false});
            }
            else if(cases === 2 && this.changestatus === 1){
                this.picvi.start({from: 16, to: 19, loop: false});   
            }
        this.pic.start({from: 7, to: 9, loop: false});
        this.health -= cost;
        console.log("Practice " + this.health);
        this.cost = cost;
    }

    this.dead = function() {
        if(this.deadflag === true){
            if(this.changestatus === 0){
                this.pic.start({from: 14, to: 18, loop: false, speed: 2});
            }
            else if(cases === 1 && this.changestatus === 1){
                this.picir.start({from: 12, to: 17, loop: false});
            }
            else if(cases === 2 && this.changestatus === 1){
                this.picvi.start({from: 16, to: 19, loop: false});   
            }
            this.deadflag = false;
            this.deadflagtime = 0;
        }
    };
    
    this.draw = function(ctx){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.lineWidth = 25;
        ctx.moveTo(120, 30);
        ctx.lineTo(120 + 360*(this.health/800), 30);
        ctx.strokeStyle = 'red';
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 25;
        ctx.moveTo(110, 882);
        ctx.lineTo(110 + this.changeval, 882);
        ctx.strokeStyle = 'blue';
        ctx.lineCap = 'round';
        ctx.stroke();

    };
};
