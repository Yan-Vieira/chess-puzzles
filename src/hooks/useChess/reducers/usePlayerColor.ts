import type { Chess } from "chess.js"

import { useReducer } from "react"

export default function usePlayerColor (chessjs:Chess) {

    return useReducer(() => {

        if (chessjs.fen().search("w") > 0) return "white"
        
        return "black"
        
    }, "white")
}