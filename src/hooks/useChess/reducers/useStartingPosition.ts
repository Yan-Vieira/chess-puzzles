import type { Chess } from "chess.js"

import { Notice } from "obsidian"

import { useReducer } from "react"

export default function useStartingPosition (chessjs:Chess) {

    return useReducer((state:string, {newFen}:{newFen:string}) => {

        if (newFen === state) return state
          
            try {

                chessjs.load(newFen)

                return newFen
                
            } catch (error) {

                new Notice(error, 6000)
                
                return chessjs.fen()
            }

    }, chessjs.fen())
}