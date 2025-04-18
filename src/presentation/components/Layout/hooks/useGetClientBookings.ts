import { bookingsStore } from "@src/application/store/bookingsStore";
import { profileStore } from "@src/application/store/profileStore";
import { verificationStore } from "@src/application/store/verificationStore";
import { useEffect } from "react";

export const useGetClientBookings = () => {
    useEffect(() => {
        if (!verificationStore.isVerified || !profileStore.profile) return;
        if (profileStore.isCashier) return;

        bookingsStore.getMyBookings();
    }, [verificationStore.isVerified, profileStore.profile]);
}
