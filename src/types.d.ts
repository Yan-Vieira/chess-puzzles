declare namespace ChessPuzzles {

	type MoveValue = "undefined"|"correct"|"incorrect"|"alternative"

	type Move = {
		number: number,
		color: "white"|"black",
		from: string,
		to: string,
		san: string,
		value: MoveValue,
		comment?: string
	}
	
	type Puzzle = {
		id: string,
		name: string,
		fen?: string,
		moves: Move[]
	}
}