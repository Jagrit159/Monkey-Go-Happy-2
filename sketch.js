var scene,forest;
var monkey,monkey_running,monkey_injured;
var ground;

var FoodGroup, bananaPic;
var obstaclesGroup, obstacleImage;

function preload(){
scene=loadImage("jungle.jpg");
  
monkey_running =
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaPic = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}


function setup() {
  createCanvas(800, 400);
  forest = createSprite(0,0,800,400);
  forest.addImage(scene);
  forest.scale = 1.5;
  forest.x = forest.width/2;
  forest.velocityX = -5;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(forest.x<100){
    forest.x=forest.width/2;
  }
  
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  if(keyDown("space")){
  monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale = 0.1;
    }
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood(){
 if (frameCount % 100 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaPic);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
   monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
 }

}
function spawnObstacles(){
if(frameCount%250===0){
var Stone = createSprite(700,340,50,50);
  Stone.velocityX = -5;
  Stone.debug = false;
  Stone.addImage(obstacleImage);
  Stone.scale = 0.2;
  Stone.lifetime = 300;
   obstaclesGroup.add(Stone);
}
}
 