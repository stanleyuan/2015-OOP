var MyGame = Framework.Class(Framework.Level , {
    
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};

        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        this.loading.draw(ctx);
        ctx.font ='90px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
    
        ctx.font = '180pt bold';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        ctx.fillText("No.1", 350, 500, 600);

        ctx.font = '180pt bold';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        ctx.fillText("Defeat The Enemy", 1250, 500, 600);
    },

    load: function () {  
        this.deadtime = 0;

    this.gameMap = new GameMap();
    this.gameMap.load(define.imagePath + 'episode_1.jpg');
	this.gameMap.position = {
		x: 1500,
		y: 450
	}
    this.rootScene.attach(this.gameMap.map);

    this.bar = new Framework.Sprite(define.imagePath + 'ui_bar.png');
    this.bar.position = {
        x: 800,
        y: 900 - 110
    }
    this.rootScene.attach(this.bar);
    
    this.practicebar = new Framework.Sprite(define.imagePath + 'gauge_larva_bg.png');
    this.practicebar.position = {
        x: 250,
        y: 70
    }
    this.rootScene.attach(this.practicebar);
	
    this.enemycamp = new Camp('enemy_gate_01.png');
	this.enemycamp.load();
	this.enemycamp.position = {
		x: 1000,
		y: 500
	}
	this.rootScene.attach(this.enemycamp.building);

    this.bread = new Array();
    for(var k = 0; k <= 1000; k++){
        this.bread[k] = new Falling('unit_gauge.png');
        this.bread[k].load();    
    }
    this.breadNum = -1;
    this.newbread = 0;
    this.breadspeed = 2;
    this.breadup = 200;
    this.breadFirst = 0;
    this.breadgone = 900;

    this.mycamp = new Camp('home_01.png');
    this.mycamp.load();
    this.mycamp.building.position = {
        x: 300,
        y: 400
    }
	this.rootScene.attach(this.mycamp.building);

	
	this.enemy1 = new Array();
    this.enemy1[0] = new Enemy('enemy/mira_red.png', 1);
    this.enemy1[0].load(this.gameMap.position.x + 1500, 'gray.png');
    this.enemyNum = -1;
    this.newenemy = 150;
    this.enemyspeed = 1;//1
    this.enemyFirst = 0;
    this.enemyup = 600;
	
	
    this.army1 = new Array();
    this.army1[0] = new Army('army/baby_beetle.png', 'army/baby_beetle_normal.png', 1);
    this.army1[0].load('red.png');
    this.rootScene.attach(this.army1[0].icon);
    this.armyNum = -1;
    this.newarmy = -1;
    this.armyspeed = 1;
    this.armyFirst = 0;
    this.callarmy = 20;//10
    this.newarmytime = 350;
   
	
	this.practice = new Practice('practice/red_01.png', 'practice/red_iron.png', 'practice/gauge_icon_red_Iron.png', 1);
	this.practice.load();
    this.practice.rotation = 0;
	this.practice.velocity;
    this.rootScene.attach(this.practice.icon1);
    this.rootScene.attach(this.practice.shadow);
	this.rootScene.attach(this.practice.pic);
    this.rootScene.attach(this.practice.spot);

	this.pic = new Victory();
    this.pic.load();
    this.pic.position = {
        x: 800,
        y: -900
    }
    
    this.gameMap.update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside);
    this.enemycamp.update(this.gameMap.position.x);
    this.mycamp.update(this.gameMap.position.x);
    this.practice.update(this.gameMap.position.x);
    this.pic.update();

       
	    var characterPosition;
        characterPosition = {x: 400, y: 500};
	
        //載入要被播放的音樂清單
        //資料夾內只提供mp3檔案, 其餘的音樂檔案, 請自行轉檔測試
       this.audio = new Framework.Audio({
            song2:{
                mp3: define.musicPath + 'no111.mp3',
            },
            hit:{
                mp3: define.musicPath + 'kick2.mp3'
            },
            eat:{
                mp3: define.musicPath + 'Human Eating Peach.mp3'
            },
            beHit:{
                mp3: define.musicPath + 'hit.mp3'
            },
            buildinghit:{
                mp3: define.musicPath + 'Bale Elevator - Long.mp3'
            },
            win:{
                mp3: define.musicPath + 'win.mp3'
            },
            change:{
                mp3: define.musicPath + 'change.mp3'
            }
    
        });
    

        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({name: 'song2', loop: true});

	},

   	initialize: function() {
        
                           
    },

    update: function () {
	var defeate1 = 0;
	var stop ;

	this.rootScene.update();     
	this.practice.update(this.gameMap.position.x);
    this.practice.spot.position.x = 245 + (this.practice.position.x - this.gameMap.mapleft) / 3000 * (690 - 245);
	this.enemycamp.update(this.gameMap.position.x);
    this.enemycamp.position.x = this.gameMap.position.x + 1300;
    this.enemycamp.position.y = 450;
    this.mycamp.update(this.gameMap.position.x);
    this.mycamp.position.x = this.gameMap.position.x - 1310;
	this.gameMap.update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside);
    this.pic.update();

    //PRACTICE
    if(this.practice.changepara === 1 && this.practice.changeval === 100){
        this.rootScene.detach(this.practice.pic);
        this.rootScene.detach(this.practice.icon1);
        this.rootScene.attach(this.practice.picir);
        this.rootScene.attach(this.practice.icon2);
        this.practice.hitVal = 100;
		this.practice.health = 800; 
        this.practice.changepara = 0;
        this.practice.changeval= 0;
        this.practice.changestatus = 1;
    }
    if(this.practice.changestatus === 1){
        this.practice.changetime += 1;
        if(this.practice.changetime === 1800){
            this.rootScene.detach(this.practice.picir);
            this.rootScene.detach(this.practice.icon2);
            this.rootScene.attach(this.practice.pic);
            this.rootScene.attach(this.practice.icon1);
            this.practice.hitVal = 30;
            this.practice.changestatus = 0;
        }
    }
    //hit-practice
    for(var j = this.enemyFirst; j <= this.enemyNum; j += 1){
            if((this.enemy1[j].position.x - this.practice.position.x <= 110) && (this.enemy1[j].position.x - this.practice.position.x > 0)){
                if(Math.random() >= 0.8  && (this.enemy1[j].hittime === this.enemy1[j].interval)){
                    this.enemy1[j].hit();
                    this.practice.beHit(this.enemy1[j].hitVal);
                    this.audio.play({name: 'beHit', loop: false});
                }
            }
    }

    if(this.practice.hitpara === 1){
        this.practicehit = 1;
        for(var j = this.enemyFirst; j <= this.enemyNum; j += 1){
            if((this.enemy1[j].position.x - this.practice.position.x <= 110) && (this.enemy1[j].position.x - this.practice.position.x > 0)){
                if(this.practicehit === 1 && this.practice.hittime === this.practice.interval){
                    console.log("beHit");
                    this.enemy1[j].beHit(this.practice.hitVal);
                    if(this.practice.changeval < 100){
                        this.practice.changeval+= 10;
                    }
                    this.practice.hit();
                    this.audio.play({name: 'hit', loop: false});
                }
            }
        }
        this.practicehit = 0;
    }
    for(var j = this.enemyFirst; j <= this.enemyNum; j += 1){
            if(this.enemy1[j].health <= 0){
                this.rootScene.detach(this.enemy1[j].ene);
                this.rootScene.detach(this.enemy1[j].ene);
                this.rootScene.detach(this.enemy1[j].spot);
                this.enemy1[j].position.x = this.enemycamp.position.x + 500;
                this.enemy1[j].position.x += this.enemyspeed;
                //this.enemyFirst += 1;
            }
        }
    
    

    //ENEMY 
    if(this.newenemy === 0){
        this.enemyup = 150 + Math.round(Math.random()*(299)+1) ;
    }
    this.newenemy += 1;
    if (this.newenemy >= this.enemyup) {
        if(this.enemyNum < 99){
            this.enemyNum += 1;
        }
        this.enemy1[this.enemyNum] = new Enemy('enemy/mira_red.png', 1);
        this.enemy1[this.enemyNum].load(this.enemycamp.position.x, 'gray.png');
        this.rootScene.attach(this.enemy1[this.enemyNum].shadow);
        this.rootScene.attach(this.enemy1[this.enemyNum].ene);
        this.rootScene.attach(this.enemy1[this.enemyNum].spot);
        this.newenemy = 0;  
    }
    for(var j = this.enemyFirst; j <= this.enemyNum; j += 1){
        this.enemy1[j].update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside);
        if(this.enemy1[j].position.x >= (this.mycamp.position.x + 250)){
            this.enemy1[j].position.x -= this.enemyspeed;
            this.enemy1[j].run();

            if((this.enemy1[j].position.x - this.practice.position.x <= 100) && (this.enemy1[j].position.x - this.practice.position.x > 0)){
                this.enemy1[j].position.x += this.enemyspeed;
            }
            this.enemy1[j].spot.position.x = 245 + (this.enemy1[j].position.x - this.gameMap.mapleft) / 3000 * (690 - 245)
        }
    }


    //ARMY
    if(this.newarmytime != 350){
        this.newarmytime += 1;
    }
    if(this.newarmy === 1 && this.callarmy >= 10 && this.newarmytime === 350){
        if(this.armyNum < 99){
            this.armyNum += 1;
        }
        this.army1[this.armyNum] = new Army('army/baby_beetle.png', 'army/baby_beetle_normal.png', 1);
        this.army1[this.armyNum].load('red.png');
        this.army1[this.armyNum].position.x = this.mycamp.position.x;
        this.rootScene.attach(this.army1[this.armyNum].shadow);
        this.rootScene.attach(this.army1[this.armyNum].arm);
        this.rootScene.attach(this.army1[this.armyNum].spot);
        this.newarmy = 0;
        this.callarmy -= 10;
        this.newarmytime = 0;
    }
    

    //hit-army & enemy
    
    for(var k = this.armyFirst; k <= this.armyNum; k += 1){
        this.army1[k].update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside);
        this.army1[k].spot.position.x = 245 + (this.army1[k].position.x - this.gameMap.mapleft) / 3000 * (690-245);

        if(this.army1[k].position.x <= (this.enemycamp.position.x - 250)){
                this.army1[k].position.x += this.armyspeed;
                this.army1[k].run();
        }

        for(var p = this.enemyFirst; (p <= this.enemyNum); p += 1){
            if((this.enemy1[p].position.x - this.army1[k].position.x <= 100) && (this.enemy1[p].position.x - this.army1[k].position.x > 0)){
                this.enemy1[p].position.x += this.enemyspeed;
                this.army1[k].position.x -= this.armyspeed;
            
                this.army1[k].idle();
            }
             
            var whofirst = Math.round(Math.random());
            if((this.enemy1[p].position.x - this.army1[k].position.x <= 110) && (this.enemy1[p].position.x - this.army1[k].position.x > 0) && (this.army1[k].hittime === this.army1[k].interval) && whofirst === 1){
                console.log("beHit");
                    this.army1[k].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.enemy1[p].beHit(this.army1[k].hitVal);
                
            }
            if((this.enemy1[p].position.x - this.army1[k].position.x <= 110) && (this.enemy1[p].position.x - this.army1[k].position.x > 0) && (this.enemy1[p].hittime === this.enemy1[p].interval) && whofirst === 0){
                    this.enemy1[p].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.army1[k].beHit(this.enemy1[p].hitVal);  
            }
            if((this.enemy1[p].position.x - this.army1[k].position.x <= 110) && (this.enemy1[p].position.x - this.army1[k].position.x > 0) && ((this.army1[k].hittime === this.army1[k].interval) || (this.enemy1[p].hittime === this.enemy1[p].interval))){
                console.log("beHit");
                var whofirst = Math.round(Math.random());
                if(whofirst === 1){
                    this.army1[k].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.enemy1[p].beHit(this.army1[k].hitVal);
                }
                if(whofirst === 0){
                    this.enemy1[p].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.army1[k].beHit(this.enemy1[p].hitVal);
                }
            }
            
            if(this.enemy1[p].health <= 0){
                this.enemy1[p].dead();
                this.rootScene.detach(this.enemy1[p].ene);
                this.rootScene.detach(this.enemy1[p].spot);
                this.enemy1[p].position.x = this.enemycamp.position.x + 500;
                this.enemy1[p].position.x += this.enemyspeed;
            }
            if(this.army1[k].health <= 0){
                this.army1[k].dead();
                this.rootScene.detach(this.army1[k].arm);
                this.rootScene.detach(this.army1[k].spot);
                this.army1[k].position.x = this.mycamp.position.x - 500;
                this.army1[k].position.x -= this.armyspeed;
                
            }
        }
    }

    //BREAD
    this.newbread += 1;
    if(this.newbread === this.breadup){
        this.breadNum += 1;
        this.bread[this.breadNum].position.x = 600 + Math.round(Math.random()*(399)+1);
        this.rootScene.attach(this.bread[this.breadNum].things);
        this.newbread = 0;
        this.breadup = 350 + Math.round(Math.random()*(99)+1);
    }
     for(var j = this.breadFirst; j <= this.breadNum; j += 1){
        this.bread[j].update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside);
        if(this.bread[j].position.y < 550){
            this.bread[j].position.y += this.breadspeed;
        }
        this.bread[j].count += 1;

        if(this.bread[j].count === this.breadgone){
            this.rootScene.detach(this.bread[j].things);
            this.bread[j].position.y = 1000;
        }
        if(Math.abs(this.bread[j].position.x - this.practice.position.x) < 50 && Math.abs(this.bread[j].position.y - this.practice.position.y) < 50){
            this.rootScene.detach(this.bread[j].things);
            this.audio.play({name: 'eat', loop: false});
            this.bread[j].position.y = 1000;
            this.callarmy += 10;
        }
    }

    //ENEMYCAMP
    if((this.enemycamp.position.x - this.practice.position.x <= 300) && (this.enemycamp.position.x - this.practice.position.x > 0) && this.practice.hitpara === 1){
        if(Math.random() >= 0.8){
            this.practice.hit();
            this.enemycamp.beHit(this.practice.hitVal);
            this.audio.play({name: 'buildinghit', loop: false});
        }
    }
    for(var o = this.armyFirst; o <= this.armyNum; o++){
        if((this.enemycamp.position.x - this.army1[o].position.x <= 300) && (this.enemycamp.position.x - this.army1[o].position.x > 0)){
            if(Math.random() >= 0.8){
                this.army1[o].hit();
                this.audio.play({name: 'buildinghit', loop: false});
                this.enemycamp.beHit(this.army1[o].hitVal);
                console.log(this.enemycamp.health + " jjjj");
            }
        }
    }
    if(this.enemycamp.health <= 0){
        this.rootScene.detach(this.enemycamp.building);
        this.enemycamp.position.y = -1000;
    }

    //victory
    if(this.enemycamp.position.y === -1000) {
        this.pic.position.y = 400;
        this.enemycamp.position.y += 100;
        this.rootScene.attach(this.pic.victory);
        this.audio.play({name: 'win', loop: false});     
    }
    if(this.enemycamp.position.y === -900 && this.nextlevel === 1){
        this.audio.play({name: 'change', loop: false})
                this.audio.stopAll();

        Framework.Game.goToNextLevel();
    }
    

    //MYCAMP
    for(var o = this.enemyFirst; o <= this.enemyNum; o++){
        if((this.mycamp.position.x - this.enemy1[o].position.x >= -250)){
            if(Math.random() >= 0.8){
                this.enemy1[o].hit();
                this.mycamp.beHit(this.enemy1[o].hitVal);
                this.audio.play({name: 'buildinghit', loop: false});
            }
        }
    }
    if(this.mycamp.health <= 0){
        this.rootScene.detach(this.mycamp.building);
        this.mycamp.position.y = -1000;
    }

    //LOSS
    if(this.mycamp.position.y === -1000) {
        this.pic.position.y = 450;
        this.rootScene.attach(this.pic.loss);
    }
    
    if(this.practice.health <= 0 ){
        this.practice.dead();
        this.deadtime += 1;
    }
    if(this.deadtime === 60 && this.enemycamp.position.y != -1000){
        if(this.changestatus === 0){
            this.rootScene.detach(this.practice.pic);    
        }
        else{
            this.rootScene.detach(this.practice.picir);    
        }
        this.rootScene.detach(this.practice.spot);
        this.practice.position.x = this.mycamp.position.x;
        this.pic.position.y = 450;
        this.rootScene.attach(this.pic.loss);
        this.changestatus = 0;
    }
    },
	

    draw:function(parentCtx){
	
        this.rootScene.draw();
        if(this.practice.changestatus == 0 && this.practice.health > 0){
            this.practice.pic.draw(parentCtx);
        }
        else if(this.practice.changestatus == 1 && this.practice.health > 0){
            this.practice.picir.draw(parentCtx);   
        }
        
        if(this.mycamp.health > 0 && this.enemycamp.health > 0 && this.practice.health > 0){
            this.practice.draw(parentCtx);
            this.mycamp.draw(parentCtx, 300);
            this.enemycamp.draw(parentCtx, -300);
            for(var l = 0; l <= this.enemyNum; l++){
                this.enemy1[l].draw(parentCtx, 'gray');
            }
            
            for(var l = 0; l <= this.armyNum; l++){
                this.army1[l].draw(parentCtx, 'red');
            }   
        }
       

        parentCtx.font = '30pt bold';
        parentCtx.fillStyle = 'black';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText(this.callarmy, 140, 805, 50 );

        

        parentCtx.font = '27pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('10', 300, 828, 50 );

        parentCtx.fillStyle = "black";
        parentCtx.globalAlpha = 0.5;
        parentCtx.fillRect(255, 735, 100, 95 - (this.newarmytime / 350 * 95));
    },

	mousemove:function(e, list){
        console.log("X: "+e.x+" Y: "+e.y);
    },

    
    keyup:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        this.practice.keyup(e, list);
        if(e.key === 'R'){
            this.newarmy = 0;
        }
        if(e.key === 'Enter')
            this.change = 0;
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        this.practice.keydown(e, list);
        if(e.key === 'R'){
            this.newarmy = 1;
        }
        if(e.key === 'Enter'){
           this.nextlevel = 1;
        }
        if(e.key === 'F6'){
                    this.audio.stopAll();

            Framework.Game.goToLevel('level1');
        }
        if(e.key === 'F7'){
                    this.audio.stopAll();

            Framework.Game.goToLevel('menu');
        }
        if(e.key === '2'){
                    this.audio.stopAll();

            Framework.Game.goToLevel('level2');
        }
    },
});
