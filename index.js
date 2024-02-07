const cellContainer = document.getElementById("cellContainer");
let size = 3; // Initial size
let totalCells = size * size;
let cells; // Declare cells in the global scope
let statusText; // Declare statusText in the global scope
let restartBtn; // Declare restartBtn in the global scope
let options;
let currentPlayer;
let running;
let winConditions;

initializeGame();

function initializeGame() {
  cellContainer.innerHTML = ""; // Clear existing cells

  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      const contentSpan = document.createElement("span"); // Create a span for the content
      cell.setAttribute("cellIndex", i * size + j);
      cell.classList.add("cell");

      // Add the span to the cell and set its class
      cell.appendChild(contentSpan);
      contentSpan.classList.add("content");

      row.appendChild(cell);
    }

    cellContainer.appendChild(row);
  }

  // Set grid-template-columns dynamically based on the selected size
  cellContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

  cells = document.querySelectorAll(".cell");
  statusText = document.querySelector("#statusText");
  restartBtn = document.querySelector("#restartBtn");

  winConditions = [];
  for (let i = 0; i < totalCells; i += size) {
    let row1 = [];
    for (let j = 0; j < size; j++) {
      row1.push(i + j);
    }
    winConditions.push(row1);
  }
  for (let j = 0; j < size; j++) {
    let row2 = [];
    for (let i = 0; i < totalCells; i += size) {
      row2.push(i + j);
    }
    winConditions.push(row2);
  }
  let row3 = [];
  for (let i = 0; i < size; i++) {
    let tmp = (size + 1) * i;
    row3.push(tmp);
  }
  winConditions.push(row3);
  let row4 = [];
  for (let i = 0; i < size; i++) {
    let tmp = (size - 1) * i + (size - 1);
    row4.push(tmp);
  }
  winConditions.push(row4);

  console.log("size:", size);
  console.log("totalCells:", totalCells);
  console.log("All way to win :", winConditions);

  options = Array(totalCells).fill("");
  currentPlayer = "X";
  running = true;

  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  statusText.style.color = getColor(currentPlayer);
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
  const contentSpan = cell.querySelector(".content");

  if (contentSpan) {
    // Clear any existing content and classes
    contentSpan.textContent = "";
    contentSpan.classList.remove("X", "O");

    // Set the new content and add the class
    contentSpan.textContent = currentPlayer;
    contentSpan.classList.add("content", currentPlayer);
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerHTML = `<span style="color: ${getColor(
    currentPlayer
  )};">${currentPlayer}'s turn</span>`;
}

function checkWinner() {
  for (let condition of winConditions) {
    const isWinningCombo = condition.every(
      (index) => options[index] === currentPlayer
    );

    if (isWinningCombo) {
      endGame(currentPlayer);
      return;
    }
  }

  if (!options.includes("") && running) {
    endGame("Draw");
  }
}

function endGame(result) {
  running = false;
  const color = result === "Draw" ? "black" : getColor(result);
  statusText.innerHTML = `<span style="color: ${color};">${
    result === "Draw" ? "It's a Draw!" : `${result} player wins!`
  }</span>`;
}

function getColor(player) {
  return player === "X" ? "red" : "blue";
}

function changeGridSize(newSize) {
  if (newSize !== size) {
    size = newSize;
    totalCells = size * size;
    winConditions = []; // Recalculate win conditions based on the new size
    initializeGame(); // Reinitialize the game with the new size
  }
}

function restartGame() {
  options = Array(totalCells).fill("");
  currentPlayer = "X";
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;

  // Clear content and classes for each cell
  cells.forEach((cell) => {
    const contentSpan = cell.querySelector(".content");
    if (contentSpan) {
      contentSpan.textContent = "";
      contentSpan.classList.remove("X", "O");
    }
  });
}
