import { PropsWithChildren, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useGeo } from "@src/application/hooks/useGeo"
import { Modals } from "./components/Modals";
import { userStore } from "@src/application/store/userStore";
import { verificationStore } from "@src/application/store/verificationStore";
import { observer } from "mobx-react-lite";
import { locationsStore } from "@src/application/store/locationsStore";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { mapStore } from "@src/application/store/mapStore";

export const Layout = observer(({ children }: PropsWithChildren) => {
    useGeo();

    useEffect(() => {
        userStore.init();
    }, [verificationStore.isVerified]);

    useEffect(() => {
        if (!mapStore.map || !mapStore.mapglAPI) return;

        locationsStore.init();
    }, [verificationStore.isVerified, mapStore.map, mapStore.mapglAPI]);

    useEffect(() => {
        if (!mapStore.map || !mapStore.mapglAPI) return;

        mapStore.setMarkers(locationsStore.locations);
    }, [locationsStore.locations, mapStore.map, mapStore.mapglAPI]);

    useEffect(() => {
        if (!verificationStore.isVerified) return;
        bookingsStore.getMyBookings();
    }, [verificationStore.isVerified]);

    return (
        <div className="layout">
            {children}
            <Outlet />
            <Modals />
        </div>
    );
});
