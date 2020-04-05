/* If preDraw is set to true the program will start with the values already put in:
   5x5 grid
   2 players : 'X' and 'O'
*/
let preDraw = false;
let firstGo = true;

let rowsDefault = 5;
let numPDefault = 2;
let playersDefault = ["X","O"];

let done = false;
let drawn = false;
const size = 100;
let rows = 0;
let numPlayers;
let players = [];
let playerScores = [];
let curPlayer = 0;

let grid;


/*
  DISCLAIMER: If you're reading this, you're probably planning on going through
this code to try and understand it. Don't. Here's the thing, I started this with
the idea of doing this by using the binary operator 'and'('&'). As I progressed
I realized that for any grid bigger than 7x7 the integers would get too high and
stop working. At that point I could've scratched that whole idea and just made
some for loops to test every possibility every time, but I didn't. I wanted to
use the 'and' operator, and here's the horrible (but functional) setup I came
up with.
*/


function setup() {
  // put setup code here
  if(firstGo){
    createElement('h1','Tic Tac Toe');
  } else {
    preDraw = true;
    players = [];
    playerScores = [];
    curPlayer = 0;
  }



  canvas = createCanvas(500,500);
  background(200);
  if(preDraw){
    rows = rowsDefault;
  } else{
    rows = parseInt(prompt("Insert the number of rows","5"));
  }
  //create grid
  grid = new MakeGrid(rows);
  //prepare the canvas
  resizeCanvas(rows*size,rows*size);
  drawn = true;

  //input player symbols
  let emptyArray = [];
  //console.log(emptyArray);
  if(preDraw){
    numPlayers = numPDefault;
    players = playersDefault;
    //players.push("A");
    for(let i = 0; i < numPlayers; i++){
      playerScores.push(emptyArray.slice());
    }
    //playerScores.push(emptyArray.slice());
  } else {
    numPlayers = parseInt(prompt("Insert the number of players","2"));

    for(let i = 0; i < numPlayers; i++){
      let temp = prompt("Insert the player's symbol",(i == 0) ? "X" : (i == 1) ? "O" : ("" + (i-1)));
      if(temp != null){
        players.push(temp);
        playerScores.push(emptyArray.slice());
      } else {
        i--;
      }
    }
  }
  for(let i = 0; i < playerScores.length; i++){
    //console.log("11");
    for(let j = 0; j < grid.divInd.length; j++){
      //console.log("12");
      let tempp = {
        x : grid.divInd[j].x,
        y : grid.divInd[j].y,
        z : 0
      }
      playerScores[i].push(tempp);
    }
    //console.log(playerScores);
  }
  //console.log(grid.winConds);
  //console.table(grid.weigths);

  if(!preDraw){
    playersDefault = players;
    numPDefault = numPlayers;
    rowsDefault = rows;
  }
}

function draw() {
  background(200);
  stroke(0);
  textSize(40);
  textAlign(CENTER,CENTER)
  if(drawn){
    for(let i = 0; i < grid.rows; i++){
      for(let j = 0; j < grid.rows; j++){
        strokeWeight(5);
        noFill();
        rect(size*j,size*i,size);
        strokeWeight(1);
        fill(0);
        text(grid.grid[i][j], j*size+size/2, i*size+size/2);
      }
    }
  }
}

function mousePressed(){
  if(grid && !done){
    //assign the symbol
    //inverted
    let y = floor(mouseX/size);
    let x = floor(mouseY/size);
    if(x >= 0 && x < rows && y >=0 && y < rows){
      //note: x and y are switched here, so they are again in some other parts of this function
      let tempString = grid.grid[x][y];
      if(tempString == ""){
        grid.setValue(x,y,players[curPlayer]);


        xx = (x-x%3)/3;
        yy = (y-y%3)/3;
        //test for normal index
        for(let i = 0; i < playerScores[curPlayer].length; i++){
          if(xx == playerScores[curPlayer][i].x && yy == playerScores[curPlayer][i].y){
            //console.log("aiaiai");
            //console.log(grid.weigths[y%3][x%3]);
            //x and y are switched here
            playerScores[curPlayer][i].z+=grid.weigths[y%3][x%3];
            break;
          }
        }
        //test for previous x index if exists
        if(xx > 0){
          //console.log("vai 2");
          //console.log(xx-1);
          //console.log(yy);
          for(let i = 0; i < playerScores[curPlayer].length; i++){
            if(xx-1 == playerScores[curPlayer][i].x && yy == playerScores[curPlayer][i].y){
              //console.log("aiaiai2");
              //console.log(grid.weigths[y%3][x%3+3]);
              //x and y are switched here
              playerScores[curPlayer][i].z+=grid.weigths[y%3][x%3+3];
              break;
            }
          }
        }
        //do the same thing again for previous y index if exists
        if(yy>0){
          //console.log("vai 3");
          for(let i = 0; i < playerScores[curPlayer].length; i++){
            if(xx == playerScores[curPlayer][i].x && yy-1 == playerScores[curPlayer][i].y){
              //console.log("aiaiai3");
              //console.log(grid.weigths[y%3+3][x%3]);
              //x and y are switched here
              playerScores[curPlayer][i].z+=grid.weigths[y%3+3][x%3];
              break;
            }
          }
          if(xx > 0){
            //console.log("vai 4");
            for(let i = 0; i < playerScores[curPlayer].length; i++){
              if(xx-1 == playerScores[curPlayer][i].x && yy-1 == playerScores[curPlayer][i].y){
                //console.log("aiaiai4");
                //console.log(grid.weigths[y%3+3][x%3+3]);
                //x and y are switched here
                playerScores[curPlayer][i].z+=grid.weigths[y%3+3][x%3+3];
                break;
              }
            }
          }
        }
        curPlayer++;
        curPlayer = curPlayer % numPlayers;
      }
      //console.log("Value for that point: "+grid.weigths[y][x]);
    }

loop1:
//test z for matching with any winCondition for every item in every array in the playerScores array
    for(let i = 0; i < playerScores.length; i++){
      for(let p of playerScores[i]){
        for(let winCond of grid.winConds){
          if((p.z & winCond) == winCond){
            //console.log(p);
            //console.log(winCond);
            displayWinner(i);
            break loop1;
          }
        }
      }
    }

    checkIfLost();
    //console.log(playerScores);
  }
}

function displayWinner(index){
  if(!done){
    done = true;
    draw();
    if(!isNaN(index)){
      alert("" + players[index] + " is the winner!");
    } else {
      alert("It's a tie!")
    }
    if(confirm("Retry?")){
      firstGo = false;
      done = false;
      setup();
    }
  }
}

function checkIfLost(){
  for(let i = 0; i < grid.rows; i++){
    for(let j = 0; j < grid.rows; j++){
      if(grid.grid[i][j] == "") return;
    }
  }
  displayWinner(NaN);
}
