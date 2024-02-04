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
    const checkForDraw = () => {
        return gameBoard.every(row => row.every(cell => cell.getValue() !== ""));
    }
    const checkForWin = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[0][i].getValue() === gameBoard[1][i].getValue() && gameBoard[0][i].getValue() === gameBoard[2][i].getValue()) {
                return gameBoard[0][i].getValue();
            } else if (gameBoard[i][0].getValue() === gameBoard[i][1].getValue() && gameBoard[i][0].getValue() === gameBoard[i][2].getValue()) {
                return gameBoard[i][0].getValue();
            }
            if (gameBoard[0][0].getValue() === gameBoard[1][1].getValue() && gameBoard[0][0].getValue() === gameBoard[2][2].getValue()){
                return gameBoard[0][0].getValue();
            } else if(gameBoard[0][2].getValue() === gameBoard[1][1].getValue() && gameBoard[0][2].getValue() === gameBoard[2][0].getValue()) {
                return gameBoard[0][2].getValue();
            }
        }
    };
    return {
        getBoard,
        dropToken,
        printBoard,
        checkForDraw,
        checkForWin
    };
})();
Gameboard.checkForWin()
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
    let gameOver = false;

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
        Gameboard.checkForDraw();
        Gameboard.checkForWin();

        if (Gameboard.checkForDraw()) {
            gameOver = true;
            //do something
            console.log("draw")
        }
        if (Gameboard.checkForWin()) {
            gameOver = true;
            //do something
            console.log(`${player.getActivePlayer().token} wins`)
        }
        player.switchPlayerTurn();
    }

    return {
        start,
        reset,
        playRound
    };
}
const game = gameController()
const player = playerController()
game.start()
game.playRound(0, 0)
player.switchPlayerTurn()
console.log(`${player.getActivePlayer().name}'s turn`);
console.log(`dropping ${player.getActivePlayer().name}'s token into row ${1} column ${2}`);
game.playRound(0, 1)
player.switchPlayerTurn();
console.log(`${player.getActivePlayer().name}'s turn`);
console.log(`dropping ${player.getActivePlayer().name}'s token into row ${2} column ${0}`);
game.playRound(1, 0)
player.switchPlayerTurn();
console.log(`${player.getActivePlayer().name}'s turn`);
console.log(`dropping ${player.getActivePlayer().name}'s token into row ${2} column ${2}`);
game.playRound(1, 1)
player.switchPlayerTurn();
console.log(`${player.getActivePlayer().name}'s turn`);
console.log(`dropping ${player.getActivePlayer().name}'s token into row ${3} column ${1}`);
game.playRound(2, 0)

