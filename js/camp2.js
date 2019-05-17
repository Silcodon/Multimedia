
class level1 extends Phaser.Scene{
    
    constructor(){
        super("levelone");
    }

    preload() {
     
      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("map", "../resources/mapa1.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/normal_walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('jump', "../resources/jump_music.mp3");
      this.load.spritesheet('apple', '../resources/apple.png',{frameWidth: 23, frameHeight: 26});
      this.load.audio('death', "../resources/death.mp3");
      this.load.audio('music', '../resources/background_music.mp3');
    }

    create() {

      
      map = this.make.tilemap({key: "map"}); 
      const tileset = map.addTilesetImage("1234", "tiles");
      

        var background = this.add.tileSprite(460, 160, 4000, 1080, "background");

        
       gLayer = map.createStaticLayer("GroundLayer", tileset, 0,0);
       bgLayer = map.createStaticLayer("BackgroundLayer", tileset, 0,0);
       deathLayer = map.createStaticLayer("DeathLayer", tileset,0,0);
      

      gLayer.setCollisionByExclusion([-1]); //Player colide com este layer
      deathLayer.setCollisionByExclusion([-1]);
      

      //Inicio e fim de jogo
     
      //Fisica do jogo
      
     
      jump_sound = this.sound.add('jump');// Som do salto
      death_sound = this.sound.add('death'); //Som da morte
      music = this.sound.add('music');
      music.loop = true;
      
      music.play();
      // //Player
      player = this.physics.add.sprite(100, 0,'player');
      apple = this.physics.add.sprite(800,50, 'apple');


      player.setBounce(0.2);
      player.setCollideWorldBounds(true); 
      apple.setBounce(0.2);
      apple.setCollideWorldBounds(true);
      this.physics.add.overlap(player, apple);



     
      this.physics.add.collider(player, deathLayer, function deathHandler(){
         death_sound.play();
         player.destroy();
         player = this.physics.add.sprite(100, 0,'player');
         this.physics.add.collider(player, gLayer);
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
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); //Camara nao sair das bordas
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

         if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
            this.scene.start("leveltwo");
        
        }
    }



 

}
class level2 extends Phaser.Scene{
    
    constructor(){
        super("leveltwo");
    }

    preload() {

      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("map2", "../resources/mapa2.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/normal_walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('jump', "../resources/jump_music.mp3");
      this.load.spritesheet('apple', '../resources/apple.png',{frameWidth: 23, frameHeight: 26});
      this.load.audio('death', "../resources/death.mp3");
    }

    create() {

    ;
      map2 = this.make.tilemap({key: "map2"}); 
      const tileset = map.addTilesetImage("1234", "tiles");
      

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


      player.setBounce(0.2);
      player.setCollideWorldBounds(true); 
      apple.setBounce(0.2);
      apple.setCollideWorldBounds(true);
      this.physics.add.overlap(player, apple);



     
      this.physics.add.collider(player, deathLayer, function deathHandler(){
        death_sound.play()
         player.destroy();
         player = this.physics.add.sprite(100, 400,'player');
         this.physics.add.collider(player, gLayer);
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
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); //Camara nao sair das bordas
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

         if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
            this.scene.start("levelthree");
        
        }
    }



 

}

class level3 extends Phaser.Scene{
    constructor(){
        super("levelthree");
    }

    preload() {

      this.load.image("tiles", "../resources/1234.png");
      this.load.tilemapTiledJSON("map3", "../resources/mapa2.json");
      this.load.image("background", "../resources/bg.png");
      this.load.spritesheet('player', "../resources/normal_walk.png",{frameWidth: 60, frameHeight: 58});
      this.load.audio('jump', "../resources/jump_music.mp3");
      this.load.spritesheet('apple1', '../resources/apple1.png',{frameWidth: 23, frameHeight: 26});
      this.load.spritesheet('apple2', '../resources/apple2.png',{frameWidth: 23, frameHeight: 26});
      this.load.spritesheet('apple3', '../resources/apple3.png',{frameWidth: 23, frameHeight: 26});
      this.load.audio('death', "../resources/death.mp3");
    }

    create() {

    ;
      map3 = this.make.tilemap({key: "map3"}); 
      const tileset = map.addTilesetImage("1234", "tiles");
      

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
      player = this.physics.add.sprite(100,400 ,'player');
      apple1 = this.physics.add.sprite(150,50, 'apple1');
      apple2 = this.physics.add.sprite(200,50, 'apple2');
      apple3 = this.physics.add.sprite(250,50, 'apple3');


      player.setBounce(0.2);
      player.setCollideWorldBounds(true); 
      apple1.setBounce(0.2);
      apple1.setCollideWorldBounds(true);
       apple2.setBounce(0.2);
      apple2.setCollideWorldBounds(true);
       apple3.setBounce(0.2);
      apple3.setCollideWorldBounds(true);
      this.physics.add.overlap(player, apple1);
      this.physics.add.overlap(player, apple2);
      this.physics.add.overlap(player, apple3);


     
      this.physics.add.collider(player, deathLayer, function deathHandler(){
        death_sound.play()
         player.destroy();
         player = this.physics.add.sprite(100, 400,'player');
         this.physics.add.collider(player, gLayer);
         this.physics.add.collider(player, deathLayer, deathHandler, null, this);
        }
        , null, this);


       this.physics.add.collider(player, gLayer);
      this.physics.add.collider(apple1, gLayer);
      this.physics.add.collider(apple2, gLayer);
      this.physics.add.collider(apple3, gLayer);
     
     

        
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
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); //Camara nao sair das bordas
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

         if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
            this.scene.start("levelone");
        
        }
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
    scene: [level3]
};
var game = new Phaser.Game(config);

var player,apple, cursors, jump_sound, death_sound, start, end, music;
var map,map2,map3, gLayer, bgLayer, deathLayer;

