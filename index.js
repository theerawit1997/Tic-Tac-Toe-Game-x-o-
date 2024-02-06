const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
  
    if (options[cellIndex] !== "" || !running) {
      return;
    }
  
    updateCell(this, cellIndex);
    checkWinner();
    if (running) {
      changePlayer();
    }
  }
  

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      options[a] !== "" &&
      options[a] === options[b] &&
      options[b] === options[c]
    ) {
      endGame(options[a]);
      return;
    }
  }

  if (!options.includes("") && running) {
    // It's a draw
    endGame("Draw");
  }
}

function endGame(result) {
  running = false;
  statusText.textContent =
    result === "Draw" ? "It's a Draw!" : `${result} player wins!`;
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}
