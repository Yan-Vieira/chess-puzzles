import type { Chess } from "chess.js"

import { Notice } from "obsidian"

import { useEffect, useState } from "react"

import useChessReducers from "./reducers"

export default function useChess (chessjs:Chess, initialPosition?:string) {

    const [viewOnly, setViewOnly] = useState(false)

    const reducers = useChessReducers(chessjs)

    useEffect(() => reducers.updateCurrentPosition({}), [reducers.startingPosition])

    useEffect(() => {

        reducers.updateTurn()

        reducers.updateDests()

    }, [reducers.currentPosition])

    const move = (from:string, to:string) => {

        try {

            chessjs.move({ from, to })

        } catch (error) {

            new Notice(error, 6000)

        } finally {
            
            reducers.updateCurrentPosition({})

            reducers.updateCurrentMove({})
        }
    }

    const undoHalfMove = () => {

        chessjs.undo()

        reducers.updateMoves({actionType: "POP"})

        reducers.updateCurrentMove({onlyUndo: true})

        reducers.updateCurrentPosition({})
    }

    const showPosition = (moveCount:number, color:"white"|"black") => {

        try {

            setViewOnly(true)

            const move = reducers.moves.find(value => value.count === moveCount)

            const lastMove = reducers.moves.last()

            if (move) {

                console.log(move.count)

                reducers.updateCurrentPosition({fen: move.fen})

                if (lastMove !== undefined) {

                    move.count === lastMove.count && setViewOnly(false)
                }
            }

        } catch (error) {

            new Notice(error, 6000)
        }
    }

    //#region onInit

    if (initialPosition) {

        chessjs.load(initialPosition)

        reducers.updateStartingPosition({newFen: initialPosition})

        reducers.updateCurrentPosition({})
    }

    //#endregion

    return {
        startingPosition: reducers.startingPosition,
        dests: reducers.dests,
        turn: reducers.turn as "white" | "black",
        moves: reducers.moves,
        currentMove: reducers.currentMove,
        playerColor: reducers.playerColor as "white" | "black",
        movesHistory: history,
        currentPosition: reducers.currentPosition,
        viewOnly,
        updateStartingPosition: reducers.updateStartingPosition,
        move,
        updateCurrentMove: reducers.updateCurrentMove,
        undoHalfMove,
        updatePlayerColor: reducers.updatePlayerColor,
        setViewOnly,
        showPosition
    }
}