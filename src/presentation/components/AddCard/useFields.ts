import { useState, useEffect } from "react";
import { paymentStore } from "@src/application/store/paymentStore";

type DirtyFields = {
    cardNumber: boolean;
    expiry: boolean;
    cvv: boolean;
}
  
type FocusedFields = {
    cardNumber: boolean;
    expiry: boolean;
    cvv: boolean;
}

export const useFields = () => {
    const { cardNumber, expiry, cvv } = paymentStore;

    const [focused, setFocused] = useState<FocusedFields>({
      cardNumber: false,
      expiry: false,
      cvv: false,
    });

    const [dirtyFields, setDirtyFields] = useState<DirtyFields>({
      cardNumber: false,
      expiry: false,
      cvv: false,
    });

    useEffect(() => {
        if (!cardNumber) return;
        
        cardNumber.on('change', () => {
          setDirtyFields((prev) => ({ ...prev, cardNumber: true }));
        })
        
        cardNumber.on('focus', () => {
          setFocused((prev) => ({ ...prev, cardNumber: true }));
        })
        
        cardNumber.on('blur', () => {
          setFocused((prev) => ({ ...prev, cardNumber: false }));
        })
    }, [cardNumber]);
    
    useEffect(() => {
        if (!expiry) return;
        
        expiry.on('change', () => {
          setDirtyFields((prev) => ({ ...prev, expiry: true }));
        })
        
        expiry.on('focus', () => {
          setFocused((prev) => ({ ...prev, expiry: true }));
        })
        
        expiry.on('blur', () => {
          setFocused((prev) => ({ ...prev, expiry: false }));
        })
    }, [expiry]);
    
    useEffect(() => {
        if (!cvv) return;
        
        cvv.on('change', () => {
          setDirtyFields((prev) => ({ ...prev, cvv: true }));
        })
        
        cvv.on('focus', () => {
          setFocused((prev) => ({ ...prev, cvv: true }));
        })
        
        cvv.on('blur', () => {
          setFocused((prev) => ({ ...prev, cvv: false }));
        })
    }, [cvv]);

    return { focused, dirtyFields };
};
