import { useState } from "react"

import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

interface Props {
    playerColor: "white" | "black",
    updatePlayerColor: React.Dispatch<{newColor: "white"|"black"}>
}

export default function PlayerColor ({ playerColor, updatePlayerColor }:Props) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {!isOpen && (
                <button onClick={() => setIsOpen(true)}>Change player color</button>
            )}
            {isOpen && (
                <>
                <p>ATTENTION: Permanently saving this change resets all moves in puzzle! Are you sure?</p>

                <button
                    onClick={() => {

                        const newColor = playerColor === "white" ? "black" : "white"

                        updatePlayerColor({newColor: newColor})

                        setIsOpen(false)
                    }}
                >
                    <FaCheck/>
                </button>

                <button onClick={() => setIsOpen(false)}>
                    <IoClose/>
                </button>
                </>
            )}
        </>
    )
}