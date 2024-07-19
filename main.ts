import { Plugin } from 'obsidian'

import PuzzlePlayer from '@/puzzlePlayer'
import PuzzleMaker from '@/puzzleMaker'

//#region local-types
interface Settings {
	mySetting: string;
}

const DEFAULT_SETTINGS: Settings = {
	mySetting: 'default'
}
//#endregion

export default class MyPlugin extends Plugin {
	settings: Settings

	async onload() {

		await this.loadSettings()

		this.addCommand({
			id: 'chess-puzzle-open-puzzle-player',
			name: 'Open puzzle player',
			callback: () => {
				new PuzzlePlayer(this.app).open()
			}
		})

		this.addCommand({
			id: 'chess-puzzle-create-puzzle',
			name: 'Create puzzle',
			callback: () => {
				new PuzzleMaker(this.app).open()
			}
		})
	}

	onunload() {

	}

//#region settings
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
//#endregion
}
