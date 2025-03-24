import { useEffect } from "react";
import { bookingsStore } from "@src/application/store/bookingsStore";

export const useMyBookings = () => {
    useEffect(() => {
        bookingsStore.getMyBookings();
    }, []);
};
