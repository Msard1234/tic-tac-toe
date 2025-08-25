let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById("status");
const boardContainer = document.getElementById("board");

function renderBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => handleCellClick(index));
    boardContainer.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  checkResult();
}

function checkResult() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // ردیف‌ها
    [0,3,6], [1,4,7], [2,5,8], // ستون‌ها
    [0,4,8], [2,4,6]           // قطرها
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusDisplay.textContent = `🎉 بازیکن ${currentPlayer} برنده شد!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "😐 مساوی شد!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `نوبت بازیکن ${currentPlayer}`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = `نوبت بازیکن ${currentPlayer}`;
  renderBoard();
}

renderBoard();