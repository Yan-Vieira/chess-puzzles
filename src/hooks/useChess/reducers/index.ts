import type { Chess } from "chess.js"

import useHalfMovesCounter from "./useHalfMovesCounter"
import useTurn from "./useTurn"
import useStartingPosition from "./useStartingPosition"
import usePlayerColor from "./usePlayerColor"
import useMoves from "./useMoves"
import useDests from "./useDests"
import useCurrentPosition from "./useCurrentPosition"
import useCurrentMove from "./useCurrentMove"

export default function useChessReducers (chessjs:Chess) {

    const [turn, updateTurn] = useTurn(chessjs)
    const [startingPosition, updateStartingPosition] = useStartingPosition(chessjs)
    const [playerColor, updatePlayerColor] = usePlayerColor(chessjs)
    const [moves, updateMoves] = useMoves()
    const [currentPosition, updateCurrentPosition] = useCurrentPosition(chessjs)
    const [currentMove, updateCurrentMove] = useCurrentMove(chessjs, moves, updateMoves)
    const [dests, updateDests] = useDests(chessjs)

    return {
        turn,
        startingPosition,
        playerColor,
        moves,
        currentPosition,
        currentMove,
        dests,
        updateTurn,
        updateStartingPosition,
        updatePlayerColor,
        updateMoves,
        updateCurrentPosition,
        updateCurrentMove,
        updateDests
    }
}