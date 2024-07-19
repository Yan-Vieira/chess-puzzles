import type { App } from "obsidian"
import type { Root } from "react-dom/client"

import { Modal } from "obsidian"
import { createRoot } from "react-dom/client"

import { Chess } from "chess.js"

import Main from "./Main"

export default class PuzzlePlayer extends Modal {
    root:Root|null

    constructor (app:App) {
        super(app)

        this.app = app
    }

    onOpen() {
        const containerEl = this.containerEl.getElementsByClassName("modal-content")[0]
        const chessjsInstance = new Chess()
        
        this.root = createRoot(containerEl)

        this.root.render(Main({ vault: this.app.vault, chessjsInstance }))
    }

    onClose() {

        this.root?.unmount()
    }
}