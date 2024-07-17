import type { App } from "obsidian"
import type { Root } from "react-dom/client"

import { Modal } from "obsidian"
import { createRoot } from "react-dom/client"

import View from "./View"

export default class PuzzlePlayer extends Modal {
    root:Root|null
    
    constructor (app:App) {
        super(app)
    }

    onOpen() {
        const containerEl = this.containerEl.getElementsByClassName("modal-content")[0]
        
        this.root = createRoot(containerEl)

        this.root.render(View())
    }

    onClose() {

        this.root?.unmount()
    }
}