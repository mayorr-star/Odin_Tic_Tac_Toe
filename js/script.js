const Gameboard = (function() {
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
        const boardWithTokens = gameBoard.map(row => row.map(cell => cell.getValue()))
        console.log(boardWithTokens)
    }
    const dropToken = (player, selectedRow, selectedColumn) => {
        const updatedBoard = gameBoard.map((row, index) => {
            if (selectedRow === index) {
                row[selectedColumn].addToken(player)
            }
        })
    };

    return {
        getBoard,
        dropToken,
        printBoard
    };
})();

function cell() {
    let value = "";

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;
    
    return {
        addToken,
        getValue
    };
}

function playerController() {
    const playerOneName = "Player 1";
    const playerTwoName = "Player 2";

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    return{
        getActivePlayer,
        switchPlayerTurn
    };
}

function gameController() {
    const player = playerController();
    const gameOver = false;

    const start = () => {
        Gameboard.getBoard()
        console.log(Gameboard.getBoard());
    }
    const reset = () => {

    }
    const playRound = (row, column) => {
        console.log(`${player.getActivePlayer().name}'s turn`);
        console.log(`dropping ${player.getActivePlayer().name}'s token into row ${row + 1} column ${column + 1}`);
        Gameboard.dropToken(player.getActivePlayer().token, row, column);
        Gameboard.printBoard();
        player.switchPlayerTurn()
    }

    return {
        start,
        reset,
        playRound
    };
}