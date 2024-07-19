import type { Vault } from "obsidian"
import type { Chess } from "chess.js"

import View from "./View"

interface Props {
    vault: Vault,
    chessjsInstance: Chess
}

export default function Main ({ vault, chessjsInstance }:Props) {

    return <View vault={vault} chessjsInstance={chessjsInstance}/>
}