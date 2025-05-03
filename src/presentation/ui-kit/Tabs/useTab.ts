import { useState } from "react";

export const useTabs = <T extends string>(initialTab: T) => {
    const [currentTab, setCurrentTab] = useState<T>(initialTab);
    return { currentTab, setCurrentTab };
};