var canvas,backgroungImage
var database
var balloon,balloonImage
var height


function preload(){
  backgroundImage = loadImage('Images/Hot Air Ballon-01.png')
  balloonImage = loadAnimation('Images/Hot Air Ballon-02.png','Images/Hot Air Ballon-03.png','Images/Hot Air Ballon-04.png')
}

function setup() {
  database = firebase.database()

  createCanvas(1500,800);
 balloon = createSprite(250, 250, 50, 50);
balloon.addAnimation("hot Air Ballon",balloonImage)

var balloonPosition = database.ref('Balloon/Position')
balloonPosition.on("value",readPosition)
}


function draw() {
  background(backgroundImage); 

  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
    balloon.scale=balloon.scale-0.1
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10)
    balloon.scale=balloon.scale+0.1
  }
  drawSprites();
  textSize(25)
  fill (0)
  text("Use arrow keys",50,50)

}
function readPosition (data){
height=data.val()
balloon.x=height.x
balloon.y=height.y
}
function updatePosition(x,y){
  database.ref('Balloon/Position').set({
    x:height.x+x,
    y:height.y+y
  })
}