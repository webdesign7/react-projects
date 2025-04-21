export default function GameOver({winnerSymbol, onReset}) {
    return (
        <div id="game-over">
            {winnerSymbol && <h2>{`Player ${winnerSymbol} wins!`}</h2>}
            {!winnerSymbol && <h2>It's a draw!</h2>}
            <button onClick={onReset}>Play Again</button>
        </div>
    )
}