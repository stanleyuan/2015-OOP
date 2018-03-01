var MyGame2 = Framework.Class(Framework.Level , {
    
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
        ctx.fillText("No.2", 350, 500, 600);

        ctx.font = '180pt bold';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        ctx.fillText("Protect The Prince", 1250, 500, 600);
    },

    load: function () {  


        this.deadtime = 0;

    this.gameMap = new GameMap();
    this.gameMap.load(define.imagePath + 'episode_7.jpg');
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
    this.enemy1Num = -1;
    this.newenemy1 = -1;
    this.enemy1speed = 1.5;//1.5
    this.enemy1First = 0;
    this.enemy1up = 600;

    this.enemy2 = new Array();
    this.enemy2[0] = new Enemy('enemy/mira_large.png', 2);
    this.enemy2[0].load(this.gameMap.position.x + 1500, 'black.png');
    this.enemy2Num = -1;
    this.newenemy2 = -1;
    this.enemy2speed = 1;//1
    this.enemy2First = 0;
    this.enemy2up = 600;
    
    
    this.army1 = new Array();
    this.army1[0] = new Army('army/baby_beetle.png', 'army/baby_beetle_normal.png', 1);
    this.army1[0].load('red.png');
    this.rootScene.attach(this.army1[0].icon);
    this.army1Num = -1;
    this.newarmy1 = -1;
    this.army1speed = 1.5;
    this.army1First = 0;
    this.callarmy = 0;
    this.newarmy1time = 350;
    this.army1up = 10;

    this.army2 = new Array();
    this.army2[0] = new Army('army/black_knight.png', 'army/black_normal.png', 2);
    this.army2[0].load('reed.png');
    this.army2[0].icon.position = {
            x: 455,
            y: 785
        }
    this.rootScene.attach(this.army2[0].icon);
    this.army2Num = -1;
    this.newarmy2 = -1;
    this.army2speed = 1.3;
    this.army2First = 0;
    this.callarmy = 0;
    this.newarmy2time = 800;
    this.army2up = 20;

    this.prince = new Army('army/prince_walk_00.png',  'army/black_normal.png', 3);
    this.prince.load('blue.png');
    this.prince.health = 200;
    this.prince.healthbase = 200;
    this.prince.position.x = 100;
    this.prince.position.y = 555;
    this.prince.shadow.position.y = this.prince.position.y + 20;
    this.rootScene.attach(this.prince.shadow);
    this.rootScene.attach(this.prince.arm);
    this.rootScene.attach(this.prince.spot);
    
    this.practice = new Practice('practice/red_01.png', 'practice/red_viking.png', 'practice/gauge_icon_red_viking.png', 2);
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
            song3:{
                mp3: define.musicPath + 'Basement Jaxx - Do Your Thing.mp3',
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
            bighit:{
                mp3: define.musicPath + 'Big Explosion Cut Off.mp3'
            },
            buildinghit:{
                mp3: define.musicPath + 'Bale Elevator - Long.mp3'
            },
            win:{
                mp3: define.musicPath + 'win.mp3'
            }
    
        });
    

        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({name: 'song3', loop: true});
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
        this.rootScene.attach(this.practice.picvi);
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
            this.rootScene.detach(this.practice.picvi);
            this.rootScene.detach(this.practice.icon2);
            this.rootScene.attach(this.practice.pic);
            this.rootScene.attach(this.practice.icon1);
            this.practice.hitVal = 30;
            this.practice.changestatus = 0;
        }
    }

    //practice & enemy1
    for(var j = this.enemy1First; j <= this.enemy1Num; j += 1){
            if((this.enemy1[j].position.x - this.practice.position.x <= 110) && (this.enemy1[j].position.x - this.practice.position.x > 0)){
                if(Math.random() >= 0.8 && (this.enemy1[j].hittime === this.enemy1[j].interval)){
                    this.enemy1[j].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.practice.beHit(this.enemy1[j].hitVal);
                }
            }
    }
    if(this.practice.hitpara === 1){
        this.practicehit = 1;  
        for(var j = this.enemy1First; j <= this.enemy1Num; j += 1){
            if((this.enemy1[j].position.x - this.practice.position.x <= 110) && (this.enemy1[j].position.x - this.practice.position.x > 0)){
                if(this.practicehit === 1 && this.practice.hittime === this.practice.interval){
                    console.log("beHit");
                    this.enemy1[j].beHit(this.practice.hitVal);
                    if(this.practice.changeval < 100){
                        this.practice.changeval+= 10;//tmp
                    }
                    this.practice.hit();
                    this.audio.play({name: 'hit', loop: false});
                }
            }
        }
        this.practicehit = 0;
    }

     for(var j = this.enemy1First; j <= this.enemy1Num; j += 1){
            if(this.enemy1[j].health <= 0){
                this.enemy1[j].dead();
                this.rootScene.detach(this.enemy1[j].ene);
                this.rootScene.detach(this.enemy1[j].spot);
                this.enemy1[j].position.x = this.enemycamp.position.x + 500;
                this.enemy1[j].position.x += this.enemy1speed;
            }
        }
    //practice & enemy2
    if(this.enemy2Num > -1){
        for(var j = this.enemy2First; j <= this.enemy2Num; j += 1){
            if((this.enemy2[j].position.x - this.practice.position.x <= 190) && (this.enemy2[j].position.x - this.practice.position.x > 0)){
                if(Math.random() >= 0.8 && (this.enemy2[j].hittime === this.enemy2[j].interval)){
                    this.enemy2[j].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.practice.beHit(this.enemy2[j].hitVal);
                }
            }
        }
    }
    
    if(this.practice.hitpara === 1){
        this.practicehit = 1;  
        for(var j = this.enemy2First; j <= this.enemy2Num; j += 1){
            if((this.enemy2[j].position.x - this.practice.position.x <= 190) && (this.enemy2[j].position.x - this.practice.position.x > 0)){
                if(this.practicehit === 1 && this.practice.hittime === this.practice.interval){
                    console.log("beHit");
                    this.enemy2[j].beHit(this.practice.hitVal);
                    if(this.practice.changeval < 100){
                        this.practice.changeval+= 10;//tmp
                    }
                    this.practice.hit();
                    this.audio.play({name: 'hit', loop: false});
                }
            }
        }
        this.practicehit = 0;
    }
    for(var j = this.enemy2First; j <= this.enemy2Num; j += 1){
            if(this.enemy2[j].health <= 0){
                this.rootScene.detach(this.enemy2[j].ene);
                this.rootScene.detach(this.enemy2[j].spot);
                this.enemy2[j].position.x = this.enemycamp.position.x + 500;
                this.enemy2[j].position.x += this.enemy2speed;
            }
        }



    //prince
    this.prince.update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside, this.mycamp.position.x);
    if(this.prince.position.x <= (this.enemycamp.position.x - 250)){
        this.prince.position.x += 0.5;
        this.prince.run();
        this.prince.spot.position.x = 245 + (this.prince.position.x - this.gameMap.mapleft) / 3000 * (690-245);
    }
    for(var p = this.enemy1First; p <= this.enemy1Num; p += 1){
            if((this.enemy1[p].position.x - this.prince.position.x <= 300) && (this.enemy1[p].position.x - this.prince.position.x > 0)){
                if((this.enemy1[p].position.x - this.prince.position.x <= 100) && (this.enemy1[p].position.x - this.prince.position.x > 0))
                    this.enemy1[p].position.x += this.enemy1speed;
                this.prince.position.x -= 0.5;
            }
            if((this.enemy1[p].position.x - this.prince.position.x <= 110) && (this.enemy1[p].position.x - this.prince.position.x > 0) && (this.enemy1[p].hittime === this.enemy1[p].interval)){
                var whofirst = Math.round(Math.random());
                if(whofirst === 1){
                    this.enemy1[p].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.prince.beHit(this.enemy1[p].hitVal);
                    if(this.prince.health <= 0){
                        this.prince.position.x = this.mycamp.position.x - 1000;
                        this.rootScene.detach(this.prince.arm);
                    }
                    else{
                        this.princerunawaytime = 1;
                        this.princerunaway = 1;    
                    }
                }
            }
    }

    for(var p = this.enemy2First; p <= this.enemy2Num; p += 1){
            if((this.enemy2[p].position.x - this.prince.position.x <= 300) && (this.enemy2[p].position.x - this.prince.position.x > 0)){
                if((this.enemy2[p].position.x - this.prince.position.x <= 100) && (this.enemy2[p].position.x - this.prince.position.x > 0))
                    this.enemy2[p].position.x += this.enemy2speed;
                this.prince.position.x -= 0.5;
            }
            if((this.enemy2[p].position.x - this.prince.position.x <= 110) && (this.enemy2[p].position.x - this.prince.position.x > 0) && (this.enemy2[p].hittime === this.enemy2[p].interval)){
                var whofirst = Math.round(Math.random());
                if(whofirst === 1){
                    this.enemy2[p].hit();
                    this.audio.play({name: 'bighit', loop: false});
                    this.prince.beHit(this.enemy2[p].hitVal);
                    if(this.prince.health <= 0){
                        this.prince.position.x = this.mycamp.position.x - 1000;
                        this.rootScene.detach(this.prince.arm);
                    }
                    else{
                        this.princerunawaytime = 1;
                        this.princerunaway = 1;    
                    }
                }
            }
    }
    if(this.princerunawaytime != 150 && this.princerunaway == 1){
        this.princerunawaytime += 1;
        this.prince.position.x -= 2;
        if(this.princerunawaytime == 150)
            this.princerunaway == 0;
    }
        
    
        
    //enemy1 
    if(this.newenemy1 === 0){
        this.enemy1up = 200 + Math.round(Math.random()*(299)+1) ;
    }
    this.newenemy1 += 1;
    if (this.newenemy1 >= this.enemy1up) {
        if(this.enemy1Num < 99){
            this.enemy1Num += 1;
        }
        this.enemy1[this.enemy1Num] = new Enemy('enemy/mira_red.png', 1);
        this.enemy1[this.enemy1Num].load(this.enemycamp.position.x, 'gray.png');
        this.rootScene.attach(this.enemy1[this.enemy1Num].shadow);
        this.rootScene.attach(this.enemy1[this.enemy1Num].ene);
        this.rootScene.attach(this.enemy1[this.enemy1Num].spot);
        this.newenemy1 = 0;  
    }
    for(var j = this.enemy1First; j <= this.enemy1Num; j += 1){
        this.enemy1[j].update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside);
        if(this.enemy1[j].position.x >= (this.mycamp.position.x + 250)){
            this.enemy1[j].position.x -= this.enemy1speed;
            this.enemy1[j].run();

            if((this.enemy1[j].position.x - this.practice.position.x <= 100) && (this.enemy1[j].position.x - this.practice.position.x > 0)){
                this.enemy1[j].position.x += this.enemy1speed;
            }
            this.enemy1[j].spot.position.x = 245 + (this.enemy1[j].position.x - this.gameMap.mapleft) / 3000 * (690 - 245)
           //hit-practice
            
        }
    }
    


    //enemy2
    if(this.newenemy2 === 0){
        this.enemy2up = 500 + Math.round(Math.random()*(299)+1) ;
    }
    //console.log(this.enemy1up);
    this.newenemy2 += 1;
    if (this.newenemy2 >= this.enemy2up) {
        if(this.enemy2Num < 99){
            this.enemy2Num += 1;
        }
        this.enemy2[this.enemy2Num] = new Enemy('enemy/mira_large.png', 2);
        this.enemy2[this.enemy2Num].load(this.enemycamp.position.x, 'black.png');
        this.enemy2[this.enemy2Num].position.y = 550;
        this.enemy2[this.enemy2Num].shadow1.y = 650;
        this.enemy2[this.enemy2Num].hitVal = 25;
        this.enemy2[this.enemy2Num].health = 300;
        this.enemy2[this.enemy2Num].healthbase = 300;
        this.enemy2[this.enemy2Num].helf = 150;    
        this.enemy2[this.enemy2Num].position.y -= 50;
        this.rootScene.attach(this.enemy2[this.enemy2Num].shadow1);
        this.rootScene.attach(this.enemy2[this.enemy2Num].ene);
        this.rootScene.attach(this.enemy2[this.enemy2Num].spot);
        this.newenemy2 = 0;  
    }


    for(var j = this.enemy2First; j <= this.enemy2Num; j += 1){
        this.enemy2[j].update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside);
        if(this.enemy2[j].position.x >= (this.mycamp.position.x + 250)){
            this.enemy2[j].position.x -= this.enemy2speed;
            this.enemy2[j].run();

            if((this.enemy2[j].position.x - this.practice.position.x <= 180) && (this.enemy2[j].position.x - this.practice.position.x > 0)){
                this.enemy2[j].position.x += this.enemy2speed;
            }
            this.enemy2[j].spot.position.x = 245 + (this.enemy2[j].position.x - this.gameMap.mapleft) / 3000 * (690 - 245)
        }
    }
    

    //army1
    if(this.newarmy1time != 350){
        this.newarmy1time += 1;
    }
    if(this.newarmy1 === 1 && this.callarmy >= this.army1up && this.newarmy1time === 350){
        if(this.army1Num < 99){
            this.army1Num += 1;
        }
        this.army1[this.army1Num] = new Army('army/baby_beetle.png', 'army/baby_beetle_normal.png', 1);
        this.army1[this.army1Num].load('red.png');
        this.army1[this.army1Num].position.x = this.mycamp.position.x;
        this.rootScene.attach(this.army1[this.army1Num].shadow);
        this.rootScene.attach(this.army1[this.army1Num].arm);
        this.rootScene.attach(this.army1[this.army1Num].spot);
        this.newarmy1 = 0;
        this.callarmy -= 10;
        this.newarmy1time = 0;
    }
    

    //hit-army1 & enemy1
    for(var k = this.army1First; k <= this.army1Num; k += 1){
        this.army1[k].update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside, this.mycamp.position.x);
        this.army1[k].spot.position.x = 245 + (this.army1[k].position.x - this.gameMap.mapleft) / 3000 * (690-245);
        
        if(this.army1[k].position.x <= (this.enemycamp.position.x - 250)){
            this.army1[k].position.x += this.army1speed;
            this.army1[k].run();
        }
                

        for(var p = this.enemy1First; p <= this.enemy1Num; p += 1){
            if((this.enemy1[p].position.x - this.army1[k].position.x <= 100) && (this.enemy1[p].position.x - this.army1[k].position.x > 0)){
                this.enemy1[p].position.x += this.enemy1speed;
                //console.log("this.enemy1" + p + " " + this.enemy1[p].position.x);
                this.army1[k].position.x -= this.army1speed;
                this.army1[k].idle();
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
                this.rootScene.detach(this.enemy1[p].ene);
                this.rootScene.detach(this.enemy1[p].spot);
                this.enemy1[p].position.x = this.enemycamp.position.x + 500;
                this.enemy1[p].position.x += this.enemy1speed;
                //this.enemy1First += 1;
            }
            if(this.army1[k].health <= 0){
                this.rootScene.detach(this.army1[k].arm);
                this.rootScene.detach(this.army1[k].spot);
                this.army1[k].position.x = this.mycamp.position.x - 500;
                this.army1[k].position.x -= this.army1speed;
            }
        }
    }

    //hit-army1 & enemy2
    for(var k = this.army1First; k <= this.army1Num; k += 1){
         for(var p = this.enemy2First; p <= this.enemy2Num; p += 1){
            if((this.enemy2[p].position.x - this.army1[k].position.x <= 180) && (this.enemy2[p].position.x - this.army1[k].position.x > 0)){
                this.enemy2[p].position.x += this.enemy2speed;
                //console.log("this.enemy1" + p + " " + this.enemy1[p].position.x);
                this.army1[k].position.x -= this.army1speed;
                this.army1[k].idle();
            }
            if((this.enemy2[p].position.x - this.army1[k].position.x <= 190) && (this.enemy2[p].position.x - this.army1[k].position.x > 0) && ((this.army1[k].hittime === this.army1[k].interval) || (this.enemy2[p].hittime === this.enemy2[p].interval))){
                console.log("beHit");
                var whofirst = Math.round(Math.random());
                if(whofirst === 1){
                    this.army1[k].hit();
                    this.enemy2[p].beHit(this.army1[k].hitVal);
                    this.audio.play({name: 'beHit', loop: false});
                }
                if(whofirst === 0){
                    this.enemy2[p].hit();
                    this.audio.play({name: 'bighit', loop: false});
                    this.army1[k].beHit(this.enemy2[p].hitVal);  
                }
            }
            if(this.enemy2[p].health <= 0){
                this.rootScene.detach(this.enemy2[p].ene);
                this.rootScene.detach(this.enemy2[p].spot);
                this.enemy2[p].position.x = this.enemycamp.position.x + 500;
                this.enemy2[p].position.x += this.enemy2speed;
            }
            if(this.army1[k].health <= 0){
                this.rootScene.detach(this.army1[k].arm);
                this.rootScene.detach(this.army1[k].spot);
                this.army1[k].position.x = this.mycamp.position.x - 500;
                this.army1[k].position.x -= this.army1speed;
            }
        }
    }

    //army2
    if(this.newarmy2time != 800){
        this.newarmy2time += 1;
    }
    if(this.newarmy2 === 1 && this.callarmy >= this.army2up && this.newarmy2time === 800){
        if(this.army2Num < 45){
            this.army2Num += 1;
        }
        this.army2[this.army2Num] = new Army('army/black_knight.png', 'army/black_normal.png', 2);
        this.army2[this.army2Num].load('reed.png');
        this.army2[this.army2Num].position.y = 480;
        this.army2[this.army2Num].shadow1.position.y = 580;
        this.army2[this.army2Num].hitVal = 40;
        this.army2[this.army2Num].health = 300;
        this.army2[this.army2Num].healthbase = 300;
        this.army2[this.army2Num].helf = 150;
        this.army2[this.army2Num].position.x = this.mycamp.position.x;
        this.rootScene.attach(this.army2[this.army2Num].shadow1);
        this.rootScene.attach(this.army2[this.army2Num].arm);
        this.rootScene.attach(this.army2[this.army2Num].spot);
        this.newarmy2 = 0;
        this.callarmy -= this.army2up;
        this.newarmy2time = 0;
    }
    

    //hit-army2 & enemy1
    for(var k = this.army2First; k <= this.army2Num; k += 1){
        this.army2[k].update(this.practice.position.x, this.practice.velocity.horizential, this.practice.righthandside, this.practice.lefthandside, this.mycamp.position.x);
        this.army2[k].spot.position.x = 245 + (this.army2[k].position.x - this.gameMap.mapleft) / 3000 * (690-245);
        
        if(this.army2[k].position.x <= (this.enemycamp.position.x - 250)){
            this.army2[k].position.x += this.army2speed;
            this.army2[k].run();
        }
         
        for(var p = this.enemy1First; p <= this.enemy1Num; p += 1){
            if((this.enemy1[p].position.x - this.army2[k].position.x <= 180) && (this.enemy1[p].position.x - this.army2[k].position.x > 0)){
                this.enemy1[p].position.x += this.enemy1speed;
                this.army2[k].position.x -= this.army2speed;
            }
            if((this.enemy1[p].position.x - this.army2[k].position.x <= 190) && (this.enemy1[p].position.x - this.army2[k].position.x > 0) && ((this.army2[k].hittime === this.army2[k].interval) || (this.enemy1[p].hittime === this.enemy1[p].interval))){
                console.log("beHit");
                var whofirst = Math.round(Math.random());
                if(whofirst === 1){
                    this.army2[k].hit();
                    this.audio.play({name: 'bighit', loop: false});
                    this.enemy1[p].beHit(this.army2[k].hitVal);
                }
                if(whofirst === 0){
                    this.enemy1[p].hit();
                    this.audio.play({name: 'beHit', loop: false});
                    this.army2[k].beHit(this.enemy1[p].hitVal);  
                }
            }
            if(this.enemy1[p].health <= 0){
                this.rootScene.detach(this.enemy1[p].ene);
                this.rootScene.detach(this.enemy1[p].spot);
                this.enemy1[p].position.x = this.enemycamp.position.x + 500;
                this.enemy1[p].position.x += this.enemy1speed;
            }
            if(this.army2[k].health <= 0){
                this.rootScene.detach(this.army2[k].arm);
                this.rootScene.detach(this.army2[k].spot);
                this.army2[k].position.x = this.mycamp.position.x - 500;
                this.army2[k].position.x -= this.army2speed;
                
            }
        }
    }
    //army2 vs enemy2
    for(var k = this.army2First; k <= this.army2Num; k += 1){
         for(var p = this.enemy2First; p <= this.enemy2Num; p += 1){
            if((this.enemy2[p].position.x - this.army2[k].position.x <= 230) && (this.enemy2[p].position.x - this.army2[k].position.x > 0)){
                this.enemy2[p].position.x += this.enemy2speed;
                //console.log("this.enemy1" + p + " " + this.enemy1[p].position.x);
                this.army2[k].position.x -= this.army2speed;
            }
            if((this.enemy2[p].position.x - this.army2[k].position.x <= 240) && (this.enemy2[p].position.x - this.army2[k].position.x > 0) && ((this.army2[k].hittime === this.army2[k].interval) || (this.enemy2[p].hittime === this.enemy2[p].interval))){
                console.log("beHit");
                var whofirst = Math.round(Math.random());
                if(whofirst === 1){
                    this.army2[k].hit();
                    this.audio.play({name: 'bighit', loop: false});
                    this.enemy2[p].beHit(this.army2[k].hitVal);
                }
                if(whofirst === 0){
                    this.enemy2[p].hit();
                    this.audio.play({name: 'bighit', loop: false});
                    this.army2[k].beHit(this.enemy2[p].hitVal);  
                }
            }
            if(this.enemy2[p].health <= 0){
                this.rootScene.detach(this.enemy2[p].ene);
                this.rootScene.detach(this.enemy2[p].spot);
                this.enemy2[p].position.x = this.enemycamp.position.x + 500;
                this.enemy2[p].position.x += this.enemy2speed;
            }
            if(this.army2[k].health <= 0){
                this.rootScene.detach(this.army2[k].arm);
                this.rootScene.detach(this.army2[k].spot);
                this.army2[k].position.x = this.mycamp.position.x - 500;
                this.army2[k].position.x -= this.army2speed;
            }
        }
    }


    //BREAD
    this.newbread += 1;
    if(this.newbread === this.breadup){
        this.breadNum += 1;
        this.bread[this.breadNum].position.x = 700 + Math.round(Math.random()*(399)+1);
        this.rootScene.attach(this.bread[this.breadNum].things);
        this.newbread = 0;
        this.breadup = 150 + Math.round(Math.random()*(99)+1);
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
    

    //enemycamp
    if((this.enemycamp.position.x - this.practice.position.x <= 300) && (this.enemycamp.position.x - this.practice.position.x > 0) && this.practice.hitpara === 1){
        if(Math.random() >= 0.8){
            this.practice.hit();
            this.audio.play({name: 'buildinghit', loop: false});
            this.enemycamp.beHit(this.practice.hitVal);
            console.log(this.enemycamp.health + " jjjj");
        }
    }
    for(var o = this.army1First; o <= this.army1Num; o++){
        if((this.enemycamp.position.x - this.army1[o].position.x <= 300) && (this.enemycamp.position.x - this.army1[o].position.x > 0)){
            if(Math.random() >= 0.8){
                this.army1[o].hit();
                this.audio.play({name: 'buildinghit', loop: false});
                this.enemycamp.beHit(this.army1[o].hitVal);
                console.log(this.enemycamp.health + " jjjj");
            }
        }
    }
    for(var o = this.army2First; o <= this.army2Num; o++){
        if((this.enemycamp.position.x - this.army2[o].position.x <= 300) && (this.enemycamp.position.x - this.army2[o].position.x > 0)){
            if(Math.random() >= 0.8){
                this.army2[o].hit();
                this.audio.play({name: 'buildinghit', loop: false});
                this.enemycamp.beHit(this.army2[o].hitVal);
                console.log(this.enemycamp.health + " jjjj");
            }
        }
    }
    if(this.enemycamp.health <= 0){
        this.rootScene.detach(this.enemycamp.building);
        this.enemycamp.position.y = -1000;
    }

    //victory
    if(this.enemycamp.position.y === -1000 || this.prince.position.x >= this.enemycamp.position.x - 350 ) {
        this.pic.position.y = 400;
        this.enemycamp.position.y += 100;
        this.rootScene.attach(this.pic.victory);
    }
    if(this.enemycamp.position.y === -900 && this.nextlevel === 1){
        this.audio.stopAll();
            Framework.Game.goToNextLevel();
    }

    //MYCAMP
    for(var o = this.enemy1First; o <= this.enemy1Num; o++){
        if((this.mycamp.position.x - this.enemy1[o].position.x >= -250)){
            if(Math.random() >= 0.8){
                this.enemy1[o].hit();
                this.audio.play({name: 'buildinghit', loop: false});
                this.mycamp.beHit(this.enemy1[o].hitVal);
                console.log(this.mycamp.health + " jjjj");
            }
        }
    }
    for(var o = this.enemy2First; o <= this.enemy2Num; o++){
        if((this.mycamp.position.x - this.enemy2[o].position.x >= -250)){
            if(Math.random() >= 0.8){
                this.enemy2[o].hit();
                this.audio.play({name: 'buildinghit', loop: false});
                this.mycamp.beHit(this.enemy2[o].hitVal);
            }
        }
    }
    if(this.mycamp.health <= 0){
        this.rootScene.detach(this.mycamp.building);
        this.mycamp.position.y = -1000;
    }

    //LOSS
    if(this.mycamp.position.y === -1000 || this.prince.health <= 0) {
        this.pic.position.y = 450;
        this.rootScene.attach(this.pic.loss);
    }
    if(this.practice.health <= 0 ){
        this.practice.dead();
        this.deadtime += 1;
    }
    if(this.deadtime === 30 && this.enemycamp.position.y != -1000){
        if(this.changestatus === 0){
            this.rootScene.detach(this.practice.pic);    
        }
        else{
            this.rootScene.detach(this.practice.picvi);    
        }
        this.rootScene.detach(this.practice.spot);
        this.rootScene.detach(this.practice.shadow);
        this.practice.position.x = this.mycamp.position.x;
        this.pic.position.y = 450;
        this.rootScene.attach(this.pic.loss);
    }
    if(this.prince.health <= 0 && this.enemycamp.position.y != -1000){
        this.rootScene.detach(this.prince.arm);
        this.rootScene.detach(this.prince.spot);
        this.rootScene.detach(this.prince.shadow);
        this.prince.position.x = this.mycamp.position.x;
        this.pic.position.y = 450;
        this.rootScene.attach(this.pic.loss);
    }
    },
    

    draw:function(parentCtx){
    
        this.rootScene.draw();
         if(this.practice.changestatus == 0 && this.practice.health > 0){
            this.practice.pic.draw(parentCtx);
        }
        else if(this.practice.changestatus == 1 && this.practice.health > 0){
            this.practice.picvi.draw(parentCtx);   
        }
        
        if(this.mycamp.health > 0 && this.enemycamp.health > 0 && this.practice.health > 0){
            this.practice.draw(parentCtx);
            this.mycamp.draw(parentCtx, 300);
            this.enemycamp.draw(parentCtx, -300);
            for(var l = 0; l <= this.enemy1Num; l++){
                this.enemy1[l].draw(parentCtx, 'gray');
            }
            for(var l = 0; l <= this.enemy2Num; l++){
                this.enemy2[l].draw(parentCtx, 'gray');
            }
            for(var l = 0; l <= this.army1Num; l++){
                this.army1[l].draw(parentCtx, 'red');
            }
            for(var l = 0; l <= this.army2Num; l++){
                this.army2[l].draw(parentCtx, 'red');
            }   
        }
        this.prince.draw(parentCtx, 'blue');

        if(this.prince.health > 0)
            this.prince.arm.draw(parentCtx);

        this.prince.arm.draw(parentCtx);
        if(this.practice.changestatus == 0 && this.practice.health > 0){
            this.practice.pic.draw(parentCtx);
        }
        if(this.practice.changestatus == 1 && this.practice.health > 0){
            this.practice.picvi.draw(parentCtx);   
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
        parentCtx.fillText(this.army1up, 300, 828, 50 );

        parentCtx.font = '27pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText(this.army2up, 450, 828, 50 );

        parentCtx.fillStyle="black";
        parentCtx.globalAlpha=0.5;
        parentCtx.fillRect(255, 735, 100, 95 - (this.newarmy1time / 350 * 95));

        parentCtx.fillStyle="black";
        parentCtx.globalAlpha=0.5;
        parentCtx.fillRect(405, 735, 100, 95 - (this.newarmy2time / 800 * 95)); 
        
    },

    mousemove:function(e, list){
        console.log("X: "+e.x+" Y: "+e.y);
    },

    
    keyup:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        this.practice.keyup(e, list);
        if(e.key === 'R'){
            this.newarmy1 = 0;
        }
        if(e.key === 'E'){
            this.newarmy2 = 0;
        }
        if(e.key === 'Enter')
            this.change = 0;
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        this.practice.keydown(e, list);
        if(e.key === 'R'){
            this.newarmy1 = 1;
        }
        if(e.key === 'E'){
            this.newarmy2 = 1;
        }
        if(e.key === 'Enter'){
           this.nextlevel = 1;
        }
        if(e.key === 'F6'){
            this.audio.stopAll();
            Framework.Game.goToLevel('level2');
        }
        if(e.key === 'F7'){
            this.audio.stopAll();
            Framework.Game.goToLevel('menu');
        }
        if(e.key === '1'){
            this.audio.stopAll();
            Framework.Game.goToLevel('level1');
        }
        if(e.key === '8'){
            this.audio.stopAll();
            Framework.Game.goToLevel('end');
        }
    },
});
