//Create variables here
var dog, happyDog, database, foodS = 20, foodStock;

function preload()
{
  //load images here
  happyDog = loadImage("dogImg1.png");
  hungryDog = loadImage("dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,20,20);
  dog.addImage(hungryDog); 
  dog.scale = 0.1;
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background("lime");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(hungryDog);
    
  }
  if(foodS === 0){
    dog.addImage(happyDog)
  }

  drawSprites();
  //add styles here
  text("foodRemaining:  "+foodS,100,100);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

