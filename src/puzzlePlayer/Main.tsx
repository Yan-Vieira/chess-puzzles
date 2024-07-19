import type { Vault } from "obsidian"

import View from "./View"

interface Props {
    vault: Vault
}

export default function Main ({ vault }:Props) {

    return <View vault={vault}/>
}