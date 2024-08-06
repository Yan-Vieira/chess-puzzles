import type { Chess } from "chess.js"

import { useReducer } from "react"

export default function useTurn (chessjs:Chess) {

    return useReducer(() => {

        return chessjs.turn() === "w" ? "white" : "black"

    }, "white", () => chessjs.turn() === "w" ? "white" : "black")
}