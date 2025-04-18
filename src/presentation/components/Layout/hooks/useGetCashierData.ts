import { cashierStore } from "@src/application/store/cashierStore";
import { profileStore } from "@src/application/store/profileStore";
import { verificationStore } from "@src/application/store/verificationStore";
import { useEffect } from "react";

export const useGetCashierData = () => {
    useEffect(() => {
        if (!profileStore.isCashier) return;

        cashierStore.init();
    }, [verificationStore.isVerified, profileStore.isCashier]);
}
