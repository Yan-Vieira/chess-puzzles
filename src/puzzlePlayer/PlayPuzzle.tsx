import { useContext } from "react"
import { RouterContext } from "@/utils/Router"

interface Props {
    puzzle: Puzzle|null
}

export default function PlayPuzzle ({ puzzle }:Props) {

    const router = useContext(RouterContext)

    return (
        <>
        <h1>Playing {puzzle?.name}!</h1>

        <button onClick={() => router.setPath("/")}>go back</button>
        </>
    )
}