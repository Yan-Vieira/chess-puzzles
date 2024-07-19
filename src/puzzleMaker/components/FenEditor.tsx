import { Notice } from "obsidian"

import { validateFen } from "chess.js"

import { FaCheck } from "react-icons/fa"

interface Props {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    fen: React.MutableRefObject<string>,
    //setPuzzle: React.Dispatch<React.SetStateAction<ChessPuzzles.Puzzle>>,
    updateFen: React.Dispatch<{newFen?: string}>
}

export default function FenEditor ({ isOpen, setIsOpen, fen, updateFen }:Props) {

    return (
        <>
        {!isOpen && (
            <button onClick={() => setIsOpen(true)}>
                edit starting position
            </button>
        )}
        {isOpen && (
            <>
            <input
                type="text"
                defaultValue={fen.current}
                onChange={(e) => fen.current = e.target.value}
            />

            <button
                onClick={() => {
                    const isFenValid = validateFen(fen.current)

                    if (!isFenValid.ok) {
                        
                        new Notice(`Puzzle maker errror - ${isFenValid.error}`, 6000)

                        return
                    }

                    //setPuzzle(prev => ({...prev, fen: fen.current}))

                    updateFen({newFen: fen.current})

                    setIsOpen(false)
                }}
            >
                <FaCheck/>
            </button>
            </>
        )}
        </>
    )
}