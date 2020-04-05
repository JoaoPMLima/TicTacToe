
function MakeGrid(rows){
  this.rows = rows;
  this.grid = [];
  this.weigths = [];

  //division 6x6 indexes
  this.divInd = [];
  for(let i = 0; i <= floor(this.rows/3); i++){
    for(let j = 0; j <= floor(this.rows/3); j++){
      let obj = {
        x : i,
        y : j
      }
      this.divInd.push(obj);
    }
  }

  //console.log(this.divInd);

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

  this.weigths = new Array(6).fill(new Array(6).fill(1).map(() => {
    this.a++;
    return Math.pow(2,this.a);
  })).map(x => {
    this.b++;
    return x.map(y => y*Math.pow(2,(this.b*6)));
  });



  this.winConds = [];
  //loop divInd

  for(let dontloop = 0; dontloop < 1; dontloop++){
    let emptyArray = [];
    //construct winConds array

    let a = 0;
    //horizontal
    for(let i = 0; i < 6; i++){
      for(let j = 0; j < 4; j++){
        a = 0;
        a += this.weigths[i][j];
        a += this.weigths[i][j+1];
        a += this.weigths[i][j+2];
        this.winConds.push(a);
      }
    }
    //vertical
    for(let i = 0; i < 6; i++){
      for(let j = 0; j < 4; j++){
        a = 0;
        a += this.weigths[j][i];
        a += this.weigths[j+1][i];
        a += this.weigths[j+2][i];
        this.winConds.push(a);
      }
    }
    //diagonal down
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        a = 0;
        a += this.weigths[i][j];
        a += this.weigths[i+1][j+1];
        a += this.weigths[i+2][j+2];
        this.winConds.push(a);
      }
    }
    //diagonal up
    for(let i = 2; i < 6; i++){
      for(let j = 0; j < 4; j++){
        a = 0;
        a += this.weigths[i][j];
        a += this.weigths[i-1][j+1];
        a += this.weigths[i-2][j+2];
        this.winConds.push(a);
      }
    }
    //sorting
    this.winConds.sort((a,b) => a - b);
  }


  //function to set grid value
  this.setValue = function(i, j, value){
    this.grid[i][j] = value;
  }
}
