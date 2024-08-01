import { Notice } from "obsidian"

import { validateFen } from "chess.js"

import { useEffect, useState } from "react"

import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

interface Props {
    startingPosition: string,
    updateStartingPosition: React.Dispatch<{newFen: string}>
}

export default function FenEditor ({ startingPosition, updateStartingPosition }:Props) {

    const [isOpen, setIsOpen] = useState(false)

    const [value, setValue] = useState(startingPosition)

    useEffect(() => setValue(startingPosition), [startingPosition])

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
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button
                onClick={() => {
                    const isFenValid = validateFen(value)

                    if (!isFenValid.ok) {
                        
                        new Notice(isFenValid.error || "Chess puzzles uncaught error", 6000)

                        return;
                    }

                    updateStartingPosition({newFen: value})

                    setIsOpen(false)
                }}
            >
                <FaCheck/>
            </button>

            <button
                onClick={() => {

                    setIsOpen(false)

                    setValue(startingPosition)
                }}>
                <IoClose/>
            </button>

            <p>ATTENTION! Permanently saving this change resets all moves in puzzle</p>
            </>
        )}
        </>
    )
}