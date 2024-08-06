import type { Chess } from "chess.js"

import { useReducer } from "react"

export default function useCurrentMove (chessjs:Chess, moves:ChessPuzzles.Move[], updateMoves:ChessPuzzles.UseMovesDispatcher) {

    return useReducer((state:ChessPuzzles.Move|null, {value, onlyUndo}:{value?: ChessPuzzles.MoveValue, onlyUndo?:boolean}) => {

        if (onlyUndo === true) {

            const previousMove = moves.last()

            if (previousMove) {

                return previousMove

            } else return null
        }

        if (value && state) {

            const lastMove = moves.last()

            if (lastMove) {lastMove.value = value}

            return {...state, value}
        }

        const lastMove = chessjs.history({ verbose: true }).last()

        if (!lastMove) return null

        const san = lastMove.san
        const fen = lastMove.after

        const moveNumber = lastMove.color === "w" ? chessjs.moveNumber() : chessjs.moveNumber() - 1

        const newMove = {
            number: moveNumber,
            count: lastMove.color === "w" ? moveNumber : moveNumber + 1,
            color: lastMove.color === "w" ? "white" : "black",
            from: lastMove.from,
            to: lastMove.to,
            value: value || "undefined",
            san,
            fen
        } as ChessPuzzles.Move

        updateMoves({actionType: "PUSH", newMove})

        return newMove

    }, null)
}