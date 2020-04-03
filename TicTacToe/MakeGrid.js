
function MakeGrid(rows){
  this.rows = rows;
  this.grid = [];
  this.weigths = [];


  //construct grid
  for(let i = 0; i < rows; i++){
    let tempArray = [];
    this.grid.push(tempArray);
    this.weigths.push(tempArray);
    for(let j = 0; j < rows; j++){
      this.grid[i].push("");
    }
  }



  //construct weigths grid
  this.a = -1;
  this.b = -1;
  this.weigths = new Array(this.rows).fill(new Array(this.rows).fill(1).map(() => {
    this.a++;
    return Math.pow(2,this.a);
  })).map(x => {
    this.b++;
    return x.map(y => y*Math.pow(2,(this.b*this.rows)));
  });

  //console.table(this.weigths);

  //construct winConds array
  this.winConds = [];
  let a = 0;
  //horizontal
  for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.rows - 2; j++){
      a = 0;
      a += this.weigths[i][j];
      a += this.weigths[i][j+1];
      a += this.weigths[i][j+2];
      this.winConds.push(a);
    }
  }
  //vertical
  for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.rows - 2; j++){
      a = 0;
      a += this.weigths[j][i];
      a += this.weigths[j+1][i];
      a += this.weigths[j+2][i];
      this.winConds.push(a);
    }
  }
  //diagonal down
  for(let i = 0; i < this.rows - 2; i++){
    for(let j = 0; j < this.rows - 2; j++){
      a = 0;
      a += this.weigths[i][j];
      a += this.weigths[i+1][j+1];
      a += this.weigths[i+2][j+2];
      this.winConds.push(a);
    }
  }
  //diagonal up
  for(let i = 2; i < this.rows; i++){
    for(let j = 0; j < this.rows - 2; j++){
      a = 0;
      a += this.weigths[i][j];
      a += this.weigths[i-1][j+1];
      a += this.weigths[i-2][j+2];
      this.winConds.push(a);
    }
  }
  //sorting
  this.winConds.sort((a,b) => a - b);




  this.setValue = function(i, j, value){
    this.grid[i][j] = value;
  }
}
