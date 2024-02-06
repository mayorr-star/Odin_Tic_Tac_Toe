const Gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const gameBoard = [];

  for (let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameBoard[i].push(cell());
    }
  }

  const getBoard = () => gameBoard;
  const printBoard = () => {
    const boardWithTokens = gameBoard.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithTokens);
  };
  const dropToken = (player, selectedRow, selectedColumn) => {
    const updatedBoard = gameBoard.map((row, index) => {
      if (selectedRow === index) {
        row[selectedColumn].addToken(player);
      }
    });
  };
  const checkForDraw = () => {
    return gameBoard.every((row) =>
      row.every((cell) => cell.getValue() !== "")
    );
  };
  const checkForWin = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      if (
        gameBoard[0][i].getValue() === gameBoard[1][i].getValue() &&
        gameBoard[0][i].getValue() === gameBoard[2][i].getValue()
      ) {
        return gameBoard[0][i].getValue();
      } else if (
        gameBoard[i][0].getValue() === gameBoard[i][1].getValue() &&
        gameBoard[i][0].getValue() === gameBoard[i][2].getValue()
      ) {
        return gameBoard[i][0].getValue();
      }
      if (
        gameBoard[0][0].getValue() === gameBoard[1][1].getValue() &&
        gameBoard[0][0].getValue() === gameBoard[2][2].getValue()
      ) {
        return gameBoard[0][0].getValue();
      } else if (
        gameBoard[0][2].getValue() === gameBoard[1][1].getValue() &&
        gameBoard[0][2].getValue() === gameBoard[2][0].getValue()
      ) {
        return gameBoard[0][2].getValue();
      }
    }
  };
  return {
    getBoard,
    dropToken,
    printBoard,
    checkForDraw,
    checkForWin,
  };
})();

function cell() {
  let value = "";

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function playerController() {
  const playerOneName = "Player 1";
  const playerTwoName = "Player 2";

  const players = [
    {
      name: playerOneName,
      token: "X",
      tokenColour: "green",
    },
    {
      name: playerTwoName,
      token: "O",
      tokenColour: "yellow",
    },
  ];
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  return {
    getActivePlayer,
    switchPlayerTurn,
  };
}

function gameController() {
  const player = playerController();
  let gameOver = false;

  const start = () => {
    Gameboard.getBoard();
    console.log(Gameboard.getBoard());
  };
  const reset = () => {
    gameOver = false;
  };
  
  const playRound = (row, column) => {
    console.log(`${player.getActivePlayer().name}'s turn`);
    console.log(
      `dropping ${
        player.getActivePlayer().name
      }'s token into row ${row} column ${column}`
    );
    Gameboard.dropToken(player.getActivePlayer().token, row, column);
    Gameboard.printBoard();
    Gameboard.checkForDraw();
    Gameboard.checkForWin();

    if (Gameboard.checkForDraw()) {
      gameOver = true;
      //do something
      console.log("draw");
    }
    if (Gameboard.checkForWin()) {
      gameOver = true;
      //do something
      console.log(`${player.getActivePlayer().token} wins`);
    }
    player.switchPlayerTurn();
  };

  return {
    start,
    reset,
    playRound,
  };
}

const handleDomLogic = (function () {
  const playerTurnContainer = document.querySelector(".player_turn");
  const gameBoardContainer = document.querySelector(".gameboard");
  const board = Gameboard.getBoard();
  const player = playerController();
  const game = gameController();

  const renderBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.createElement("button");
        cell.setAttribute("type", "button");
        cell.classList.add("cell");
        cell.setAttribute("data-row", i);
        cell.setAttribute("data-column", j);
        cell.textContent = board[i][j].getValue();
        gameBoardContainer.appendChild(cell);
      }
    }
  };
  renderBoard();

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const cellRow = parseInt(e.currentTarget.dataset.row);
      const cellColumn = parseInt(e.currentTarget.dataset.column);
      placeMarker(e, cellRow, cellColumn);
    });
});

function placeMarker(e, row, column) {
    if (e.target.textContent !== "") return false;
    game.playRound(row, column);
    e.target.textContent = board[row][column].getValue();
    e.currentTarget.style.color = player.getActivePlayer().tokenColour;
  }

  return {
    renderBoard,
    placeMarker,
  };
})();
