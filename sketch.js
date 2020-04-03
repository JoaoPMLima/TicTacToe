let preDraw = true;
let firstGo = true;

let done = false;
let drawn = false;
const size = 100;
let rows = 0;
let numPlayers;
let players = [];
let playerScores = [];
let curPlayer = 0;

let grid;


function setup() {
  // put setup code here
  if(firstGo){
    createElement('h1','Tic Tac Toe');
  } else {
    players = [];
    playerScores = [];
    curPlayer = 0;
  }



  canvas = createCanvas(500,500);
  background(200);
  if(preDraw){
    rows = 5;
  } else{
    rows = parseInt(prompt("Insert the number of rows","5"));
  }
  //create grid
  grid = new MakeGrid(rows);
  //prepare the canvas
  resizeCanvas(rows*size,rows*size);
  drawn = true;

  //input player symbols
  if(preDraw){
    numPlayers = 3;
    players.push("X");
    players.push("O");
    players.push("A");
    playerScores.push(0);
    playerScores.push(0);
    playerScores.push(0);
  } else {
    numPlayers = parseInt(prompt("Insert the number of players","2"));

    for(let i = 0; i < numPlayers; i++){
      let temp = prompt("Insert the player's symbol",(i == 0) ? "X" : "O");
      if(temp != null){
        players.push(temp);
        playerScores.push(0);
      } else {
        i--;
      }
    }
  }
}

function draw() {
  // put drawing code here
  background(200);
  // text(rows,200,200);
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
      let tempString = grid.grid[x][y];
      if(tempString == ""){
        grid.setValue(x,y,players[curPlayer]);
        playerScores[curPlayer]+=grid.weigths[x][y];
        curPlayer++;
        curPlayer = curPlayer % numPlayers;
      }
    }

    for(let i = 0; i < playerScores.length; i++){
      for(let winCond of grid.winConds){
        if((playerScores[i] & winCond) == winCond){
          console.log("1");
          displayWinner(i);
          break;
        }
      }
    }
    checkIfLost();
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
  if(playerScores.reduce((a,b) => a + b) == Math.pow(2,rows*rows) - 1){
    displayWinner(NaN);
  }
}






/* Em seguida:

Done:
- transformar o grid em uma classe separada
- array de jogadores
- funcao proximo jogador
- array winConditions
- array pontuacao dos jogadores

Pending:

- comparar sempre pra ver winConditions pra cada jogador
- loseCondition




*/
