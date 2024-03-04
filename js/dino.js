// board

let board;
let boardWith = 900;
let boardHeight = 350;
let context;

// dino

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight
let dinoImg;

let dino =  {
  x : dinoX,
  y : dinoY,
  width : dinoWidth,
  height : dinoHeight
}

//cactus

let cactusArray = [];

let cactusWidth1 = 34;
let cactusWidth2 = 69;
let cactusWidth3 = 102

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;


window.onload = function() {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWith;

  context = board.getContext("2d");


  // context.fillStyle= "green";
  // context.fillRect(dino.x, dino.y, dino.width, dino.height)
  dinoImg = new  Image()
  dinoImg.src = "./dinosaur.png";

  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
  }

cactus1Img = new Image()
cactus1Img.src = "./cactus.png";

cactus2Img = new Image()
cactus2Img.src = "./cactus (1).png";

cactus3Img = new Image()
cactus3Img.src = "./cactus (2).png";

  requestAnimationFrame(update);
  setInterval(placeCactus, 1000);
  document.addEventListener("keydown", moveDino)
  
}

function update() {
 requestAnimationFrame(update);

 if (gameOver) {
  return
}

 context.clearRect(0,0, board.width, board.height)
//dino

 velocityY += gravity;
 dino.y = Math.min(dino.y + velocityY, dinoY);
 context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)


//cactus
 for (let i = 0; i < cactusArray.length; i++) {
  let cactus = cactusArray[i];
  cactus.x += velocityX;
  context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)

  if (detectCollesion(dino, cactus)) {
    gameOver = true;
    dinoImg.src = "./dino.png";
    dinoImg.onload = function() {
      context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

  }
 }
 //score
 context.fillStyle="black";
 context.font = "20px couier";
 score++;
 context.fillText(score,5,20);
}

function moveDino(e) {
  if (gameOver) {
    return
  }

  if ((e.code == "Space" || e.code == " ArrowUp") && dino.y == dinoY) {
    velocityY = -10;
  }
  else if (e.code == "ArrowDown" && dino.y == dinoY) {
    //duck
  }
}

function placeCactus() {

  if (gameOver) {
    return
  }

  let cactus = {
    img : null,
    x : cactusX,
    y : cactusY,
    width : null,
    height : cactusHeight
  }

  let placeCactusChance = Math.random();

  if (placeCactusChance > .90) {
    cactus.img = cactus3Img;
    cactus.width = cactusWidth3;
    cactusArray.push(cactus)
  }
  else if (placeCactusChance > .70) {
    cactus.img = cactus2Img;
    cactus.width = cactusWidth2;
    cactusArray.push(cactus)
  }
  else if (placeCactusChance > .50) {
    cactus.img = cactus1Img;
    cactus.width = cactusWidth1;
    cactusArray.push(cactus)
  }

  if (cactusArray.length > 5) {
    cactusArray.shift();
  }

}

function detectCollesion(a,b) {
  return a.x < b.x + b.width && 
  a.x + a.width > b.x &&
  a.y  < b.y + b.height &&
  a.y  + a.height > b.y;
}