let origBoard = '';
const cells = document.querySelectorAll('.cell');

let huPlayer = '🐕';
let huPlayerSelected = 'a'
let aiPlayerSelected = 'b'
let aiPlayer = '🐈';
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

const turnClick = (e) => {
  if (typeof(origBoard[e.target.id] === 'number')){
    huPlayer = document.createElement("IMG");
    huPlayer.setAttribute("src", "https://img.icons8.com/color/48/000000/batman.png");
    aiPlayer = document.createElement("IMG");
    aiPlayer.setAttribute("src", "https://img.icons8.com/color/48/000000/superman-dc.png");

    turn(e.target.id, huPlayer , 'a');
    if (!checkTie()) turn(bestSpot(), aiPlayer, 'b')
  }
}

const turn = (squareId, player , char ) => {
  // if (typeof (origBoard[squareId] === 'number')){
    origBoard[squareId] = char;
    console.log(origBoard)
    document.getElementById(squareId).append(player);
    let gameWon = checkWin(origBoard, char);
    if (gameWon) gameOver(gameWon, char) 
  // }
}

function checkWin(board, player) {
  let plays = board.reduce((acc , text , idx) => 
    (text === player) ? acc.concat(idx) : acc, []);
    console.log(plays)
  let gameWon = null
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) !== -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon, char) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayerSelected ? "#00ffff" : "red";
  }
  cells.forEach(cell => cell.removeEventListener('click', turnClick, false));
  declareWinner(gameWon.player == huPlayerSelected ? "You win!" : "You lose.");
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
  console.log(arr);
  let aiTurn =  arr[(Math.floor(Math.random() * emptySquares().length))];
  emptySquares();
  console.log()
  origBoard[aiTurn] = aiPlayer;
  return aiTurn
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