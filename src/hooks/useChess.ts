import type { Chess } from "chess.js"

import { Notice } from "obsidian"

import { useEffect, useReducer, useState } from "react"

export default function useChess (chessjs:Chess, initialPosition?:string) {

    const [viewOnly, setViewOnly] = useState(false)

    //#region reducers
 
    const [playerColor, updatePlayerColor] = useReducer(() => {

        if (chessjs.fen().search("w") > 0) return "white"
        
        return "black"
        
    }, "white")

    const [startingPosition, updateStartingPosition] = useReducer((state:string, {newFen}:{newFen:string}) => {

        if (newFen === state) return state
          
            try {

                chessjs.load(newFen)

                return newFen
                
            } catch (error) {

                new Notice(error, 6000)
                
                return chessjs.fen()
            }

    }, chessjs.fen())

    const [currentPosition, updateCurrentPosition] = useReducer((state:string, {fen}:{fen?:string}) => {

        return fen ? fen : chessjs.fen()

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

    const [turn, updateTurn] = useReducer(() => {

        return chessjs.turn() === "w" ? "white" : "black"

    }, "white", () => chessjs.turn() === "w" ? "white" : "black")

    const [moves, updateMoves] = useReducer((state:ChessPuzzles.Move[], {actionType, newMove}:{actionType:"PUSH"|"POP", newMove?:ChessPuzzles.Move}) => {

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

    const [currentMove, updateCurrentMove] = useReducer((state:ChessPuzzles.Move|null, {value, onlyUndo}:{value?: ChessPuzzles.MoveValue, onlyUndo?:boolean}) => {

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

    //#endregion

    useEffect(() => updateCurrentPosition({}), [startingPosition])

    useEffect(() => {

        updateTurn()

        updateDests()

    }, [currentPosition])

    const move = (from:string, to:string) => {

        try {

            chessjs.move({ from, to })

        } catch (error) {

            new Notice(error, 6000)

        } finally {
            
            updateCurrentPosition({})

            updateCurrentMove({})
        }
    }

    const undoHalfMove = () => {

        chessjs.undo()

        moves.pop()

        updateCurrentMove({onlyUndo: true})

        updateCurrentPosition({})
    }

    const showPreviousPosition = (moveNumber:number, color:"white"|"black") => {

        try {

            setViewOnly(true)

            const move = moves.find(value => value.number === moveNumber || value.color === color)

            if (move) {

                updateCurrentPosition({fen: move.fen})
            }

        } catch (error) {

            new Notice(error, 6000)
        }
    }

    const showCurrentPosition = () => {

        const lastMove = moves.last()

        if (lastMove) {

            updateCurrentPosition({fen: lastMove.fen})
        } else new Notice("Error: no moves yet. (useChess > showCurrentPosition)", 6000)

        setViewOnly(false)
    }

    //#region onInit

    if (initialPosition) {

        chessjs.load(initialPosition)

        updateStartingPosition({newFen: initialPosition})

        updateCurrentPosition({})
    }

    //#endregion

    return {
        startingPosition,
        dests,
        turn: turn as "white" | "black",
        moves: moves,
        currentMove,
        playerColor: playerColor as "white" | "black",
        movesHistory: history,
        currentPosition,
        viewOnly,
        updateStartingPosition,
        move,
        updateCurrentMove,
        undoHalfMove,
        updatePlayerColor,
        setViewOnly,
        showPreviousPosition,
        showCurrentPosition
    }
}