
//FALTA
//2 - MENU PAUSA

class level1 extends Phaser.Scene{
    
    constructor(){
        super("levelone");
    }

    preload() {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('pause').style.display = 'none';
         this.load.image("tiles", "../resources/1234.png");
         this.load.audio('music', "../resources/background_music2.mp3");
      this.load.tilemapTiledJSON("map", "../resources/mapa1.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('jump', "../resources/jump_music.mp3");
      this.load.spritesheet('apple', '../resources/apple.png',{frameWidth: 23, frameHeight: 26});
      this.load.audio('death', "../resources/death.mp3");
      this.load.spritesheet('slime', '../resources/enemy.png',{frameWidth: 32, frameHeight: 20});

    
    }




    create() {
         
      
      map1 = this.make.tilemap({key: "map"}); 
      const tileset = map1.addTilesetImage("1234", "tiles");
      

        var background = this.add.tileSprite(460, 160, 4000, 1080, "background");

     gLayer = map1.createStaticLayer("GroundLayer", tileset, 0,0);
       bgLayer = map1.createStaticLayer("BackgroundLayer", tileset, 0,0);
       deathLayer = map1.createStaticLayer("DeathLayer", tileset,0,0);
      
       
       console.log(deathLayer);
         gLayer.setCollisionByExclusion([-1]); //Player colide com este layer
       deathLayer.setCollisionByExclusion([-1]);
      

     
      //Fisica do jogo
      
     
      jump_sound = this.sound.add('jump');// Som do salto
      death_sound = this.sound.add('death'); //Som da morte
      // //Player
      player = this.physics.add.sprite(100, 0,'player');
      apple = this.physics.add.sprite(800,50, 'apple');
      enemy = this.physics.add.sprite(400, 200, 'slime');
      enemy2 = this.physics.add.sprite(1010, 100, 'slime');
     

      player.setBounce(0.2);
      player.setCollideWorldBounds(true); 
      enemy.setBounce(0.2);
      enemy.setCollideWorldBounds(true); 
      enemy2.setBounce(0.2);
      enemy2.setCollideWorldBounds(true);
      apple.setBounce(0.2);
      apple.setCollideWorldBounds(true);
      this.physics.add.overlap(player, apple);



     
      this.physics.add.collider(player, deathLayer, function deathHandler(){
         death_sound.play();
         player.destroy();
         player = this.physics.add.sprite(100, 0,'player');
         this.physics.add.collider(player, gLayer);
         this.physics.add.overlap(player, enemy, deathHandler, null, this);
         this.physics.add.overlap(player, enemy2, deathHandler, null, this);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);
        }
        , null, this);


       this.physics.add.collider(player, gLayer);
      this.physics.add.collider(apple, gLayer);
      this.physics.add.collider(enemy, gLayer);
      this.physics.add.collider(enemy2, gLayer);

      this.physics.add.overlap(player, enemy, function deathHandler(){
         death_sound.play();
         player.destroy();
         player = this.physics.add.sprite(100, 0,'player');
         this.physics.add.overlap(player, enemy2, deathHandler, null, this);
         this.physics.add.collider(player, gLayer);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);

         this.physics.add.overlap(player, enemy, deathHandler, null, this);

      }, null, this);
        this.physics.add.overlap(player, enemy2, function deathHandler(){
         death_sound.play();
         player.destroy();
         player = this.physics.add.sprite(100, 0,'player');
         this.physics.add.overlap(player, enemy, deathHandler, null, this);
         this.physics.add.collider(player, gLayer);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);

         this.physics.add.overlap(player, enemy2, deathHandler, null, this);

      }, null, this);

     
     
     

        
      //Animação do player
      const anims = this.anims;
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('player', {start: 0, end: 10}),
        frameRate: 10,
        repeat: -1
         });
       this.anims.create({
        key: "idle",
        frames: [{key: 'player', frame: 5}],
        frameRate: 20,
         });

      //Inputs 
      cursors = this.input.keyboard.createCursorKeys();
      
      //Camera a seguir o player e a nao sair do mapa
      this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels); //Camara nao sair das bordas
      this.cameras.main.startFollow(player); //Seguir o player

    }

    update(time, delta) {

        var boundsA = player.getBounds();
        var boundsB = apple.getBounds();

      //Horizontal movement
      if (cursors.left.isDown) {
        player.body.setVelocityX(-150);
        player.anims.play("walk", true);
        player.flipX = true;
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(150);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
      } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
      if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-300);
            jump_sound.play();

        }
        
        this.moveEnemy1(enemy);
        this.moveEnemy2(enemy2);

         if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
            this.scene.start("leveltwo");
        
        }
    }


    moveEnemy1(enemy){
      if(enemy.x < 500){
        enemy.flipX = true;
        enemy.x+=1;
 
        if(enemy.x==500){
          enemy.flipX = false;
          for(let i = 0; i < 140; i++){
            enemy.x-=1;
          }
      
          }
          
        }
      }

      moveEnemy2(enemy){
      if(enemy.x < 1135){
        enemy.flipX = true;
        enemy.x+=1;
 
        if(enemy.x==1135){
          enemy.flipX = false;
          for(let i = 0; i < 140; i++){
            enemy.x-=1;
          }
          
          }
          
        }
      }

}

class level2 extends Phaser.Scene{
    
    constructor(){
        super("leveltwo");
    }

    preload() {

       document.getElementById('game-over').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("map2", "../resources/mapa2.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('jump', "../resources/jump_music.mp3");
      this.load.spritesheet('apple', '../resources/apple.png',{frameWidth: 23, frameHeight: 26});
      this.load.audio('death', "../resources/death.mp3");
      this.load.spritesheet('slime', '../resources/enemy.png',{frameWidth: 32, frameHeight: 20});
    }

    create() {

      map2 = this.make.tilemap({key: "map2"}); 
      const tileset = map2.addTilesetImage("1234", "tiles");
      

        var background = this.add.tileSprite(460, 160, 4000, 1080, "background");

        
       gLayer = map2.createStaticLayer("GroundLayer", tileset, 0,0);
       bgLayer = map2.createStaticLayer("BackgroundLayer", tileset, 0,0);
       deathLayer = map2.createStaticLayer("DeathLayer", tileset,0,0);
      

      gLayer.setCollisionByExclusion([-1]); //Player colide com este layer
      deathLayer.setCollisionByExclusion([-1]);
      

      //Inicio e fim de jogo
     
      //Fisica do jogo
      
    death_sound = this.sound.add('death'); //Som da morte
      
      jump_sound = this.sound.add('jump');// Som do salto
      
      // //Player
      player = this.physics.add.sprite(100,400 ,'player');
      apple = this.physics.add.sprite(150,50, 'apple');
      enemy = this.physics.add.sprite(750, 300, 'slime');
      enemy2 = this.physics.add.sprite(750, 50, 'slime');

      player.setBounce(0.2);
      player.setCollideWorldBounds(true); 
      apple.setBounce(0.2);
      apple.setCollideWorldBounds(true);
       enemy.setBounce(0.2);
      enemy.setCollideWorldBounds(true);
       enemy2.setBounce(0.2);
      enemy2.setCollideWorldBounds(true);
      this.physics.add.overlap(player, apple);


       this.physics.add.overlap(player, enemy, function deathHandler(){
         death_sound.play();
         player.destroy();
         player = this.physics.add.sprite(100, 400,'player');
         this.physics.add.overlap(player, enemy2, deathHandler, null, this);
         this.physics.add.collider(player, gLayer);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);

         this.physics.add.overlap(player, enemy, deathHandler, null, this);

      }, null, this);
        this.physics.add.overlap(player, enemy2, function deathHandler(){
         death_sound.play();
         player.destroy();
         player = this.physics.add.sprite(100, 400,'player');
         this.physics.add.overlap(player, enemy, deathHandler, null, this);
         this.physics.add.collider(player, gLayer);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);

         this.physics.add.overlap(player, enemy2, deathHandler, null, this);

      }, null, this);
     
      this.physics.add.collider(player, deathLayer, function deathHandler(){
        death_sound.play()
         player.destroy();
         player = this.physics.add.sprite(100, 400,'player');
         this.physics.add.collider(player, gLayer);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);
          this.physics.add.overlap(player, enemy, deathHandler, null, this);
           this.physics.add.overlap(player, enemy2, deathHandler, null, this);
        }
        , null, this);


       this.physics.add.collider(player, gLayer);
      this.physics.add.collider(apple, gLayer);
      this.physics.add.collider(enemy, gLayer);
      this.physics.add.collider(enemy2, gLayer);
     
     

        
      //Animação do player
      const anims = this.anims;
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('player', {start: 0, end: 10}),
        frameRate: 10,
        repeat: -1
         });
       this.anims.create({
        key: "idle",
        frames: [{key: 'player', frame: 5}],
        frameRate: 20,
         });

      //Inputs 
      cursors = this.input.keyboard.createCursorKeys();
      
      //Camera a seguir o player e a nao sair do mapa
      this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels); //Camara nao sair das bordas
      this.cameras.main.startFollow(player); //Seguir o player

    }

    update(time, delta) {

        var boundsA = player.getBounds();
        var boundsB = apple.getBounds();

      //Horizontal movement
      if (cursors.left.isDown) {
        player.body.setVelocityX(-150);
        player.anims.play("walk", true);
        player.flipX = true;
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(150);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
      } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
      if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-300);
            jump_sound.play();

        }
        this.moveEnemy1(enemy);
        this.moveEnemy2(enemy2);

         if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
            this.scene.start("levelthree");
        
        }
    }

    moveEnemy1(enemy){
      if(enemy.x < 850){
        enemy.flipX = true;
        enemy.x+=1;
 
        if(enemy.x==850){
          enemy.flipX = false;
          for(let i = 0; i < 130; i++){
            enemy.x-=1;
          }
      
          }
          
        }
      }

      moveEnemy2(enemy){
      if(enemy.x < 850){
        enemy.flipX = true;
        enemy.x+=1;
 
        if(enemy.x==850){
          enemy.flipX = false;
          for(let i = 0; i < 130; i++){
            enemy.x-=1;
          }
          
          }
          
        }
      }

}

class level3 extends Phaser.Scene{
    constructor(){
        super("levelthree");
    }

    preload() {
       document.getElementById('game-over').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("map3", "../resources/mapa3.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('jump', "../resources/jump_music.mp3");
      this.load.spritesheet('apple', '../resources/apple1.png',{frameWidth: 23, frameHeight: 26});
      this.load.audio('death', "../resources/death.mp3");
      this.load.spritesheet('slime', '../resources/enemy.png',{frameWidth: 32, frameHeight: 20});
      this.load.spritesheet('fox', '../resources/fox_walk.png', {frameWidth: 121, frameHeight: 45})
    }

    create() {
   
    
      map3 = this.make.tilemap({key: "map3"}); 
      const tileset = map3.addTilesetImage("1234", "tiles");
      

        var background = this.add.tileSprite(460, 160, 4000, 1080, "background");

        
       gLayer = map3.createStaticLayer("GroundLayer", tileset, 0,0);
       bgLayer = map3.createStaticLayer("BackgroundLayer", tileset, 0,0);
       deathLayer = map3.createStaticLayer("DeathLayer", tileset,0,0);
      

      gLayer.setCollisionByExclusion([-1]); //Player colide com este layer
      deathLayer.setCollisionByExclusion([-1]);
      

      //Inicio e fim de jogo
     
      //Fisica do jogo
      
    death_sound = this.sound.add('death'); //Som da morte
      
      jump_sound = this.sound.add('jump');// Som do salto
      
      // //Player
      player = this.physics.add.sprite(150,200 ,'player');
      apple1 = this.physics.add.sprite(400,450, 'apple');
      apple2 = this.physics.add.sprite(1075,450, 'apple');
      apple3 = this.physics.add.sprite(725,500, 'apple');
      apple4 = this.physics.add.sprite(725,200, 'apple');
      enemy = this.physics.add.sprite(725,200, 'slime');
      boss = this.physics.add.sprite(800, 400, 'fox');

      jimmy = this.physics.add.sprite(1000, 500, 'player');


      player.setBounce(0.2);
      player.setCollideWorldBounds(true); 
        boss.setBounce(0.2);
      boss.setCollideWorldBounds(true); 
       enemy.setBounce(0.2);
      enemy.setCollideWorldBounds(true); 
      apple1.setBounce(0.2);
      apple1.setCollideWorldBounds(true);
       apple2.setBounce(0.2);
      apple2.setCollideWorldBounds(true);
       apple3.setBounce(0.2);
      apple3.setCollideWorldBounds(true);
       apple4.setBounce(0.2);
      apple4.setCollideWorldBounds(true);
      jimmy.setBounce(0.2);
      jimmy.setCollideWorldBounds(true);


      this.physics.add.collider(jimmy, gLayer);
      jimmy.flipX = true;

     
     this.physics.add.collider(player, deathLayer, function deathHandler(){
            apple1.destroy();
            apple2.destroy();
            apple3.destroy();
            apple4.destroy();
            apple1 = this.physics.add.sprite(400,450, 'apple');
            apple2 = this.physics.add.sprite(1075,450, 'apple');
            apple3 = this.physics.add.sprite(725,500, 'apple');
            apple4 = this.physics.add.sprite(725,200, 'apple');
            score = 0;
          
            death_sound.play();
            player.destroy();
            player = this.physics.add.sprite(150, 200,'player');
           this.physics.add.collider(player, gLayer);
           this.physics.add.collider(apple1, gLayer);
           this.physics.add.collider(apple2, gLayer);
           this.physics.add.collider(apple3, gLayer);
           this.physics.add.collider(apple4, gLayer);
           this.physics.add.collider(player, deathLayer, deathHandler, null, this);

           this.physics.add.overlap(player, enemy, deathHandler, null, this);
           this.physics.add.overlap(player, boss, deathHandler, null, this);
           
          this.physics.add.overlap(player, apple1, function hitApple1(){
          apple1.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal');            
          }
        }, null, this);
             this.physics.add.overlap(player, apple2, function hitApple2(){
          apple2.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
           this.scene.start('levelfinal'); 
          }
        }, null, this);
            this.physics.add.overlap(player, apple3, function hitApple3(){
           apple3.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
            
          }
        }, null, this);
           this.physics.add.overlap(player, apple4, function hitApple4(){
              apple4.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
            
          }
      
        }, null, this);

      }, null, this);


       this.physics.add.collider(player, gLayer);
      this.physics.add.collider(apple1, gLayer);
      this.physics.add.collider(apple2, gLayer);
      this.physics.add.collider(apple3, gLayer);
       this.physics.add.collider(apple4, gLayer);
       this.physics.add.collider(enemy, gLayer);
       this.physics.add.collider(boss, gLayer);
     
     

        
      //Animação do player
      const anims = this.anims;
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('player', {start: 0, end: 10}),
        frameRate: 10,
        repeat: -1
         });
       this.anims.create({
        key: "idle",
        frames: [{key: 'player', frame: 5}],
        frameRate: 20,
         });

       //Animação do boss
      
       this.anims.create({
        key: "fox_walk",
        frames: this.anims.generateFrameNames('fox', {start:0, end:39}),
        frameRate:15,
        repeat: -1
       });






        this.physics.add.overlap(player, apple1, function hitApple1(){
          apple1.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
        }, null, this);
        this.physics.add.overlap(player, apple2, function hitApple2(){
          apple2.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
              this.scene.start('levelfinal'); 
          }
        }, null, this);
        this.physics.add.overlap(player, apple3, function hitApple3(){
           apple3.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
        }, null, this);
        this.physics.add.overlap(player, apple4, function hitApple4(){
              apple4.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
      
        }, null, this);

        this.physics.add.overlap(player, enemy, function deathHandler(){
            apple1.destroy();
            apple2.destroy();
            apple3.destroy();
            apple4.destroy();
            apple1 = this.physics.add.sprite(400,450, 'apple');
            apple2 = this.physics.add.sprite(1075,450, 'apple');
            apple3 = this.physics.add.sprite(725,500, 'apple');
            apple4 = this.physics.add.sprite(725,200, 'apple');
            score = 0;
          
            death_sound.play();
            player.destroy();
            player = this.physics.add.sprite(150, 200,'player');
           this.physics.add.collider(player, gLayer);
           this.physics.add.collider(apple1, gLayer);
           this.physics.add.collider(apple2, gLayer);
           this.physics.add.collider(apple3, gLayer);
           this.physics.add.collider(apple4, gLayer);
           this.physics.add.collider(player, deathLayer, deathHandler, null, this);

           this.physics.add.overlap(player, enemy, deathHandler, null, this);
           this.physics.add.overlap(player, boss, deathHandler, null, this);
          this.physics.add.overlap(player, apple1, function hitApple1(){
          apple1.destroy();
          delay: 200;
          score++;
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
        }, null, this);
             this.physics.add.overlap(player, apple2, function hitApple2(){
          apple2.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
        }, null, this);
            this.physics.add.overlap(player, apple3, function hitApple3(){
           apple3.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
        }, null, this);
           this.physics.add.overlap(player, apple4, function hitApple4(){
              apple4.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
      
        }, null, this);

      }, null, this);
         
        this.physics.add.overlap(player, boss, function deathHandler(){
            apple1.destroy();
            apple2.destroy();
            apple3.destroy();
            apple4.destroy();
            apple1 = this.physics.add.sprite(400,450, 'apple');
            apple2 = this.physics.add.sprite(1075,450, 'apple');
            apple3 = this.physics.add.sprite(725,500, 'apple');
            apple4 = this.physics.add.sprite(725,200, 'apple');
            score = 0;
          
            death_sound.play();
            player.destroy();
            player = this.physics.add.sprite(150, 200,'player');
           this.physics.add.collider(player, gLayer);
           this.physics.add.collider(apple1, gLayer);
           this.physics.add.collider(apple2, gLayer);
           this.physics.add.collider(apple3, gLayer);
           this.physics.add.collider(apple4, gLayer);
           this.physics.add.collider(player, deathLayer, deathHandler, null, this);

           this.physics.add.overlap(player, enemy, deathHandler, null, this);
           this.physics.add.overlap(player, boss, deathHandler, null, this);
           
          this.physics.add.overlap(player, apple1, function hitApple1(){
          apple1.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal');           }
        }, null, this);
             this.physics.add.overlap(player, apple2, function hitApple2(){
          apple2.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
        }, null, this);
            this.physics.add.overlap(player, apple3, function hitApple3(){
           apple3.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
        }, null, this);
           this.physics.add.overlap(player, apple4, function hitApple4(){
              apple4.destroy();
          delay: 200;
          score++;
          console.log(score);
          if(score == 4){
            this.scene.start('levelfinal'); 
          }
      
        }, null, this);

      }, null, this);

      //Inputs 
      cursors = this.input.keyboard.createCursorKeys();
      
      //Camera a seguir o player e a nao sair do mapa
      this.cameras.main.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels); //Camara nao sair das bordas
      this.cameras.main.startFollow(player); //Seguir o player

    }

    update(time, delta) {



      //Horizontal movement
      if (cursors.left.isDown) {
        player.body.setVelocityX(-150);
        player.anims.play("walk", true);
        player.flipX = true;
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(150);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
      } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
      if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-300);
            jump_sound.play();

        }

        this.moveEnemy1(enemy);
        this.moveBoss(boss);


    }
    moveEnemy1(enemy){
      if(enemy.x < 825){
        enemy.flipX = true;
        enemy.x+=1;
 
        if(enemy.x==825){
          enemy.flipX = false;
          for(let i = 0; i < 175; i++){
            enemy.x-=1;
          }
      
          }
          
        }
      }
         moveBoss(enemy){
          enemy.anims.play('fox_walk', true);
      if(enemy.x < 1150){
        enemy.flipX = true;
        enemy.x+=5;
        if(enemy.x==1150){
          
          for(let i = 0; i < 850; i++){
            enemy.x-=1;
          }
      
          }
          
        }
      }


}
class prelevel extends Phaser.Scene{
   constructor(){
        super("prelevel");
    }

    preload(){
      document.getElementById('game-over').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
      this.load.plugin('DialogModalPlugin', '../js/dialog_plugin.js');
      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("map1", "../resources/prelevel.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('music', '../resources/background_music.mp3');
      this.load.image('next', '../resources/button.png');
      this.load.spritesheet('fox', '../resources/fox_walk.png', {frameWidth: 121, frameHeight: 45});
    

    }

    create(){
         
      music = this.sound.add('music');
      music.loop = true;
      music.play();
      mappre = this.make.tilemap({key: "map1"}); 
      const tileset = mappre.addTilesetImage("1234", "tiles");
      var background = this.add.tileSprite(460, 160, 4000, 1080, "background");
      
     var button = this.add.tileSprite(1350, 430,32,32, 'next').setInteractive().on('pointerdown', () => {
      this.scene.start("levelzero");

     });
      cursors = this.input.keyboard.createCursorKeys();

        const anims = this.anims;
        this.anims.create({
        key: "fox_walk",
        frames: this.anims.generateFrameNames('fox', {start:0, end:39}),
        frameRate:15,
        repeat: -1
       });
          this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('player', {start: 0, end: 10}),
        frameRate: 10,
        repeat: -1
         });
       this.anims.create({
        key: "idle",
        frames: [{key: 'player', frame: 5}],
        frameRate: 20,
         });



      
        
      gLayer = mappre.createStaticLayer("GroundLayer", tileset, 0,0);
      bgLayer = mappre.createStaticLayer("BackgroundLayer", tileset, 0,0);
      gLayer.setCollisionByExclusion([-1]);
       bgLayer.setCollisionByExclusion([-1]);
      

      

      
      /*Dialogo plugin*/
      this.sys.install('DialogModalPlugin');
      this.sys.dialogModal.init();
      this.sys.dialogModal.setText('Tudo começou quando o Kangoo voltava do seu treino de boxe...', true);
       timedEvent = this.time.delayedCall(1000, function(){
        player = this.physics.add.sprite(300, 100,'player');
         player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, gLayer);
      }, [], this);

      timedEvent = this.time.delayedCall(6000, function(){
        this.sys.dialogModal.setText('Estava ansioso por testar a sua nova técnica de boxe no seu filho!', true);
      }, [], this);

      timedEvent = this.time.delayedCall(11000, function(){
        this.sys.dialogModal.setText('Contudo... Por mais que procurasse não o encontrava.', true);
      }, [], this);
      timedEvent = this.time.delayedCall(15500, function(){
        this.sys.dialogModal.setText('O pequeno Jimmy estava desaparecido.\nKangoo: "Mas onde andará aquele puto estúpido?!"\nQuestionou-se o pai.', true);
      }, [], this);
      timedEvent = this.time.delayedCall(24000, function(){
        this.sys.dialogModal.setText('Foi nessa altura que ele avistou ao longe o que parecia ser uma raposa.', true);
      }, [], this);
      timedEvent = this.time.delayedCall(27000, function(){
        enemy = this.physics.add.sprite(1000, 100,'fox');

         enemy.setBounce(0.2);
      enemy.setCollideWorldBounds(true);
      this.physics.add.collider(enemy, gLayer);
      }, [], this);
      timedEvent = this.time.delayedCall(30000, function(){
        this.sys.dialogModal.setText('Raposa: "Ora ora meu caro Kangoo, andas à procura de alguma coisa?"', true);
      }, [], this);

      timedEvent = this.time.delayedCall(35000, function(){
        this.sys.dialogModal.setText("Kangoo: Tu?! Espera... Quem és tu mesmo?", true);

      }, [], this);

        timedEvent = this.time.delayedCall(40000, function(){
        this.sys.dialogModal.setText('Pixy: "Boa piada Kangoo, não finjas que não me conheces, sabes perfeitamente quem eu sou.\n Sou a maléfica raposa Pixy!"', true);
      }, [], this);

        timedEvent = this.time.delayedCall(49000, function(){
        this.sys.dialogModal.setText('Kangoo: "O que é queres de mim?"', true);
      }, [], this);
        timedEvent = this.time.delayedCall(53000, function(){
        this.sys.dialogModal.setText('Pixy: "Ahah, nada! Apenas pensei que quisesses dizer adeus ao teu pequeno Jimmy"', true);
      }, [], this);

        timedEvent = this.time.delayedCall(60000, function(){
        jimmy = this.physics.add.sprite(1200, 100,'player');
        jimmy.flipX = true;
        jimmy.setBounce(0.2);
        jimmy.setCollideWorldBounds(true);
        this.physics.add.collider(jimmy, gLayer);
        this.sys.dialogModal.setText('Jimmy: "PAAAAAAAAAAAAAAAI. AJUUUUDAAA-MEEEEE"', true);
      }, [], this);

         timedEvent = this.time.delayedCall(66000, function(){
        this.sys.dialogModal.setText('Kangoo: "Ai de ti que toques no meu filho. Preciso de alguém para me lavar a loiça!\nOu queres ser tu a fazê-lo?!"', true);
      }, [], this);
          timedEvent = this.time.delayedCall(75000, function(){
        this.sys.dialogModal.setText('Pixy: "Estás demasiado engraçado para quem tem o seu filho prestes a ser raptado."', true);
      }, [], this);
           timedEvent = this.time.delayedCall(81000, function(){
        this.sys.dialogModal.setText('Kangoo: "Porque sei que o vou salvar!"', true);
      }, [], this);
           timedEvent = this.time.delayedCall(85000, function(){
        this.sys.dialogModal.setText('Pixy: "AHAHAHAHA! ISSO É O QUE VAMOS VER!"', true);
      }, [], this);
           timedEvent = this.time.delayedCall(90000, function(){
        this.sys.dialogModal.setText('Pixy: "Vá Jimmy despede-te do teu pai, receio que não o voltes a ver nunca mais!\nMUAHAHAHAHAHAH"', true);
      }, [], this);
            timedEvent = this.time.delayedCall(97000, function(){
        this.sys.dialogModal.setText('Kangoo: "Não te preocupes filho! Estou a ir buscar-te!"', true);
      }, [], this);
              timedEvent = this.time.delayedCall(102000, function(){
        this.sys.dialogModal.setText('Pixy: "Boa sorte Kangoo, vais precisar se quiseres ver o teu filho novamente."', true);
      }, [], this);
               timedEvent = this.time.delayedCall(100000, function(){
        enemy.flipX = true;
        enemy.anims.play('fox_walk', true);
        enemy.setVelocityX(70);
      }, [], this);
                timedEvent = this.time.delayedCall(101000, function(){
                   jimmy.flipX = false;
        jimmy.anims.play('walk', true);
        jimmy.setVelocityX(45);
      }, [], this);
                timedEvent = this.time.delayedCall(105500, function(){
                  enemy.destroy();
      }, [], this);
                timedEvent = this.time.delayedCall(105500, function(){
                  jimmy.destroy();
      }, [], this);

                timedEvent = this.time.delayedCall(108000, function(){
                  this.scene.start('levelzero');
                  
      }, [], this);




              





      


      
     
       
      
      
      
      
     


    }
    update(){

    }

}

class level0 extends Phaser.Scene{
  constructor(){
        super("levelzero");
    }

    preload() {
      document.getElementById('game-over').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("map0", "../resources/level0.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('jump', "../resources/jump_music.mp3");
      this.load.spritesheet('apple', '../resources/apple.png',{frameWidth: 23, frameHeight: 26});
      this.load.audio('death', "../resources/death.mp3");
      this.load.audio('music', "../resources/background_music.mp3");
    
    }




    create() {
         
      
      map0 = this.make.tilemap({key: "map0"}); 
      const tileset = map0.addTilesetImage("1234", "tiles");
      

        var background = this.add.tileSprite(460, 160, 4000, 1080, "background");

     gLayer = map0.createStaticLayer("GroundLayer", tileset, 0,0);
       bgLayer = map0.createStaticLayer("BackgroundLayer", tileset, 0,0);
       deathLayer = map0.createStaticLayer("DeathLayer", tileset,0,0);
      
    
         gLayer.setCollisionByExclusion([-1]); //Player colide com este layer
       deathLayer.setCollisionByExclusion([-1]);
      

     
      //Fisica do jogo
      
     
      jump_sound = this.sound.add('jump');// Som do salto
      death_sound = this.sound.add('death'); //Som da morte
      // //Player
      player = this.physics.add.sprite(100, 0,'player');
      apple = this.physics.add.sprite(1420,200, 'apple');

     

      player.setBounce(0.2);
      player.setCollideWorldBounds(true); 

      apple.setBounce(0.2);
      apple.setCollideWorldBounds(true);
      this.physics.add.overlap(player, apple, function winLevel(){
        this.scene.start('levelone');
      }, null, this);



     
      this.physics.add.collider(player, deathLayer, function deathHandler(){
         death_sound.play();
         player.destroy();
         player = this.physics.add.sprite(100, 0,'player');
         this.physics.add.collider(player, gLayer);
          this.physics.add.overlap(player, apple, function winLevel(){
        this.scene.start('levelone');
      }, null, this);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);
        }
        , null, this);


       this.physics.add.collider(player, gLayer);
      this.physics.add.collider(apple, gLayer);

     
     
     

        
      //Animação do player
      const anims = this.anims;
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('player', {start: 0, end: 10}),
        frameRate: 10,
        repeat: -1
         });
       this.anims.create({
        key: "idle",
        frames: [{key: 'player', frame: 5}],
        frameRate: 20,
         });

      //Inputs 
      cursors = this.input.keyboard.createCursorKeys();
      
      //Camera a seguir o player e a nao sair do mapa
      this.cameras.main.setBounds(0, 0, map0.widthInPixels, map0.heightInPixels); //Camara nao sair das bordas
      this.cameras.main.startFollow(player); //Seguir o player

    }

    update(time, delta) {

  

      //Horizontal movement
      if (cursors.left.isDown) {
        player.body.setVelocityX(-150);
        player.anims.play("walk", true);
        player.flipX = true;
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(150);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
      } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
      if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-300);
            jump_sound.play();

        }
        
      

        
    }


}

class levelfinal extends Phaser.Scene{
   constructor(){
        super("levelfinal");
    }

    preload(){
      document.getElementById('game-over').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
      this.load.plugin('DialogModalPlugin', '../js/dialog_plugin.js');
      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("mapfin", "../resources/mapafinal.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('music', '../resources/background_music.mp3');
      this.load.image('next', '../resources/button.png');
      this.load.spritesheet('fox', '../resources/fox_walk.png', {frameWidth: 121, frameHeight: 45});
    

    }

    create(){
         
      
      mapfin = this.make.tilemap({key: "mapfin"}); 
      const tileset = mapfin.addTilesetImage("1234", "tiles");
      var background = this.add.tileSprite(460, 160, 4000, 1080, "background");
      
     var button = this.add.tileSprite(1350, 430,32,32, 'next').setInteractive().on('pointerdown', () => {
      this.scene.start("creditos");

     });

      cursors = this.input.keyboard.createCursorKeys();

        const anims = this.anims;
        this.anims.create({
        key: "fox_walk",
        frames: this.anims.generateFrameNames('fox', {start:0, end:39}),
        frameRate:15,
        repeat: -1
       });
          this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('player', {start: 0, end: 10}),
        frameRate: 10,
        repeat: -1
         });
       this.anims.create({
        key: "idle",
        frames: [{key: 'player', frame: 5}],
        frameRate: 20,
         });



      
        
      gLayer = mapfin.createStaticLayer("GroundLayer", tileset, 0,0);
      bgLayer = mapfin.createStaticLayer("BackgroundLayer", tileset, 0,0);
      deathLayer = mapfin.createStaticLayer("DeathLayer", tileset, 0,0);
      gLayer.setCollisionByExclusion([-1]);
       bgLayer.setCollisionByExclusion([-1]);
      
      

      

      
      /*Dialogo plugin*/
      this.sys.install('DialogModalPlugin');
      this.sys.dialogModal.init();
      
       timedEvent = this.time.delayedCall(200, function(){
        this.sys.dialogModal.setText('Após derrotar a malvada Pixy, estava na altura de acabar com este conflito.', true);
        player = this.physics.add.sprite(300, 100,'player');
         player.setBounce(0.2);
      player.setCollideWorldBounds(true);
       jimmy = this.physics.add.sprite(200, 100,'player');
         jimmy.setBounce(0.2);
      jimmy.setCollideWorldBounds(true);
       enemy = this.physics.add.sprite(1000, 100,'fox');
         enemy.setBounce(0.2);
      enemy.setCollideWorldBounds(true);

      this.physics.add.collider(player, gLayer);
      this.physics.add.collider(jimmy, gLayer);
      this.physics.add.collider(enemy, gLayer);
      }, [], this);

      timedEvent = this.time.delayedCall(7000, function(){
        this.sys.dialogModal.setText('Pixy: "Não...Não pode ser. Mas...mas..."', true);
      }, [], this);

      timedEvent = this.time.delayedCall(11000, function(){
        this.sys.dialogModal.setText('Kangoo: "Pensavas que me conseguias derrotar?! AH! Aqueles treinos de boxe realmente serviram para alguma coisa!"', true);
      }, [], this);
      timedEvent = this.time.delayedCall(19000, function(){
        this.sys.dialogModal.setText('Jimmy: "Ahaha, toma toma toma, sua raposa feia. Eu sabia que o meu pai me conseguia salvar!"', true);
      }, [], this);
      timedEvent = this.time.delayedCall(26000, function(){
        this.sys.dialogModal.setText('Pixy: "O meu plano... foi... arruinado. Não acredito nisto!"', true);
      }, [], this);
      timedEvent = this.time.delayedCall(33000, function(){
        this.sys.dialogModal.setText('Kangoo: "Está na altura de ires embora Pixy. E nunca mais apareças aqui!"', true);
      }, [], this);
       timedEvent = this.time.delayedCall(39000, function(){
        this.sys.dialogModal.setText('Pixy: "Nunca mais me esquecerei deste dia.\n Eu irei voltar Kangoo, e quando o fizer, vais te arrepender de me teres deixado viver!"', true);
      }, [], this);
       timedEvent = this.time.delayedCall(40000, function(){
          enemy.flipX = true;
        enemy.anims.play('fox_walk', true);
        enemy.setVelocityX(50);
      }, [], this);
         timedEvent = this.time.delayedCall(47000, function(){
        enemy.destroy();
      }, [], this);
       timedEvent = this.time.delayedCall(48000, function(){
        this.sys.dialogModal.setText('Kangoo: "Vá Jimmy, vamos embora. Há muitos pratos lá em casa à tua espera!"', true);
      }, [], this);
       timedEvent = this.time.delayedCall(53000, function(){
        this.sys.dialogModal.setText('Jimmy: " :( "', true);
      }, [], this);

       timedEvent = this.time.delayedCall(47000, function(){
           player.flipX = true;
        player.anims.play('walk', true);
        player.setVelocityX(-35);
         jimmy.flipX = true;
        jimmy.anims.play('walk', true);
        jimmy.setVelocityX(-20);
      }, [], this);

       timedEvent = this.time.delayedCall(54000, function(){

        player.destroy()
        jimmy.destroy();
      }, [], this);

       timedEvent = this.time.delayedCall(56000, function(){
        this.scene.start('creditos');
      }, [], this);








   }
    update(){

    }


}

class creditos extends Phaser.Scene{
   constructor(){
        super("creditos");
    }

    preload(){
       
      this.load.image("background", "../resources/bg.png");
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    
    

    }
    create(){
      var background = this.add.tileSprite(460, 160, 4000, 1080, "background");
      var add = this.add;
    var input = this.input;

    WebFont.load({
        google: {
            families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ]
        },
        active: function ()
        {
            add.text(140, 100, 'OBRIGADO POR JOGARES!', { fontFamily: 'Splatch', fontSize: 65, color: '#000000' });

        }
    });


  document.getElementById('restart').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
    document.getElementById('endless').style.display = 'block';
  
    
   

 
}
}
var config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 640,
    parent: "game-container",
      physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 600},
            debug: false
        }
    },
    scene: [prelevel, level0, level1, level2, level3, levelfinal, creditos]
};
var game = new Phaser.Game(config);

var timedEvent,button,jimmy, player,apple,apple1, apple2, apple3, apple4, cursors, jump_sound, death_sound, start, end, music, enemy, enemy2, boss;
var map1,map2,map3,map0,mapfin, mappre, gLayer, bgLayer, deathLayer;
var score = 0;


