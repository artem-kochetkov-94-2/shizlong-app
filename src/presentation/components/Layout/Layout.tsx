import { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { useGeo } from "@src/application/hooks/useGeo"
import { useMyBookings } from "@src/application/hooks/useMyBookings";
import { Modals } from "./components/Modals";

export const Layout = ({ children }: PropsWithChildren) => {
    useGeo();
    useMyBookings();

    return (
        <div>
            {children}
            <Outlet />
            <Modals />
        </div>
    )
}
