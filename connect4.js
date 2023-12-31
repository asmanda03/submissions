const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1;
let board = []; 

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

function makeHtmlBoard() {
  const board = document.getElementById('board');
     
  const ghostRow = document.createElement('tr');
  ghostRow.setAttribute('id', 'column-top');
  ghostRow.addEventListener('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    ghostRow.append(headCell);
  } 

  board.append(ghostRow);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

function handleClick(evt) {

  const x = +evt.target.id;

  //console.log(x);

  const y = findSpotForCol(x);
  
  //console.log(y)

  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;
  placeInTable(y, x);
  
  if (checkForWin()) {
    return alert(`Player ${currPlayer} won!`);
  }
  
  /*if(board.every(function(row){
    return row.every(function(cell){
        return cell;})
  })) {return alert("Tie!")}*/
  if (board.every(row => row.every(cell => cell))) {
    return alert('Tie!');
  }

  currPlayer = currPlayer === 1 ? 2 : 1;
}


function checkForWin() {
  function _win(cells) {

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
