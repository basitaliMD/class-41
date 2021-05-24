class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if(gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    car1 = createSprite(100, 200);
    car1.addImage(carImg1);
    car2 = createSprite(300, 200);
    car2.addImage(carImg2);
    car3 = createSprite(500, 200);
    car3.addImage(carImg3);
    car4 = createSprite(700, 200);
    car4.addImage(carImg4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined) {
       background(groundImg);
       image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
       
       //var display_position = 130;
       var index = 0;
       var x = 200;
       var y;

       for(var plr in allPlayers) {
       index = index+1;
       x = 200+(index*200)+allPlayers[plr].xPos;
       y = displayHeight-allPlayers[plr].distance;
       cars[index-1].x = x;
       cars[index-1].y = y;
       textAlign(CENTER);
       textSize(20);
       text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y+75);
       if(index === player.index) {
          console.log(index);
          console.log(player.index);
          fill("blue");
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
       } else {
          fill("green");
       }
      /* if(plr === "player"+player.index)
       fill("red");
       else 
       fill("black");

       display_position+=20
       textSize(15);
       text(allPlayers[plr].name+":"+allPlayers[plr].distance, 120, display_position)*/
    }
}

  if(keyIsDown(UP_ARROW) && player.index !== null) {
     player.distance+=50;
     player.update();
     
  }

  if(player.distance < 2150) {
    
  

  if(keyIsDown(38) && player.index!==null) {
     yVel+=0.9//yVel = yVel+0.9
     if(keyIsDown(37)) {
        xVel-=0.2
     }
     if(keyIsDown(39)) {
        xVel+=0.2
    }
   }
  else if(keyIsDown(38) && yVel > 0 && player.index!==null) { 
          yVel-=0.1
          xVel*=0.9
  }
  else {
   yVel*=0.9
   xVel*=0.9
  }

  }

  /*if(player.distance > 4000) {
     gameState = 2;
  }*/

  player.distance+=yVel
  yVel*=0.9
  player.xPos+=xVel
  xVel*=0.98
  player.update();

  drawSprites();

}

}