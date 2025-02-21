import { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            {children}
            <Outlet />
        </div>
    )
}
