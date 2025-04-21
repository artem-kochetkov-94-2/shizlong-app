import { useEffect, useRef, useState } from "react";
import { SheetRef } from "react-modal-sheet";

export const SNAP_POINTS = [1, 483, 150];
export const INITIAL_SNAP_POINT = 1;

export const useDrawer = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [snap, setSnap] = useState(INITIAL_SNAP_POINT);
    const ref = useRef<SheetRef>(null);
    const snapTo = (i: number) => ref.current?.snapTo(i);
    const [paddingBottom, setPaddingBottom] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        // @todo
        setPaddingBottom(ref.current?.y);
    }, [ref.current]);

    useEffect(() => {
        snapTo(INITIAL_SNAP_POINT);
    }, []);
  
    return {
        isOpen,
        setIsOpen,
        snap,
        setSnap,
        ref,
        snapTo,
        paddingBottom,
        setPaddingBottom,
    };
}


