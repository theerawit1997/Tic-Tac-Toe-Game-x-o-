const cellContainer = document.getElementById("cellContainer");
let size = 3; // Initial size
let totalCells = size * size;
let cells; // Declare statusText in the global scope
let statusText;
let restartBtn;
let options;
let currentPlayer;
let running;
let winConditions;
let playerX = [];
let playerO = [];
let playHistory = [];
let replayStatus = false;

// Add the following lines to the global scope for replay functionality
let replayBtn;
let replayIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  initializeGame();

  // Move the event listener assignment for the "Restart" button here
  restartBtn = document.querySelector("#restartBtn");
  replayBtn = document.querySelector("#replayBtn");

  // Check if the event listener has not been attached before adding it
  if (!restartBtn.onclick) {
    restartBtn.onclick = restartGame;
  }

  if (!replayBtn.onclick) {
    replayBtn.onclick = startReplay;
  }
});

function initializeGame() {
  cellContainer.innerHTML = ""; // Clear existing cells

  // Reset player arrays
  // playerX = [];
  // playerO = [];
  // playHistory = [];

  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      const contentSpan = document.createElement("span"); // Create a span for the content
      const cellIndex = i * size + j;

      cell.setAttribute("cellIndex", cellIndex);
      cell.classList.add("cell");

      // Add the span to the cell and set its class
      cell.appendChild(contentSpan);
      contentSpan.classList.add("content");

      // Add a small number to represent the cell location
      const numberSpan = document.createElement("span");
      numberSpan.textContent = cellIndex;
      numberSpan.classList.add("cell-number");
      cell.appendChild(numberSpan);

      row.appendChild(cell);
    }

    cellContainer.appendChild(row);
  }

  // Set grid-template-columns dynamically based on the selected size
  cellContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

  cells = document.querySelectorAll(".cell");
  statusText = document.querySelector("#statusText");

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

  // console.log("size:", size);
  // console.log("totalCells:", totalCells);
  // console.log("All way to win :", winConditions);

  options = Array(totalCells).fill("");
  currentPlayer = "X";
  running = true;

  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  statusText.textContent = `${currentPlayer}'s turn`;
  statusText.style.color = getColor(currentPlayer);
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] !== "" || !running || replayStatus) {
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
  // console.log("turn:", currentPlayer);

  if (contentSpan) {
    // Clear any existing content and classes
    contentSpan.textContent = "";
    contentSpan.classList.remove("X", "O");

    // Set the new content and add the class
    contentSpan.textContent = currentPlayer;
    contentSpan.classList.add("content", currentPlayer);
  }

  // Update player arrays only during the actual game, not during replay
  if (running && !replayStatus) {
    if (currentPlayer === "X") {
      playerX.push(index);
    } else {
      playerO.push(index);
    }
    // Update playHistory array only during the actual game, not during replay
    playHistory.push({ player: currentPlayer, index });
    // console.log({ player: currentPlayer, index });
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
      // console.log("isWinningCombo:", condition);
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

  if (result === "Draw") {
    statusText.innerHTML = '<span style="color: black;">It\'s a Draw!</span>';
    // console.log("Draw!");
  } else {
    statusText.innerHTML = `<span style="color: ${getColor(
      result
    )};">${result} player wins!</span>`;
    // console.log("player wins! :", result);
    // Highlight the winning cells
    const winningCells = winConditions.find((condition) => {
      return condition.every((index) => options[index] === result);
    });

    if (winningCells) {
      for (const index of winningCells) {
        cells[index].classList.add("highlight");
      }
    }
  }

  // console.log("PlayerX History:", playerX);
  // console.log("PlayerO History:", playerO);
  // console.log("Game History:", playHistory);
  replayBtn.disabled = false;
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
    restartGame()
  }
  // console.log("changeGridSize", newSize);
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

    // Remove highlight class
    cell.classList.remove("highlight");
  });

  // Reset player arrays
  playerX = [];
  playerO = [];
  playHistory = [];
  // console.log("restartGame");
  replayBtn.disabled = true;
}

function startReplay() {
  if (playHistory.length === 0) {
    // console.log("No moves to replay.");
    replayStatus = false;
    return;
  }

  // console.log("start Replay");

  // Disable the "Restart" and "Replay" buttons during replay
  restartBtn.disabled = true;
  replayBtn.disabled = true;

  // Disable grid size buttons during replay
  disableGridSizeButtons();

  // Reset the game and start replaying moves
  initializeGame();
  replayIndex = 0;
  replayStatus = true; // Set replayStatus to true after initializing
  replayNextMove();
}

function replayNextMove() {
  // console.log("Replaying move", replayIndex, "of", playHistory.length);

  if (replayIndex < playHistory.length) {
    const move = playHistory[replayIndex];
    replayMove(move);
    replayIndex++;
    setTimeout(replayNextMove, 1000); // Adjust the delay between moves as needed
  } else {
    // console.log("currentPlayer",currentPlayer);
    // console.log("Replay complete");
    // Enable the "Restart" and "Replay" buttons after replay is complete
    restartBtn.disabled = false;
    replayBtn.disabled = false;
    replayStatus = false; // Set replayStatus to false after replay is complete

    // I don't know why without it it doesn't checkWinner();
    changePlayer();
    checkWinner();

    // Enable grid size buttons after replay is complete
    enableGridSizeButtons();
  }
}

function replayMove(move) {
  const { player, index } = move;
  const cell = cells[parseInt(index)]; // Convert index to a number

  // Update the cell content and player in the status text
  updateCell(cell, parseInt(index));

  // Switch to the other player for the next move
  currentPlayer = player === "X" ? "O" : "X";

  // Change the player in the status text
  statusText.innerHTML = `<span style="color: ${getColor(
    player
  )};">${player}'s turn (Replaying)</span>`;
}

function disableGridSizeButtons() {
  const gridSizeButtons = document.querySelectorAll("#sizeButtons button");
  gridSizeButtons.forEach(button => {
    button.disabled = true;
  });
}

function enableGridSizeButtons() {
  const gridSizeButtons = document.querySelectorAll("#sizeButtons button");
  gridSizeButtons.forEach(button => {
    button.disabled = false;
  });
}