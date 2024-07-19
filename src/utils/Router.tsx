import { useState, createContext } from "react"

type RouterContext = {
    path: string,
    setPath: (value:string) => void,
}

export const RouterContext = createContext<RouterContext>({
    path: "",
    setPath: (value) => {},
})

export default function Router ({children}:{children: React.ReactNode}) {

    const [path, setPath] = useState("/")

    return (
        <RouterContext.Provider value={{path, setPath: (value) => setPath(value)}}>
            {children}
        </RouterContext.Provider>
    )
}