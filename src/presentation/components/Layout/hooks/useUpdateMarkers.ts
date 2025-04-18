import { locationsStore } from "@src/application/store/locationsStore";
import { mapStore } from "@src/application/store/mapStore";
import { useEffect } from "react";

export const useUpdateMarkers = () => {
    useEffect(() => {
        if (!mapStore.map || !mapStore.mapglAPI) return;
        mapStore.setMarkers(locationsStore.locations, locationsStore.favoriteLocations);
    }, [locationsStore.locations, locationsStore.favoriteLocations, mapStore.map, mapStore.mapglAPI]);
}