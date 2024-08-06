import type { Chess } from "chess.js"

import { Notice } from "obsidian"

import { useReducer } from "react"

export default function useMoves () {

    return useReducer((state:ChessPuzzles.Move[], {actionType, newMove}:{actionType:"PUSH"|"POP", newMove?:ChessPuzzles.Move}) => {

        let result:ChessPuzzles.Move[] = [...state]

        const cases = {
            "PUSH": () => {

                if (newMove) {

                    result.push(newMove)
                } else new Notice(`Internal error: action.newMove is undefined. At useChess > setMoves({${actionType}, ${newMove}}) dispatch`, 6000)
            },
            "POP": () => {

                result.pop()
            }
        }

        cases[actionType]()

        return result
    }, [])
}