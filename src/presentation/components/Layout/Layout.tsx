import { useGeo } from "@src/application/hooks/useGeo"
import { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"

export const Layout = ({ children }: PropsWithChildren) => {
    useGeo();

    return (
        <div>
            {children}
            <Outlet />
        </div>
    )
}
