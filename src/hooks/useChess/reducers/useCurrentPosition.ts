import type { Chess } from "chess.js"

import { useReducer } from "react"

export default function useCurrentPosition (chessjs:Chess) {

    return useReducer((state:string, {fen}:{fen?:string}) => {

        return fen ? fen : chessjs.fen()

    }, chessjs.fen())
}