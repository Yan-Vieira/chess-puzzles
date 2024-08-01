import type { Vault } from "obsidian"
import type { Chess } from "chess.js"

import useChess from "@/hooks/useChess"

import Chessground from "@react-chess/chessground"
import { FenEditor, MoveEditor, PlayerColor, MovesHistory } from "./components"
import { IoIosUndo } from "react-icons/io"

interface Props {
    vault: Vault,
    chessjsInstance: Chess
}

export default function View ({ vault, chessjsInstance }:Props) {

    const chess = useChess(chessjsInstance)

    return (
        <main>

            <Chessground
                width={320}
                height={320}
                config={{
                    coordinates: false,
                    fen: chess.currentPosition,
                    turnColor: chess.turn,
                    orientation: chess.playerColor,
                    viewOnly: chess.viewOnly,
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

            <MovesHistory
                movesNumber={chess.currentMove?.number || 0}
                moves={chess.moves}
                showPreviousPosition={chess.showPreviousPosition}
                showCurrentPosition={chess.showCurrentPosition}
            />

            <FenEditor
                startingPosition={chess.startingPosition}
                updateStartingPosition={chess.updateStartingPosition}
            />

            <button onClick={() => chess.undoHalfMove()}>
                <IoIosUndo/>
            </button>

            <MoveEditor
                move={chess.currentMove}
                updateMove={chess.updateCurrentMove}
            />
        </main>
    )
}