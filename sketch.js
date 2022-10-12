//Extension 1. Add Sound: I follow the instructions to add sound to five part of the game: when the character jump, when the character lose life, when the character reach a collectables, when the charecters lose all three lives and when the character reach the end of the level. I find difficult to add sound when when the character lose all three lives and when reaches the end of the level because the sound keep looping over and over.
//
//Extension 2. Add platforms: I choose to add platforms so I can work with factory patterns. I also work with functions, arguments, if statement to check that the character is on the platform only when is jumping. I find very challenging but I really appreciate to deal with that.
//
//I know that I have a Lot of practice to do before becoming a good programmer, but this is the first time that I do and I feel great, hopefully with a lot of hjard work I will live my dream and become a professional coder thank to those classes. 

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

 

var clouds;
var mountains;
var trees_x;
var collectables;
var canyons;

var game_score;
var flagpole;
var lives;

var enemies;

var platforms;


var jumpSound;
var loselifeSound;
var gameoverSound;
var victorySound;
var collectablesSound;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    loselifeSound = loadSound('assets/loselife.mp3');
    loselifeSound.setVolume(0.1);
    gameoverSound = loadSound('assets/gameover.wav');
    gameoverSound.setVolume(0.1);
    victorySound = loadSound('assets/victory.wav');
    victorySound.setVolume(0.1);
    collectablesSound = loadSound('assets/collectables.wav');
    collectablesSound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 3;
    
    startGame();
}

function draw()
{
	background(100, 155, 255); 

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); 
    
    push();
    translate(scrollPos, 0);
    
	
    drawClouds();
    
	
    drawMountains();
    
    
    drawTrees();
    
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    
	for (var i = 0; i < canyons.length; i++)
        {
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);
        }

	
    for (var i = 0; i < collectables.length; i++)
        {
            if(!collectables[i].isFound)
            {
                drawCollectable(collectables[i]);
                checkCollectable(collectables[i]);
            }
        }
    
    renderFlagpole();
    
    pop();
    
	drawGameChar();
    
    fill(255);
    noStroke();
    textSize(15);
    text("score: " + game_score, 20, 20);
    
    checkPlayerDie();
    
    if(lives < 1)
        {
            stroke(10);
            textSize(40);
            text ("Game Over.Press space to continue", width/4 - 60, height/2);
            gameoverSound.play();
            return;
        }
    if(flagpole.isReached == true)
        {
            stroke(10);
            textSize(40);
            text("Level complete. Press space to continue", width/4 - 60, height/2);
            victorySound.play();
            return;
        }
    
    drawTokens()
    
    
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	   {
		  if(gameChar_x < width * 0.8)
		  {
			gameChar_x  += 5;
		  }
		  else
		  {
			scrollPos -= 5;
		  }
	   }


    if (gameChar_y < floorPos_y)
        {  
            var isContact = false;
            for (var i =0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_world_x, gameChar_y))
                        {
                            isContact = true
                            break;
                        }
                }
                if(isContact == false)
                {
                    gameChar_y += 5;
                    isFalling = true;
                }
        }
    else
        {
            isFalling = false;
        }


    if(isPlummeting)
        {
            gameChar_y += 6;
        }
    if(flagpole.isReached == false)
        {
            checkFlagpole();
        }
    
        
	gameChar_world_x = gameChar_x - scrollPos;
}


function keyPressed()
{

    if(keyCode == 37)
    {
        isLeft = true;
    }
    if(keyCode == 39)
    {
        isRight = true;
    }
    if(keyCode == 32 && (gameChar_y == floorPos_y))

    {
        gameChar_y -= 100;
        jumpSound.play();
        
    }

}

function keyReleased()
{

	if(keyCode == 37)
    {
        isLeft = false;
    }
    else if(keyCode == 39)
    {
        isRight = false;
    }
}


function drawGameChar()
{
    if(isLeft && isFalling)
        {
            fill(200,150,150);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            fill(255,0,0);
            rect(gameChar_x - 13, gameChar_y - 42, 26, 30);
            fill(0);
            rect(gameChar_x - 25, gameChar_y - 35, 20, 10);
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 12, 10, 10);
            rect(gameChar_x + 5, gameChar_y - 12, 10, 10)
        }
    else if(isRight && isFalling)
        {
            fill(200,150,150);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            fill(255,0,0);
            rect(gameChar_x - 13, gameChar_y - 42, 26, 30);
            fill(0);
            rect(gameChar_x + 5, gameChar_y - 35, 20, 10);
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 12, 10, 10);
            rect(gameChar_x + 5, gameChar_y - 12, 10, 10)
        }
    else if(isLeft)
        {
            fill(200,150,150);
            ellipse(gameChar_x, gameChar_y - 50, 35);
            fill(255,0,0);
            rect(gameChar_x - 13, gameChar_y - 35, 26, 30);
            fill(0);
            rect(gameChar_x - 25, gameChar_y - 30, 20, 10);
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
            rect(gameChar_x + 5, gameChar_y - 5, 10, 10)
        }
    else if(isRight)
        {
            fill(200,150,150);
            ellipse(gameChar_x, gameChar_y -    50, 35);
            fill(255,0,0);
            rect(gameChar_x - 13, gameChar_y - 35, 26, 30);
            fill(0);
            rect(gameChar_x + 5, gameChar_y -   30, 20, 10);
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
            rect(gameChar_x + 5, gameChar_y - 5, 10, 10)
        }
    else if(isFalling || isPlummeting)
        {
            fill(200,150,150);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            fill(255,0,0);
            rect(gameChar_x - 13, gameChar_y - 42, 26, 30);
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 13, 10, 10);
            rect(gameChar_x + 5, gameChar_y - 13, 10, 10)
        }
    else
        {
            fill(200,150,150);
            ellipse(gameChar_x, gameChar_y - 50, 35);
            fill(255,0,0);
            rect(gameChar_x - 13, gameChar_y - 35, 26, 30);
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
            rect(gameChar_x + 5, gameChar_y - 5, 10, 10)
        }
}

function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
        {
            fill(255);
            ellipse(clouds[i].x_pos - 50, clouds[i].y_pos, clouds[i].size);
            ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size + 25);
            ellipse(clouds[i].x_pos + 50, clouds[i].y_pos, clouds[i].size);
        }    
}
function drawMountains()
{
     for(var i = 0; i < mountains.length; i++) 
         {
            fill(128, 128, 128);
            triangle(mountains[i].x_pos, mountains[i].y_pos + 382,
            mountains[i].x_pos + 150, mountains[i].y_pos ,
            mountains[i].x_pos + 300, mountains[i].y_pos + 382);
         }
}

function drawTrees()
{
     for(var i = 0; i < trees_x.length; i++ )
         {
            fill(120, 100, 40);
            rect(75 + trees_x[i], -200/2 + floorPos_y, 50, 200/2);
            fill(0, 155, 0);
            triangle(trees_x[i] + 25, -200/2 + floorPos_y,
            trees_x[i] + 100, -200 + floorPos_y,
            trees_x[i] + 175, -200/2 + floorPos_y);
            triangle(trees_x[i], -200/4 + floorPos_y,
            trees_x[i] + 100, -200*3/4 + floorPos_y,
            trees_x[i] + 200, -200/4 + floorPos_y);
         }   
}

function drawCanyon(t_canyon)
{
    {
      fill(165, 42, 42);
      rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
    }
}

function checkCanyon(t_canyon)
{
     if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
        {
           isPlummeting = true; 
        }
}

function drawCollectable(t_collectable)
{
    fill(215, 215, 0);
    ellipse(t_collectable.x_pos, t_collectable.y_pos - 20, 20, 20 );
}

function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <= 20)
        {
            collectablesSound.play();
            t_collectable.isFound = true;
            game_score +=1;
        }
}

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255, 0, 255);
    noStroke();
    
    if(flagpole.isReached)
        {
            rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
        }
    else
        {
            rect(flagpole.x_pos, floorPos_y - 50, 50, 50);       
        }
    
    for (var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw(); 
            
            var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
            
            if(isContact)
            {
                lives -= 1;
                loselifeSound.play();
            
            if (lives > 0)
                {
                    startGame();
                    break;
                }
            }
        }
    
    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
    if(d < 15)
        {
            flagpole.isReached = true;
        }
}

//function to check player dies
function checkPlayerDie()
{
    if (gameChar_y == canvas.height)
        {
            lives -= 1;
            loselifeSound.play();
            
            if (lives > 0)
                {
                    startGame()
                }
        }
   
}

 function drawTokens()
 {
    for(var i= lives; i>0; i--)
        {
            fill(255, 0, 0);
            ellipse(1000-(i*25), 35, 20);
        }       
 }  



function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
	scrollPos = 0;
	gameChar_world_x = gameChar_x - scrollPos;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

    
     trees_x = [-1500, -1200, -800, -500, -200, 450, 700, 1000, 1200, 1500];
    
     clouds = [{x_pos: -1200, y_pos: 50, size: 50},
               {x_pos: -800, y_pos: 200, size: 50},
               {x_pos: 100, y_pos: 125, size: 50},
               {x_pos: 600, y_pos: 100, size: 50},
               {x_pos: 1000, y_pos: 200, size: 50},
               {x_pos: 1300, y_pos: 100, size: 50},
               {x_pos: 1700, y_pos: 200, size: 50}];
    
     mountains = [{x_pos: -1600, y_pos: 50},
                 {x_pos: -1100, y_pos: 50},
                 {x_pos: -800, y_pos: 50},
                 {x_pos: -200, y_pos: 50},
                 {x_pos: 100, y_pos: 50},
                 {x_pos: 650, y_pos: 50},
                 {x_pos: 1050, y_pos: 50},
                 {x_pos: 1400, y_pos: 50}];
    
    
     canyons = [ {x_pos: 140, width: 60},
               {x_pos: 800, width: 40}];
    
     collectables = [{x_pos: 300, y_pos: floorPos_y, isFound: false},
                    {x_pos: 500, y_pos: floorPos_y, isFound: false},
                    {x_pos: 900, y_pos: floorPos_y, isFound: false},
                    {x_pos: 1000, y_pos: floorPos_y, isFound: false}];
    
    platforms = [];
    
    platforms.push(createPlatforms(300,floorPos_y -90 ,100));
     platforms.push(createPlatforms(900, floorPos_y - 90, 120));
    platforms.push(createPlatforms(1200, floorPos_y - 90, 100));
                    
     game_score = 0;    
    
     flagpole = {isReached: false, x_pos: 2000};
    
     enemies = [];
    enemies.push(new Enemy(40, floorPos_y - 10, 100));
    
   

}

function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
        {
            this.currentX += this.inc;

            if(this.currentX >= this.x  + this.range)
                {
                    this.inc =- 1;
                }
            else if(this.currentX < this.x)
                {
                    this.inc = 1;
                }
        }
   
    this.draw = function()
        {
            this.update();
            fill(255, 0, 0)
            ellipse(this.currentX, this.y, 20, 20);


        }
    
    this.checkContact = function(gameChar_x, gameChar_y)
        {
          var d = dist(gameChar_x, gameChar_y, this.currentX, this.y)

          if(d < 20)
              {
                  return true;
              }

          return false;
        }

}

function createPlatforms(x, y, length)
{
         var p = {
             x: x,   
             y: y,   
             length: length,
             draw: function(){
                fill(255, 160, 122);
                rect(this.x, this.y, this.length, 20)
            },

            checkContact: function(gameChar_x, gameChar_y)
             {
                if(gameChar_x > this.x && gameChar_x < this.x + this.length)
                {
                    var d = this.y - gameChar_y;
                    if(d >= 0 && d > 5)
                        {
                            return true;
                        }
                }

                 return false;
             }
         }
     
     return p;
}




