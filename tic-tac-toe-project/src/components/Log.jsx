export default function Log({turns}) {
    return (
        <div id="log">
            <h2>Game Log</h2>
            <ol>
                {turns.map((turn, index) => (
                    <li key={index}>
                        <span>{`Player ${turn.player} played at row ${turn.square.row}, column ${turn.square.col}`}</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}