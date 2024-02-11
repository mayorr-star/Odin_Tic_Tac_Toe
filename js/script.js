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
  const playerOneName = "Player X";
  const playerTwoName = "Player O";

  const players = [
    {
      name: playerOneName,
      token: "X",
      tokenColour: "yellow",
    },
    {
      name: playerTwoName,
      token: "O",
      tokenColour: "green",
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
  const board = Gameboard.getBoard();
  const player = playerController();
  let gameOver = false;

  const reset = () => {
    gameOver = false;
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        Gameboard.dropToken("", i, j);
      };
    };
    cells.forEach(cell => handleDomLogic.getGameBoardContainer().removeChild(cell));
    handleDomLogic.renderBoard();
    if (player.getActivePlayer().name !== "Player 1") {
      player.switchPlayerTurn();
    }
    handleDomLogic.displayPlayerTurn(`${player.getActivePlayer().name}'s turn`);
  };

  const playRound = (row, column) => {
    Gameboard.dropToken(player.getActivePlayer().token, row, column);
    Gameboard.checkForDraw();
    Gameboard.checkForWin();

    if (Gameboard.checkForDraw()) {
      gameOver = true;
      return handleDomLogic.displayPlayerTurn(`It's a draw`);
    }
    if (Gameboard.checkForWin()) {
      gameOver = true;
      return handleDomLogic.displayPlayerTurn(
        `${player.getActivePlayer().token} wins`
      );
    }    
    player.switchPlayerTurn();
    handleDomLogic.displayPlayerTurn(`${player.getActivePlayer().name}'s turn`);
  };

  const getGameStatus = () => gameOver;

  return {
    reset,
    playRound,
    getGameStatus,
  };
}

const handleDomLogic = (function () {
  const form = document.querySelector("#form");
  const playerTurnContainer = document.querySelector(".player_turn");
  const ticTacToeContainer = document.querySelector(".tic_tac_toe");
  const gameBoardContainer = document.querySelector(".gameboard");
  const restartButton = document.querySelector("#restart");
  const startButton = document.querySelector("#start_game");
  const board = Gameboard.getBoard();
  const player = playerController();
  const game = gameController();

  const setError = (element, message) => {
    const parentElement = element.parentNode;
    const errorDisplay = parentElement.querySelector(".error");

    errorDisplay.textContent = message;
    parentElement.classList.add("error");
    parentElement.classList.remove("success");
  };

  const setSuccess = element => {
    const parentElement = element.parentNode;
    const errorDisplay = parentElement.querySelector(".error");

    errorDisplay.textContent = "";
    parentElement.classList.add("success");
    parentElement.classList.remove("error");
  };
  
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
  
  function getCells() {
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (!game.getGameStatus()) {
          const cellRow = parseInt(e.currentTarget.dataset.row);
          const cellColumn = parseInt(e.currentTarget.dataset.column);
          placeMarker(e, cellRow, cellColumn);
        }
      });
    });
  }
  getCells();
  
  const displayPlayerTurn = (message) => {
    playerTurnContainer.textContent = message;
  };
  displayPlayerTurn(`${player.getActivePlayer().name}'s turn`);

  function placeMarker(e, row, column) {
    if (e.target.textContent !== "") return false;
    e.target.style.color = player.getActivePlayer().tokenColour;
    game.playRound(row, column);
    e.target.textContent = board[row][column].getValue();
    player.switchPlayerTurn()
    e.target.style.color = player.getActivePlayer().tokenColour;
  }
  
  const getGameBoardContainer = () => gameBoardContainer;
  
  restartButton.addEventListener("click", () => {
    game.reset();
    getCells();
  });
  
  return {
    renderBoard,
    placeMarker,
    displayPlayerTurn,
    getGameBoardContainer,
  };
})();
