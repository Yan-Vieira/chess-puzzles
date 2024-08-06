declare namespace ChessPuzzles {

	type MoveValue = "undefined"|"correct"|"incorrect"|"alternative"

	type Move = {
		number: number,
		count: number,
		color: "white"|"black",
		from: string,
		to: string,
		san: string,
		fen: string,
		value: MoveValue,
		comment?: string
	}
	
	type Puzzle = {
		id: string,
		name: string,
		fen?: string,
		moves: Move[]
	}

	type UseMovesDispatcher = React.Dispatch<React.ReducerAction<(state: ChessPuzzles.Move[], { actionType, newMove }: {
		actionType: "PUSH" | "POP";
		newMove?: ChessPuzzles.Move;
	}) => ChessPuzzles.Move[]>>
}