import { useContext } from "react"
import { RouterContext } from "@/utils/Router"

interface Props {
    puzzles: Puzzle[],
    setPuzzle: React.Dispatch<React.SetStateAction<Puzzle|null>>
}

export default function PuzzlesList ({ puzzles, setPuzzle }:Props) {

    const router = useContext(RouterContext)

    return (
        <>
        <h1>Puzzles list</h1>

        {puzzles.map(puzzle => (
            <div
                key={puzzle.id}
            >
                <button
                    onClick={() => {
                        setPuzzle(puzzle)
                        router.setPath("/play-puzzle")
                    }}
                >
                    {puzzle.name}
                </button>
            </div>
        ))}

        <button onClick={() => router.setPath("/play-puzzle")}>Go to puzzle</button>
        </>
    )
}