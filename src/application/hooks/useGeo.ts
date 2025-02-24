import { useEffect } from "react";
import { geoStore } from "../store/geoStore";

export const useGeo = () => {
    useEffect(() => {
        geoStore.init();
    }, []);
}