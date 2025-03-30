import { PropsWithChildren, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useGeo } from "@src/application/hooks/useGeo"
import { useMyBookings } from "@src/application/hooks/useMyBookings";
import { Modals } from "./components/Modals";
import { userStore } from "@src/application/store/userStore";
import { verificationStore } from "@src/application/store/verificationStore";
import { observer } from "mobx-react-lite";
import { locationsStore } from "@src/application/store/locationsStore";

export const Layout = observer(({ children }: PropsWithChildren) => {
    useGeo();
    useMyBookings();

    useEffect(() => {
        userStore.init();
    }, [verificationStore.isVerified]);

    useEffect(() => {
        locationsStore.init();
    }, [verificationStore.isVerified]);

    return (
        <div>
            {children}
            <Outlet />
            <Modals />
        </div>
    );
});
