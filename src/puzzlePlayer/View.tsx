import type { Vault } from "obsidian"

import { useEffect, useState } from "react"
import { Router, Route } from "@/utils"

import PuzzlesList from "./PuzzlesList"
import PlayPuzzle from "./PlayPuzzle"

interface Props {
    vault: Vault
}

const getPuzzles = async (vault:Vault) => {
    
    try {

        const puzzlesFile = vault.getFileByPath(`puzzles.json`)

        if (!puzzlesFile) {
            console.warn("Puzzles file was not found")
    
            return []
        }
        
        const content = await vault.cachedRead(puzzlesFile)

        console.log(content)
    
        return JSON.parse(content) as Puzzle[]
        
    } catch (error) {
        
        console.warn(error)

        return []
    }
}

export default function View ({ vault }:Props) {

    const [puzzles, setPuzzles] = useState<Puzzle[]>([])

    const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle|null>(null)

    useEffect(() => {

        getPuzzles(vault).then(value => setPuzzles(value))
        
    }, [])

    return (
        <Router>
                <Route
                    path="/"
                    element={<PuzzlesList puzzles={puzzles} setPuzzle={setCurrentPuzzle} />}
                />
                <Route
                    path="/play-puzzle"
                    element={<PlayPuzzle puzzle={currentPuzzle} />}
                />
        </Router>
    )
}