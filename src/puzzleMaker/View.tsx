import type { Vault } from "obsidian"
import type { Chess } from "chess.js"

import { useState, useRef } from "react"
import useChess from "@/hooks/useChess"

import Chessground from "@react-chess/chessground"
import { FenEditor, MoveEditor } from "./components"

interface Props {
    vault: Vault,
    chessjsInstance: Chess
}

export default function View ({ vault, chessjsInstance }:Props) {

    const chess = useChess(chessjsInstance)

    const [isFenEditorOpen, setIsFenEditorOpen] = useState(false)
    const FenInputRef = useRef(chess.fen)

    return (
        <main>
            <Chessground
                width={320}
                height={320}
                config={{
                    coordinates: false,
                    fen: chess.fen,
                    turnColor: chess.turn,
                    movable: {
                        free: false,
                        //@ts-ignore
                        dests: chess.dests
                    },
                    events: {
                        move: (from, to) => {

                            chess.move(from, to)


                        }
                    }
                }}
            />

            <FenEditor
                isOpen={isFenEditorOpen}
                setIsOpen={setIsFenEditorOpen}
                fen={FenInputRef}
                //setPuzzle={setPuzzle}
                updateFen={chess.updateFen}
            />

            <MoveEditor
                move={chess.currentMove}
                updateMove={chess.updateCurrentMove}
            />
        </main>
    )
}