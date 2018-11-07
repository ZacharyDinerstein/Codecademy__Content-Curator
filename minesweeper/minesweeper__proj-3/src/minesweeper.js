// Minesweeper__Proj 2 -- Dynamically Generate Game Boards

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];

  for (let i = 0; i < numberOfRows; i++ ){
    let row = [];
    for (let j = 0; j < numberOfColumns; j++ ){
      row.push('   ');
    }
    board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];

  for (let i = 0; i < numberOfRows; i++ ){
    let row = [];
    for (let j = 0; j < numberOfColumns; j++ ){
      row.push(' ~ ');
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;

  while(numberOfBombsPlaced < numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = ' B ';
    numberOfBombsPlaced++;
  }
  return board;
}

const printBoard = (board) => {
  for (let i = 0; i < board[0].length; i++){
    /* Create board. Loop through each cell in each row. In each cell,
    join the embedded values (usually blank spaces), and seperate them
    by '|' symbols. */
    console.log(board[i].join(' | '))
  }
}

const makeSelection = (rowSelected, columnSelected, playerBoard, bombBoard) => {
  /* What's in selected box */
  let chosenBoxValue = bombBoard[rowSelected][columnSelected];
  let adjacentBombsNum;

  /* If chosen box contains a bomb, game over */
  if (chosenBoxValue.includes("B")){
    return chosenBoxValue;
  } else {
    console.log(playerBoard.length)
    let totalNumOfRows = playerBoard.length;
    let totalNumOfColumns = playerBoard[0].length

    /* Find how many bombs surround the selected box */
    adjacentBombsNum = findAdjacentBombs(rowSelected, columnSelected, 3, 3, totalNumOfRows, totalNumOfColumns);

    return adjacentBombsNum;
  }
}

const findAdjacentBombs = (rowToStartOn, columnToStartOn, numOfRowsToCheck, numOfColumnsToCheck, totalNumOfRows, totalNumOfColumns) => {
  let bombNum = 0;

  console.log("Row to start on: " + rowToStartOn);
  console.log("Column to start on: " + columnToStartOn);

  /* Always start searching for bombs one row up and one column left, unless... */
  rowToStartOn = rowToStartOn -1;
  columnToStartOn = columnToStartOn -1;

  if (rowToStartOn === -1) {
    numOfRowsToCheck = numOfRowsToCheck -1;
    rowToStartOn = rowToStartOn +1;
  }
  if (rowToStartOn === totalNumOfRows - 1){
    numOfRowsToCheck = numOfRowsToCheck -1;
  }
  if (columnToStartOn === -1){
    numOfColumnsToCheck = numOfColumnsToCheck -1;
    columnToStartOn = columnToStartOn +1;
  }
  if (columnToStartOn === totalNumOfColumns -1){
    numOfColumnsToCheck = numOfColumnsToCheck -1;
  }

  /* Run through each row and column. For every bomb found, increment bombNum */
  for (let i = rowToStartOn; i < numOfRowsToCheck; i++ ){
    for (let j = columnToStartOn; j < numOfColumnsToCheck; j++ ){
      console.log('i: ' + i);
      console.log('j: ' + j);
      if (bombBoard[i][j].includes("B")){
        bombNum++
      }
    }
  }
  return bombNum;
}

let playerBoard = generatePlayerBoard(5,3);
let bombBoard = generateBombBoard(3,3,3);

printBoard(playerBoard);
printBoard(bombBoard);
console.log();
console.log("Make your selection:");

console.log(makeSelection(2, 2, playerBoard, bombBoard));
