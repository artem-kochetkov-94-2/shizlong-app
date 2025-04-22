import { PropsWithChildren, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useGeo } from "@src/application/hooks/useGeo"
import { Modals } from "./components/Modals";
import { verificationStore } from "@src/application/store/verificationStore";
import { observer } from "mobx-react-lite";
import { locationsStore } from "@src/application/store/locationsStore";
import { mapStore } from "@src/application/store/mapStore";
import { useUpdateMarkers } from "./hooks/useUpdateMarkers";
import { useGetClientBookings } from "./hooks/useGetClientBookings";
import { useGetCashierData } from "./hooks/useGetCashierData";
// import { profileStore } from "@src/application/store/profileStore";

export const Layout = observer(({ children }: PropsWithChildren) => {
    useGeo();

    useEffect(() => {
        if (!mapStore.map || !mapStore.mapglAPI) return;

        // if (!profileStore.profile || profileStore.isCashier) return;

        locationsStore.init();
    }, [verificationStore.isVerified, mapStore.map, mapStore.mapglAPI]);

    useUpdateMarkers();
    useGetClientBookings();
    useGetCashierData();

    return (
        <div className="layout">
            {children}
            <Outlet />
            <Modals />
        </div>
    );
});
