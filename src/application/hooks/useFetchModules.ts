import { locationStore } from '@src/application/store/locationStore';
import { useEffect } from "react";
import { bookStore } from '@src/application/store/bookStore';
import { formatDateTime } from '@src/application/utils/formatDate';
import { sectorStore } from '../store/sectorStore';

export const useFetchModules = () => {
    const { location } = locationStore;
    const { sector } = sectorStore;

    // fetch modules
    useEffect(() => {
        if (!sector || !location) return;

        if (!bookStore.formStartTime || bookStore.formHours === 0) {
            return;
        }

        const {
            from_date,
            to_date,
        } = formatDateTime(bookStore.date as Date, bookStore.formHours, bookStore.formStartTime);

        if (!from_date || !to_date) return;

        locationStore.fetchModules(
            sector.location_id,
            from_date,
            to_date,
        );
    }, [sector, location, bookStore.date, bookStore.formHours, bookStore.formStartTime]);
}
