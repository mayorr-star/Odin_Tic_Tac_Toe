/* The Gameboard object represents our gameboard. Each sqaure on the board has a cell */
const Gameboard = (function() {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];
    
    for (let i = 0; i < rows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameBoard[i].push(Cell());
        }
    };
    
    const getBoard = () => gameBoard;
    
    return {getBoard};
})();

function Cell() {
    let value = 0;
    /* function to add vaue to the cell */
    const addToken = (player) => {
        value = player;
    }
    const getValue = () => value;

    return {addToken, getValue};
}

function playersController() {
    const playerOneName = "Player 1";
    const playerTwoName = "Player 2";

    const players = [
        {
            name: playerOneName,
            token:"X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players [0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    return {getActivePlayer}
}