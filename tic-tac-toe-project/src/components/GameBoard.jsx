export function GameBoard({onSelectedSquare, board}) {

    return (<ol id="game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((col, colIndex) => (
                        <li key={colIndex}>
                            <button
                                disabled={col !== ""}
                                onClick={() => onSelectedSquare(rowIndex, colIndex)}>{col}
                            </button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>);
}