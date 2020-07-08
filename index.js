let origBoard = '';
const huPlayer = '🐕';
const aiPlayer = '🐈';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const cells = document.querySelectorAll('.cell');

const turnClick = (e) => {
  if (typeof(origBoard[e.target.id] === 'number')){
    turn(e.target.id, huPlayer);
    if (!checkTie()) turn(bestSpot(), aiPlayer)
  }
}

const turn = (squareId, player) => {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon) 
}

function checkWin(board, player) {
  let plays = board.reduce((acc , text , idx) => 
    (text === player) ? acc.concat(idx) : acc, []);
  let gameWon = null
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) !== -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? "#00ffff" : "red";
  }
  cells.forEach(cell => cell.removeEventListener('click', turnClick, false));
  declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

const startGame = () => {
  document.querySelector('.endgame').style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  cells.forEach(cell => {
    cell.style.removeProperty('background-color');
    cell.innerHTML = '';
    cell.addEventListener('click', turnClick, {once : true});
  })
}

function emptySquares() {
  return origBoard.filter(spot => typeof spot === 'number')
}

function bestSpot() {
  const arr = emptySquares();
  return arr[(Math.floor(Math.random() * emptySquares().length))];
}

function checkTie() {
  if (emptySquares().length == 0) {
    cells.forEach(cell => {cell.style.backgroundColor = "green";
      cell.removeEventListener('click', turnClick, false)
    });
    declareWinner("Tie Game!")
    return true;
  }
  return false;
}

function declareWinner(winner) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerHTML = winner;
}

startGame();