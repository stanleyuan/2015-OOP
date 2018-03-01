var end = Framework.exClass(Framework.GameMainMenu , {
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
            define.imagePath + 'end/Screenshot from 2015-06-22 22_07_24.png',
            define.imagePath + 'end/Screenshot from 2015-06-22 22_07_35.png',
            define.imagePath + 'end/Screenshot from 2015-06-22 22_07_42.png',
            define.imagePath + 'end/Screenshot from 2015-06-22 22_07_51.png',
            define.imagePath + 'end/Screenshot from 2015-06-22 22_07_58.png',
            define.imagePath + 'end/Screenshot from 2015-06-22 22_08_05.png',
            define.imagePath + 'end/Screenshot from 2015-06-22 22_08_10.png'
            
        ];

        

        this.photo = new Framework.AnimationSprite({url: photoLink, loop: true, speed: 1});
		
		//注意, Position都是用中心點
        this.center = new Framework.Scene();
        this.center.position = {
            x: Framework.Game.getCanvasWidth() / 2 ,
            y: Framework.Game.getCanvasHeight() / 2
        };

        
        this.photo.position = {
            x: 0,
            y: 0
        };

       
		
        this.center.attach(this.photo);

        //rootScene為系統預設的容器, 由於其他東西都被attach到center上
        //將物件attach到center上, 順序是會影響繪製出來的效果的
        this.rootScene.attach(this.center);

        //讓AnimationSprite開始被播放
        this.photo.start();
        this.audio = new Framework.Audio({
            song5:{
                mp3: define.musicPath + 'BLUES.mp3',
            }
        });
        this.allpass = new Framework.Sprite(define.imagePath + '4a2978a40ff0a (1).jpg');
        this.allpass.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};

        this.audio.play({name: 'song5', loop: true});
    },
	
    initialize: function() {
		
    },

    update:function(){     
        this.rootScene.update();
    },

    draw: function(parentCtx) { 
        this.rootScene.draw(parentCtx);
        
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        if(e.key === 'Enter'){
        	this.rootScene.attach(this.allpass);
			this.allpass.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
        }
        if(e.key === 'F6'){
            Framework.Game.goToLevel('menu');
        }
        if(e.key === 'F7'){
            Framework.Game.goToLevel('menu');
        }
    
    }
});
