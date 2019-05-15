var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 700,
    parent: "game-container",
      physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 600},
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player, cursors;
function preload() {
  this.load.image("tiles", "../resources/1234.png");
  this.load.tilemapTiledJSON("map", "../resources/mapa1.json");
  this.load.image("background", "../resources/bg.png");
  this.load.spritesheet('player', "../resources/normal_walk.png",{frameWidth: 60, frameHeight: 58});
}

function create() {
  
  const map = this.make.tilemap({key: "map"}); 
  const tileset = map.addTilesetImage("1234", "tiles");
  var background = this.add.tileSprite(460, 160, 4000, 1080, "background");

  const gLayer = map.createStaticLayer("GroundLayer", tileset, 0,0);
  const bgLayer = map.createStaticLayer("BackgroundLayer", tileset, 0,0);


  
  //Fisica do jogo
  
 

  
  // //Player
  player = this.physics.add.sprite(100, 400,'player');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true); 
  gLayer.setCollisionBetween(1,999);
  this.physics.add.collider(player, gLayer);
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

   cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); //Camara nao sair das bordas
  this.cameras.main.startFollow(player); //Seguir o player

}

function update(time, delta) {

     // Runs once per frame for the duration of the scene


  //Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-200);
    player.anims.play("walk", true);
    player.flipX = true;
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(200);
    player.anims.play('walk', true);
    player.flipX = false; // use the original sprite looking to the right
  } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
  if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-350);        
    }


  
  
 

}