interface Props {
    movesNumber: number,
    moves: ChessPuzzles.Move[],
    showPosition: (moveCount: number, color:"white"|"black") => void,
}

const style = `
    .mv-section {
        display: flex;
        flex-direction: column;
        min-height: 200px;
    }
`

export default function MovesHistory ({ movesNumber, moves, showPosition }:Props) {

    return (
        <>
        <section className="mv-section">
            {[...Array(movesNumber)].map((_, i) => (
                <div key={i + 1}>
                    {`${i + 1}. `}
                    
                    {moves.filter(move => move.number === i + 1).map(move => (
                        <button
                            key={move.count}
                            onClick={() => showPosition(move.count, move.color)}
                        >
                            {move.san}
                        </button>
                    ))}
                </div>
            ))}
        </section>

        <style>{style}</style>
        </>
    )
}