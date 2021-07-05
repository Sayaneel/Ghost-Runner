var ghost, ghostImg;
var doorG, doorImg
var climberG, climberImg,invisibleClimberG;
var backGround, backGroundImg;
var spookySound;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var gameOver,gameOverImg;
var gameOverLine,gameOverLineG;
var invisibleCollider1,invisibleCollider1

function preload(){
 ghostImg = loadImage("ghost-jumping.png");
doorImg = loadImage("door.png");
climberImg= loadImage("climber.png");
backGroundImg = loadImage("tower.png");
gameOverImg=loadImage("gameOver.png");
spookySound = loadSound("spooky.wav")

}

function setup(){
  createCanvas(600,600);

  backGround=createSprite(300,300,600,600);
  backGround.addImage(backGroundImg);
  backGround.velocityY=2;
  

  ghost=createSprite(300,300,25,25);

  ghost.addImage(ghostImg);
  ghost.scale=0.4;

  doorG=new Group();
  climberG=new Group();
  invisibleClimberG=new Group();
  gameOverLineG=new Group();

  score = 0;

  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);

  invisibleCollider1 = createSprite(10,300,3,600);
  invisibleCollider2 = createSprite(590,300,3,600);

  
}
function draw(){

    background(0)
    SpawnDoors(); 
    
    //ghost.debug=true;
    ghost.setCollider("circle",0,0,150);   
    invisibleCollider1.visible=false
    invisibleCollider2.visible=false

    if(backGround.y>600){
        backGround.y=300;
   }
    if(keyDown("LEFT_ARROW")){
        ghost.x-=2;
    }
    if(keyDown("RIGHT_ARROW")){
        ghost.x+=2;
    }

    if(keyDown("SPACE")){
        ghost.velocityY= -4;
    }
    ghost.velocityY += 0.5;

    if(gameState===PLAY){
        gameOver.visible=false
        score = score + Math.round(getFrameRate()/60);
        ghost.collide(gameOverLineG);
        ghost.collide(invisibleCollider1);
        ghost.collide(invisibleCollider2);
        spookySound.play();
    }
   
    if(ghost.y>560||ghost.isTouching(gameOverLineG)){
        gameState=END;
        
    }

    if(gameState===END){
        ghost.destroy();
        backGround.destroy();
        doorG.destroyEach();
        climberG.destroyEach();
        invisibleClimberG.destroyEach();
        gameOverLineG.destroyEach();
        //doorG.setLifetimeEach(-1);
        //climberG.setLifetimeEach(-1);
        //invisibleClimberG.setLifetimeEach(-1);
        gameOver.visible= true;
        spookySound.stop();
    }
       
    drawSprites();

    textSize(20);
    fill(255);
    text("Score: "+ score,275,50);
}
function SpawnDoors(){
    if(frameCount%80==0){
  
    var door, climber, invisibleClimber;
    var r= Math.round(random(100,500))
    door=createSprite(r,-60,10,10);
    door.addImage(doorImg);
    door.velocityY=5;
    door.depth=ghost.depth
    ghost.depth++;
    door.lifetime = 150;
    doorG.add(door);

  
    climber=createSprite(r,-11,15,10);
    climber.addImage(climberImg);
    climber.velocityY=5;
    
    climber.lifetime = 150;
    climberG.add(climber);

    invisibleClimber=createSprite(r,-11,100,10);
    invisibleClimber.visible=false;
    invisibleClimber.velocityY=5;
    
    invisibleClimber.lifetime = 150;
    invisibleClimberG.add(invisibleClimber);
    invisibleClimber.debug=true;

    gameOverLine=createSprite(r,-1,80,3);
    gameOverLine.visible=false;
    gameOverLine.velocityY=5;
    
    gameOverLine.lifetime = 150;
    gameOverLineG.add(gameOverLine);
    gameOverLine.debug=true;

    }
}
