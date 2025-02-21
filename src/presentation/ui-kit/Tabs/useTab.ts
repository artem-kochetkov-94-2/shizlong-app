import { useState } from "react";

export const useTabs = (initialTab: string) => {
    const [currentTab, setCurrentTab] = useState(initialTab);
    return { currentTab, setCurrentTab };
};