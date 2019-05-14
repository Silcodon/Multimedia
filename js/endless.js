

	(function()
	{ 

    // define variables
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var teclas = new Array(3);
        var player, score, stop, ticker,pressdown,pressup;
        var ground = [], water = [], enemies = [], environment = [];
        var platformWidth = 32;
        var platformHeight = canvas.height - platformWidth * 4;
        var user='anonymous';
        var imgs={};
        var animationSequence = [];  // array holding the order of the animation
        var currentFrame = 0;        // the current frame to draw
        var counter = 0;             // keep track of frame rate
        var frameNumber=0;
        var frameSpeed=4;
        var ceu   = {x:0,y:0,speed:0};
        var backdrop = {x:0,y:0,speed:0};
        var SOUNDS = ['background_music',"gameover_music","jump_music"];
        var IMAGES = ['bg', 'areia', 'backdrop','ceu','normal_walk','agua','bridge','box','grass1','grass2','cliff','spikes','slime','plant','bush1','bush2'];
        // platform variables
        var platformHeight, platformLength, gapLength;
        var platformWidth = 32;
        var platformBase = canvas.height - platformWidth;  // bottom row of the game
        var platformSpacer = 64;



          /**
           * Get a random number between range
           * @param {integer}
           * @param {integer}
           */
          function rand(low, high) {
            return Math.floor( Math.random() * (high - low + 1) + low );
          }

          /**
           * Bound a number between range
           * @param {integer} num - Number to bound
           * @param {integer}
           * @param {integer}
           */
          function bound(num, low, high) {
            return Math.max( Math.min(num, high), low);
          }

  

          /**
           * Draw the backgrounds to the screen at different speeds
           */
          function drawBackground(){
          ctx.drawImage(imgs.bg, 0, 0);

            // Pan background
            ceu.x -= ceu.speed;
            backdrop.x -= backdrop.speed;

            // draw imgs side by side to loop
            ctx.drawImage(imgs.ceu, ceu.x, ceu.y);
            ctx.drawImage(imgs.ceu, ceu.x + canvas.width, ceu.y);

            ctx.drawImage(imgs.backdrop, backdrop.x, backdrop.y);
            ctx.drawImage(imgs.backdrop, backdrop.x + canvas.width, backdrop.y);

            // If the image scrolled off the screen, reset
            if (ceu.x + imgs.ceu.width <= 0)
              ceu.x = 0;
            if (backdrop.x + imgs.backdrop.width <= 0)
              backdrop.x =canvas.width + backdrop.x;
          }
          
          /**
           * Reset background to zero
           */
          function Backgroundreset(){
            ceu.x = 0;
            ceu.y = 0;
            ceu.speed = 0.2;

            backdrop.x = 0;
            backdrop.y = 370;
            backdrop.speed = 0.4;
          }       

        
           /**
       * Asset pre-loader object. Loads all imgs
       */
      function loadAssets(names,names2, callback) {

		  	var n,name,
		      result = {},
		      count  = names.length,
		      onload = function() { --total; };
		   	var name2,
			      count2  = names2.length,
			      canplay = function() { 
			      	--total;
			  		if(total==0){
			  			callback(result);
			  		} 
				};
				var total=count+count2;

		  	for(n = 0 ; n < names.length ; n++) {
			    name = names[n];
			    result[name] = document.createElement('img');
			    result[name].addEventListener('load', onload);
			    result[name].src = "../resources/" + name + ".png";
			  }

			for(n = 0 ; n < names2.length ; n++) {
			    name2 = names2[n];
			    result[name2] = document.createElement('audio');
			    result[name2].addEventListener('canplay', canplay, false);
			    result[name2].src = "../resources/" + name2 + ".mp3";
			  }


		}

      

      
        /**
       * Creates a Spritesheet
       * @param {string} - Path to the image.
       * @param {number} - Width (in px) of each frame.
       * @param {number} - Height (in px) of each frame.
       */
      function SpriteSheet(path, frameWidth, frameHeight) {
        this.image = new Image();
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        // calculate the number of frames in a row after the image loads
        var self = this;
        this.image.onload = function() {
          self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
        };

        this.image.src = path;
        return this;
      }




       /**
       * Creates an animation from a spritesheet.
       * @param {SpriteSheet} - The spritesheet used to create the animation.
       * @param {number}      - Number of frames to wait for before transitioning the animation.
       * @param {array}       - Range or sequence of frame numbers for the animation.
       * @param {boolean}     - Repeat the animation once completed.
       */
      function Animation(spritesheet, frameSpeed, startFrame, endFrame){          
          // start and end range for frames
          for (frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
            animationSequence.push(frameNumber);
          }
       
        /**
         * Update the animation
         */
      function updateAnimation(frameSpeed) {

          // update to the next frame if it is time
          if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % animationSequence.length;

          // update the counter
          counter = (counter + 1) % frameSpeed;
        }

        /**
         * Draw the current frame
         * @param {integer} x - X position to draw
         * @param {integer} y - Y position to draw
         */
        function drawAnimation(x, y,spritesheet) {
          // get the row and col of the frame
          var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
          var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

          ctx.drawImage(
            spritesheet.image,
            col * spritesheet.frameWidth, row * spritesheet.frameHeight,
            spritesheet.frameWidth, spritesheet.frameHeight,
            x, y,
            spritesheet.frameWidth, spritesheet.frameHeight);
        }

      





     
        /**
         * A vector for 2d space.
         * @param {integer} x - Center x coordinate.
         * @param {integer} y - Center y coordinate.
         * @param {integer} dx - Change in x.
         * @param {integer} dy - Change in y.
         */
        class Objetos {
          constructor(x, y, dx, dy){
          // position
          this.x = x || 0;
          this.y = y || 0;
          // direction
          this.dx = dx || 0;
          this.dy = dy || 0;
        }

          /**
           * Advance the vectors position by dx,dy
           */
          advance() {
            this.x += this.dx;
            this.y += this.dy;
          }

          /**
           * Get the minimum distance between two vectors
           * @param {Vector}
           * @return minDist
           */
          minDist(vec) {
            var minDist = Infinity;
            var max     = Math.max( Math.abs(this.dx), Math.abs(this.dy),
                                    Math.abs(vec.dx ), Math.abs(vec.dy ) );
            var slice   = 1 / max;

            var x, y, distSquared;

            // get the middle of each vector
            var vec1 = {}, vec2 = {};
            vec1.x = this.x + this.width/2;
            vec1.y = this.y + this.height/2;
            vec2.x = vec.x + vec.width/2;
            vec2.y = vec.y + vec.height/2;
            for (var percent = 0; percent < 1; percent += slice) {
              x = (vec1.x + this.dx * percent) - (vec2.x + vec.dx * percent);
              y = (vec1.y + this.dy * percent) - (vec2.y + vec.dy * percent);
              distSquared = x * x + y * y;

              minDist = Math.min(minDist, distSquared);
            }

            return Math.sqrt(minDist);
            }
        }
        /*
        We'll be using the minDist() function to determine if the player collides with a platform or an enemy. Since a player and the platform or enemy are moving in opposite directions, it is entirely possible that in one frame they are too 7
        far apart to collide but are on a collision path and in the very next frame have updated past one another and are again too far apart to collide. 

        Because of this, we cannot just use a regular distance formula between two points since this will allow the player and the object to pass through one another or more often just not collide at the right point. 
        Instead, we need to determine if at any time during a player's movement from point a to point b his path crosses that of the platform or enemy.

        To do this, we first determine the largest value of dx and dy between the two objects. The larger the number, the more times we need to look at different parts of the path to ensure we don't miss anything.
        Since this equations only works if the distances are measured from center to center, we need to determine what the center of each object is since JavaScript uses the top-left of the image as it's origin. 7
        Once we have both center points, we can then take different surveys of the vectors' paths and get the distance between them. We only need to return the smallest distance between the two vectors since this number determines if a vector collided with another.
        With the Vector object we can now create all of our game objects that will inherit from it.
       */ 

        class Canguru extends Objetos{
          constructor(x,y,dx,dy){
            super(x,y,dx,dy);
            // add properties directly to the player imported object
            this.width     = 60;
            this.height    = 58;
            this.speed     = 6;
            // jumping
            this.gravity   = 1;
            this.dy        = 0;
            this.jumpDy    = -10;
            this.isFalling = false;
            this.isJumping = false;

            // spritesheets
            this.sheet     = SpriteSheet('../resources/normal_walk.png', this.width, this.height);
            this.walkAnim  = Animation(this.sheet, 4, 1, 9);
            this.jumpAnim  = Animation(this.sheet, 4, 1, 1);
            this.anim      = this.walkAnim;

            var JumpCounter=0;  // how long the jump button can be pressed down
            }
          /**
         * Update the player's position and animation
         */
        update() {

          // jump if not currently jumping or falling
          if ((teclas[0]==true || teclas[1]==true) && this.dy === 0 && !this.isJumping) {
          	imgs.jump_music.currentTime = 0
            this.isJumping = true;
            this.dy = this.jumpDy;
            this.jumpCounter = 12;
            imgs.jump_music.play();
          }

          // jump higher if the space bar is continually pressed
          if ((teclas[0]==true || teclas[1]==true) && this.jumpCounter) {
            this.dy = this.jumpDy;
          }

          this.jumpCounter = Math.max(this.jumpCounter-1, 0);

          super.advance();

          // add gravity
          if (this.isFalling || this.isJumping) {
            this.dy += this.gravity;
          }
          // change animation is jumping
          else if (this.dy < 0) {
            this.anim = this.jumpAnim;
          }
          else {
            this.anim = this.walkAnim;
          }

          updateAnimation(4);
        }

         /**
         * Draw the player at it's current position
         */
        draw() {
          drawAnimation(this.x, this.y, this.sheet);
        };

        /**
         * Reset the player's position
         */
        reset() {
          this.x = 64;
          this.y = 250;
        }
      }
      /*

      The player object starts by defining the variables that we'll use to make our player run and jump. To make jumping better, we'll allow the player to control the height of their jump so they can better avoid obstacles. 
      To do this, we'll use a technique called ascent control to allow the player to hold the jump button (spacebar) and set the player's dy to equal jumpDy every frame spacebar is held.
      Since we don't want the player to jump indefinitely, we'll need to limit how long the player can hold down the spacebar and still jump.  
      jumpCounter will be used to determine how many frames the player can jump for before falling back down. 
      We also don't want to allow the player to jump multiple times in the air, so we'll use isJumping to know when the player is currently jumping and isFalling to know when the player is falling and shouldn't be able to jump.
      We also create three different animations from our spritesheet for each of the actions of walking, jumping, and falling, and then set anim to be the currently playing animation. 
      The last thing we do before defining the player functions is use call to call the Vector object. By doing this, we let the Vector object set our x, y, dx and dy variables for us. In essence this is like calling the constructor of our parent object.
      In our update() function we:

      determine if the player is able to jump
      if the player is able to jump then set the jump dy
      update jumpCounter (ensuring it never is less than 0)
      call the Vector's advance() function to update the player's position
      add gravity if the player is falling or jumping
      change to the appropriate animation
      and lastly update the animation

      The draw() function just draws the animation to the screen at the player's position and reset() resets our player's position for when the game starts or restarts.
      We also define the KEY_CODES object that just keeps track of when a key is pressed and when the key is released by creating events for key down and key up.
      The Sprite Object
      Next, we'll define the object that all of our non-player objects belong to: the Sprite object. Since each platform, water tile, enemy, and plant are all virtually the same expect the image that is drawn, we only need one object to define them. This object just needs know where the object is on the screen and how to update it and draw it.
      */




        /**
         * Sprites are anything drawn to the screen (ground, enemies, etc.)
         * @param {integer} x - Starting x position of the player
         * @param {integer} y - Starting y position of the player
         * @param {string} type - Type of sprite
         */
        class Sprite extends Objetos{
        constructor(x, y, type) {
          super(x,y);
          this.width  = platformWidth;
          this.height = platformWidth;
          this.type   = type;
          }

          /**
           * Update the Sprite's position by the player's speed
           */
          update() {
            this.dx = -player.speed;
            super.advance();
          }

          /**
           * Draw the sprite at it's current position
           */
          draw() {
            ctx.save();
            ctx.drawImage(imgs[this.type], this.x, this.y);
            ctx.restore();
          }
        }



            /**
         * Spawn new sprites off screen
         */
        function spawnSprites() {
          // increase score
          score++;
          // first create a gap
          if (gapLength > 0) {
            gapLength -= 1;
          }
          // then create ground
          else if (platformLength > 0) {
            var type = getType();
            ground.push(new Sprite(
              canvas.width + platformWidth % player.speed,
              platformBase - platformHeight * platformSpacer,
              type
            ));
            platformLength -= 1;
            // add random environment sprites
            spawnEnvironmentSprites();
            // add random enemies
            spawnEnemySprites();
          }
          // start over
          else {
            // increase gap length every speed increase of 4
            gapLength = rand(player.speed - 2, player.speed);
            // only allow a ground to increase by 1
            platformHeight = bound(rand(0, platformHeight + rand(0, 2)), 0, 4);
            platformLength = rand(Math.floor(player.speed/2), player.speed * 4);
          }
        }


        /**
         * Spawn new environment sprites off screen
         */
        function spawnEnvironmentSprites() {
          if (score > 40 && rand(0, 20) === 0 && platformHeight < 3) {
            if (Math.random() > 0.5) {
              environment.push(new Sprite(
                canvas.width + platformWidth % player.speed,
                platformBase - platformHeight * platformSpacer - platformWidth,
                'plant'
              ));
            }
          }
        }



        /**
         * Spawn new enemy sprites off screen
         */
        function spawnEnemySprites() {
          if (score > 100 && Math.random() > 0.96 && enemies.length < 3 && platformLength > 5 &&
              (enemies.length ? canvas.width - enemies[enemies.length-1].x >= platformWidth * 3 ||
               canvas.width - enemies[enemies.length-1].x < platformWidth : true)) {
            enemies.push(new Sprite(
              canvas.width + platformWidth % player.speed,
              platformBase - platformHeight * platformSpacer - platformWidth,
              Math.random() > 0.5 ? 'spikes' : 'slime'
            ));
          }
        }


          /**
           * Update all water position and draw.
           */
          function updateWater() {
            // animate water
            for (var i = 0; i < water.length; i++) {
              water[i].update();
              water[i].draw();
            }

            // remove water that has gone off screen
            if (water[0] && water[0].x < -platformWidth) {
              var w = water.splice(0, 1)[0];
              w.x = water[water.length-1].x + platformWidth;
              water.push(w);
            }
          }



          /**
           * Update all environment position and draw.
           */
          function updateEnvironment() {
            // animate environment
            for (var i = 0; i < environment.length; i++) {
              environment[i].update();
              environment[i].draw();
            }

            // remove environment that have gone off screen
            if (environment[0] && environment[0].x < -platformWidth) {
              environment.splice(0, 1);
            }
          }



          /**
           * Update all enemies position and draw. Also check for collision against the player.
           */
          function updateEnemies() {
            // animate enemies
            for (var i = 0; i < enemies.length; i++) {
              enemies[i].update();
              enemies[i].draw();

              // player ran into enemy
              if (player.minDist(enemies[i]) <= player.width - platformWidth/2) {
                gameOver();
              }
            }

            // remove enemies that have gone off screen
            if (enemies[0] && enemies[0].x < -platformWidth) {
              enemies.splice(0, 1);
            }
          }



          /**
           * Update the players position and draw
           */
          function updatePlayer() {
            player.update();
            player.draw();

            // game over
            if (player.y + player.height >= canvas.height) {
              gameOver();
            }
          }


          /**
         * Update all ground position and draw. Also check for collision against the player.
         */
        function updateGround() {
          // animate ground
          player.isFalling = true;
          for (var i = 0; i < ground.length; i++) {
            ground[i].update();
            ground[i].draw();

            // stop the player from falling when landing on a platform
            var angle;
            if (player.minDist(ground[i]) <= player.height/2 + platformWidth/2 &&
                (angle = Math.atan2(player.y - ground[i].y, player.x - ground[i].x) * 180/Math.PI) > -130 &&
                angle < -50) {
              player.isJumping = false;
              player.isFalling = false;
              player.y = ground[i].y - player.height + 5;
              player.dy = 0;
            }
          }

          // remove ground that have gone off screen
          if (ground[0] && ground[0].x < -platformWidth*100) {
            ground.splice(0, 1);
          }
        }

        /**
         * End the game and restart
         */
        function gameOver() {
          stop = true;
          ranking();
          removeEventListener("keydown",pressdown);
          document.getElementById('game-over').style.display = 'block';
          document.getElementById('score').innerHTML=score;
          imgs.background_music.pause();
		  imgs.gameover_music.currentTime = 0;
		  imgs.gameover_music.play();
        }



        /**
         * Get the type of a platform based on platform height
         * @return Type of platform
         */
        function getType() {
          var type;
          switch (platformHeight) {
            case 0:
            case 1:
              type = Math.random() > 0.5 ? "grass1" : "grass2";
              break;
            case 2:
              type = "areia";
              break;
            case 3:
              type = "bridge";
              break;
            case 4:
              type = "box";
              break;
          }
          if (platformLength === 1 && platformHeight < 3 && rand(0, 3) === 0) {
            type = "cliff";
          }

          return type;
        }



        function togglePause(){
		    if (!stop)
		    {

		        document.getElementById('pause').style.display = 'block';
		        stop = true;
		    } else if (stop)
		    {
		       stop= false;

        		document.getElementById('pause').style.display = 'none';
		       animate();
		    }

		}

      /**
       * Game loop
       */
      function animate() {
        if(!stop){
        requestAnimationFrame( animate );
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground();

         // update entities
        updateWater();
        updateEnvironment();
        updatePlayer();
        updateGround();
        updateEnemies();

        // draw the score
        ctx.fillText('Score: ' + score + 'm', canvas.width - 140, 30);
        
         // spawn a new Sprite
          if (ticker % Math.floor(platformWidth / player.speed) === 0) {
            spawnSprites();
          }

          // increase player speed only when player is jumping
          if (ticker > (Math.floor(platformWidth / player.speed) * player.speed * 20) && player.dy !== 0) {
            player.speed = bound(++player.speed, 0, 15);
            frameSpeed = Math.floor(platformWidth / player.speed) - 1;

            // reset ticker
            ticker = 0;

            // spawn a platform to fill in gap created by increasing player speed
            if (gapLength === 0) {
              var type = getType();
              ground.push(new Sprite(
                canvas.width + platformWidth % player.speed,
                platformBase - platformHeight * platformSpacer,
                type
              ));
              platformLength--;
            }
          }

          ticker++;
        }
      }


      /**
       *Passa o ranking para o HTML
       */
       function ranking(){
       	localStorage.setItem('myStorage',JSON)
   		}

        /**
         * Keep track of the spacebar events
         */
        function parabaixo(e,teclas) {
		   	if(e.keyCode==32){  //spacebar
				teclas[0] = true; 
			}
			if(e.keyCode==38){ //cima
				teclas[1] = true;
			}
		}

		function paracima(e,teclas){
		   if(e.keyCode==32){  //spacebar
				teclas[0] = false; 
			}
			if(e.keyCode==38){ //cima
				teclas[1] = false;
			}
		}

		var pressdown = function(e){
			parabaixo(e,teclas);
			if (e.keyCode==27){
        		togglePause();
        	}
		}	
		addEventListener("keydown", pressdown);


		var pressup = function(e){
			paracima(e,teclas);
		}	
		addEventListener("keyup", pressup);



      /**
       * Start the game - reset all variables and entities, spawn platforms and water.
       */
      function startGame(images) {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('pause').style.display = 'none';
      	imgs=images;
        ground = [];
        water = [];
        environment = [];
        enemies = [];
        // setup the player
        player=new Canguru(0,0,0,0);
        player.reset();
        ticker = 0;
        stop = false;
        score = 0;
        platformHeight = 2;
        platformLength = 15;
        gapLength = 0;
        imgs.gameover_music.pause();
        imgs.background_music.currentTime=0;
        imgs.background_music.loop=true;
	    imgs.background_music.play();
        // create the ground tiles
        for (var i = 0; i < Math.floor(canvas.width / platformWidth) + 2; i++) {
          ground.push(new Sprite(i * (platformWidth), platformBase - platformHeight * platformSpacer, 'areia'));
        }

        for (i = 0; i < canvas.width / 32 + 2; i++) {
          water.push(new Sprite(i * platformWidth, platformBase, 'agua'));
        }

        Backgroundreset();

        animate();
      }

      document.getElementById('mute').addEventListener('click',function(){
      	if (imgs.background_music.muted == false) 
		{
		    document.getElementById("mute").src="../resources/mute.png";
		    imgs.background_music.muted = true;
		    imgs.gameover_music.muted = true;
		    imgs.jump_music.muted = true;
		}
		else 
		{
			document.getElementById("mute").src="../resources/unmute.png";
		    imgs.background_music.muted = false;
		    imgs.gameover_music.muted = false;
		    imgs.jump_music.muted = false;
		}
      });
      document.getElementById('continue').addEventListener('click',function(){
      	stop=false;
      	document.getElementById('pause').style.display = 'none';
      	animate();
      });
      document.getElementById('restart').addEventListener('click', function(){
		addEventListener("keydown", pressdown);
        startGame(imgs);
      });
	  loadAssets(IMAGES,SOUNDS,startGame);
	  
      	
    })();