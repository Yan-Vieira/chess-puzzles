import { useReducer } from "react"

export default function useHalfMovesCounter () {

    return useReducer((state:number) => state + 1, 0)
}