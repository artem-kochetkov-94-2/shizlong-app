import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import styles from './BookingDrawer.module.css';
import { RoundedTabs, Tab } from "@src/presentation/ui-kit/RoundedTabs"; 
import { useState } from "react";

export const locationTabs: Tab[] = [
    {
      value: 'bookings',
      label: 'Мои брони',
    },
    {
      value: 'order',
      label: 'Заказать',
    },
];

export const BookingDrawer = () => {
    const [activeTab, setActiveTab] = useState('bookings');

    return (
        <DrawerV2 overflowHeight={79}>
            <div className={styles.navigation}>
                <IconButton iconName="qr-code" size="large" />
                <RoundedTabs
                    activeTab={activeTab}
                    tabs={locationTabs}
                    onTabChange={setActiveTab}
                />
                <IconButton iconName="profile" size="large" />
            </div>

            <div className={styles.content}>
                <div className={styles.divider}></div>

                <div className={styles.modulesRow}>
                    <div className={styles.modulesRowTitle}>Заказать</div>
                    <div>один модуль</div>
                </div>
            </div>
        </DrawerV2>
    );
};
