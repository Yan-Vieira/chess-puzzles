import type { Chess } from "chess.js"

import { Notice } from "obsidian"

import { useEffect, useState, useReducer, useRef } from "react"

export default function useChess (chessjs:Chess, startPosition?:string) {

    //#region reducers
    const [fen, updateFen] = useReducer((state:string, {newFen}:{newFen?:string}) => {

        if (newFen) {
            
            chessjs.load(newFen)

            return newFen
            
        } else return chessjs.fen()

    }, chessjs.fen())

    const [dests, updateDests] = useReducer(() => {
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

    const [history, updateHistory] = useReducer(() => {

        return chessjs.history({ verbose: true })

    }, chessjs.history({ verbose: true }))

    const [turn, updateTurn] = useReducer(() => {

        return chessjs.turn() === "w" ? "white" : "black"

    }, "white", () => chessjs.turn() === "w" ? "white" : "black")

    const [currentMove, updateCurrentMove] = useReducer((state = null, {value}:{value?: ChessPuzzles.MoveValue}) => {

        const lastMove = history.last()

        if (!lastMove) return null

        const san = lastMove.san

        const newMove = {
            number: chessjs.moveNumber(),
            color: lastMove.color === "w" ? "white" : "black",
            from: lastMove.from,
            to: lastMove.to,
            value: value || "undefined",
            san,
        } as ChessPuzzles.Move

        return newMove

    }, null)

    //#endregion

    const moves = useRef<ChessPuzzles.Move[]>([])

    useEffect(() => {

        updateTurn()

        updateDests()

        updateCurrentMove({})

        if (!currentMove) return;

        moves.current.push(currentMove)

    }, [fen])

    const move = (from:string, to:string) => {

        try {

            const san = chessjs.move({ from, to }).san

            updateFen({})

            updateHistory()

            updateCurrentMove({})

        } catch (error) {

            chessjs.reset()

            updateFen({})

            updateHistory()

            new Notice(error, 6000)

            return null
        }
    }

    //#region onInit

    if (startPosition) {

        chessjs.load(startPosition)

        updateFen({newFen: startPosition})
    }

    //#endregion

    return {
        fen,
        dests,
        turn: turn as "white" | "black",
        history,
        currentMove,
        moves,
        updateFen,
        move,
        updateCurrentMove
    }
}