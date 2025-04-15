const board = document.getElementById("board");
const info = document.getElementById("info");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", onCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }

  info.textContent = "Your turn (X)";
  gameActive = true;
}

function onCellClick(e) {
  const cell = e.target;
  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  if (checkWinner(currentPlayer)) {
    info.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    info.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (currentPlayer === "O") {
    info.textContent = "Computer's turn (O)";
    setTimeout(computerMove, 500);
  } else {
    info.textContent = "Your turn (X)";
  }
}

function computerMove() {
  const emptyCells = cells.filter(c => c.textContent === "");
  if (emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = "O";

  if (checkWinner("O")) {
    info.textContent = "Computer wins! 😢";
    gameActive = false;
    return;
  }

  if (isDraw()) {
    info.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  info.textContent = "Your turn (X)";
}

function checkWinner(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winCombos.some(combo => 
    combo.every(index => cells[index].textContent === player)
  );
}

function isDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function resetGame() {
  currentPlayer = "X";
  createBoard();
}

createBoard();
