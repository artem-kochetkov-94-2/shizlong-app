import { locationsStore } from "@src/application/store/locationsStore";
import { locationStore } from "@src/application/store/locationStore";
import { mapStore } from "@src/application/store/mapStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const LocationPlan = observer(() => {
    const { locationId } = locationStore;
    const { locations, favoriteLocations } = locationsStore;

    useEffect(() => {
        if (!mapStore.map || !mapStore.mapglAPI) return;
        if (locations.length === 0) return;

        locationStore.choosePlace();
        mapStore.drawMarkers(locations.filter(l => l.id !== locationId), favoriteLocations);

        return () => {
            mapStore.clearPlan();
            mapStore.drawMarkers(locations, favoriteLocations);
        }
    }, [locationId, locations, favoriteLocations, mapStore.map, mapStore.mapglAPI]);

    return null;
});
