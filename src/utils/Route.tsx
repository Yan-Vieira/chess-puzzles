import { useContext } from "react"

import { RouterContext } from "./Router"

interface Props {
    path: string,
    element: JSX.Element
}

export default function Route ({ path, element }: Props) {

    const router = useContext(RouterContext)

    return (
        <>
            {router.path === path && element}
        </>
    )
}