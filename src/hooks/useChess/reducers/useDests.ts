import type { Chess } from "chess.js"

import { useReducer } from "react"

export default function useDests (chessjs:Chess) {

    return useReducer(() => {
        let result:Map<string, string[]> = new Map()

        chessjs.board().forEach((rank) => {
            
            rank.forEach(item => {

                if (item) {

                    const moves = chessjs.moves({square: item.square, verbose: true}).map(move => move.to)

                    result.set(item.square, moves)
                }
            })
        })

        return result

    },
    new Map(),
    () => {
        let result:Map<string, string[]> = new Map()

        chessjs.board().forEach((rank) => {
            
            rank.forEach(item => {

                if (item) {

                    const moves = chessjs.moves({square: item.square, verbose: true}).map(move => move.to)

                    result.set(item.square, moves)
                }
            })
        })

        return result

    })
}