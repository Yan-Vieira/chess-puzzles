
interface Props {
    move: ChessPuzzles.Move|null,
    updateMove: React.Dispatch<{value?: ChessPuzzles.MoveValue}>,
}

export default function MoveEditor ({ move, updateMove }:Props) {

    return (
        <div>
            <h1>{move ? `${move.number}.${move.color === "black" ? " ... , ": " "}${move.san}` : "1."}</h1>

            <label htmlFor="value">Value</label>
            <select
                name="value"
                value={move?.value || "undefined"}
                onChange={(e) => {
                    if (!move) return;

                    updateMove({value: e.target.value as ChessPuzzles.MoveValue})
                }}
            >
                <option value="undefined">undefined</option>
                <option value="correct">correct</option>
                <option value="incorrect">incorrect</option>
                <option value="alternative">alternative</option>
            </select>
        </div>
    )
}