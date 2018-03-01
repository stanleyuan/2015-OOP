var MyMenu = Framework.exClass(Framework.GameMainMenu , {
	//初始化loadingProgress需要用到的圖片
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};

        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        //console.log(Framework.ResourceManager.getFinishedRequestPercent())
        this.loading.draw(ctx);
        ctx.font ='90px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
    },

	load: function(){
		//Animation Sprite會用到的圖片資源        
        var photoLink = 
        [               
            define.imagePath + 'stroy/prologue_1_01.png',
            define.imagePath + 'stroy/prologue_1_02.png',
            define.imagePath + 'stroy/prologue_1_03.png',
            define.imagePath + 'stroy/prologue_1_04.png',
            define.imagePath + 'stroy/prologue_1_05.png',
            define.imagePath + 'stroy/prologue_2_01.png',
            define.imagePath + 'stroy/prologue_2_02.png',
            define.imagePath + 'stroy/prologue_2_03.png',
            define.imagePath + 'stroy/prologue_2_04.png',
            define.imagePath + 'stroy/prologue_2_05.png',
            define.imagePath + 'stroy/prologue_3_01.png',
            define.imagePath + 'stroy/prologue_3_02.png',
            define.imagePath + 'stroy/prologue_3_03.png',
            define.imagePath + 'stroy/prologue_3_04.png'
        ];

        this.startpic = new Framework.Sprite(define.imagePath + 'unnamed.png');
        this.startpic.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
        
        this.change = 0;
        
        this.docu = new Framework.Sprite(define.imagePath + 'howtoplay.jpg');
        this.docu.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
       

        this.photo = new Framework.AnimationSprite({url: photoLink, loop: true, speed: 0.1});
		
        //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
        //注意, Position都是用中心點
        this.center = new Framework.Scene();
        this.center.position = {
            x: Framework.Game.getCanvasWidth() / 2 + 450,
            y: Framework.Game.getCanvasHeight() / 2 - 200
        };

        this.photo.position = {
            x: 0,
            y: 0
        };

		this.rootScene.attach(this.docu);
            this.rootScene.attach(this.center); 
            this.center.attach(this.photo);
            this.photo.start();
       
        this.rootScene.attach(this.startpic);
        //讓AnimationSprite開始被播放
        this.audio = new Framework.Audio({
            song1:{
                mp3: define.musicPath + 'waiting.mp3',
            }
        });
        

        this.audio.play({name: 'song1', loop: true});
    },
	
    initialize: function() {
		
    },

    update:function(){     
        this.rootScene.update();
        if(this.change === 1){
            this.rootScene.detach(this.startpic);
            this.change += 1;
        }
        else if(this.change === 3){
            this.audio.stopAll();
            Framework.Game.goToNextLevel();
        }
        this.draw(this.ctx);
    },

    draw: function(parentCtx) { 
        //this.rootScene.draw();一定要在第一行
        this.ctx = parentCtx;
        this.rootScene.draw(parentCtx);
        
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        if(e.key === 'Enter'){
            this.change += 1;
        }
        if(e.key === 'F6'){
		this.audio.stopAll();
            Framework.Game.goToLevel('menu');
        }
        if(e.key === 'F7'){
		this.audio.stopAll();
            Framework.Game.goToLevel('menu');
        }
    
        
    
    },
});
