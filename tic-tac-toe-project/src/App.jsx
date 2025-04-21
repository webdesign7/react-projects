import {Player} from "./components/Player.jsx";
import {GameBoard} from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = Array(3).fill(Array(3).fill(""));
const WINNING_COMBINATIONS = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
];

function deriveCurrentPlayer(turns) {
    return turns.length % 2 === 0 ? "O" : "X";
}

function calculateWinner(board) {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (
            board[a[0]][a[1]] &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[a[0]][a[1]] === board[c[0]][c[1]]
        ) {
            return board[a[0]][a[1]];
        }
    }
    return null;
}

function updateGameBoard(turns) {
    const board = initialGameBoard.map(row => [...row]);
    turns.forEach(({player, square: {row, col}}) => {
        board[row][col] = player;
    });
    return board;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState({X: "Player 1", O: "Player 2"});

    const currentPlayer = deriveCurrentPlayer(gameTurns);
    const gameBoard = updateGameBoard(gameTurns);
    const winnerSymbol = calculateWinner(gameBoard);
    const isADraw = gameTurns.length === 9 && !winnerSymbol;

    function handleSquareClick(row, col) {
        if (gameBoard[row][col] || winnerSymbol) return;

        setGameTurns(prevTurns => [
            {player: currentPlayer, square: {row, col}},
            ...prevTurns,
        ]);
    }

    function resetGame() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => ({...prevPlayers, [symbol]: newName}));
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={players.O}
                        symbol="O"
                        isActive={currentPlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={players.X}
                        symbol="X"
                        isActive={currentPlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winnerSymbol || isADraw) && (
                    <GameOver
                        winnerSymbol={winnerSymbol ? players[winnerSymbol] : null}
                        onReset={resetGame}
                    />
                )}
                <GameBoard onSelectedSquare={handleSquareClick} board={gameBoard}/>
                <Log turns={gameTurns}/>
            </div>
        </main>
    );
}

export default App;