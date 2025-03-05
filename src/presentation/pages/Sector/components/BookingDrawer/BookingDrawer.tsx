import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import styles from './BookingDrawer.module.css';
import { RoundedTabs } from "@src/presentation/ui-kit/RoundedTabs"; 
import { TimeSlider } from "@src/presentation/components/TimeSlider";
import {
    modulesSelectOptions,
    bookStore,
    ModulesSelectValue,
    sectorTabs,
    SectorTab,
    bookingTabs
} from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { sectorStore } from "@src/application/store/sectorStore";
import { SchemeMode } from "../SchemeMode/SchemeMode";
import classNames from "classnames";
import { Tabs } from "@src/presentation/ui-kit/Tabs";

export const BookingDrawer = observer(() => {
    const { activeTab } = bookStore;
    const { modulesSelectValue, activeBookingsTab } = bookStore;
    const { activeScheme, schemes } = sectorStore;

    return (
        <DrawerV2 overflowHeight={79} overlay={false}>
            <div className={styles.controls}>
                <div className={styles.controlsItem}>
                    <IconButton iconName="tap" size="extra-small" />
                    <span>Займите любой доступный модуль</span>
                </div>
                {activeScheme && schemes.length > 1 && (
                    <div className={classNames(styles.controlsItem, styles.scheme)}>
                        <SchemeMode />
                    </div>
                )}
            </div>

            <div className={styles.navigation}>
                <IconButton iconName="qr-code" size="large" />
                <RoundedTabs
                    activeTab={activeTab}
                    tabs={sectorTabs}
                    onTabChange={(tab) => bookStore.setActiveTab(tab as SectorTab)}
                />
                <IconButton iconName="profile" size="large" />
            </div>

            {activeTab === 'bookings' && (
                <div className={styles.bookings}>
                    <div className={styles.bookingsEmpty}>
                        На секторе #2  пляжа Ривьера на сегодня у вас броней нет
                    </div>

                    <Tabs
                        tabs={bookingTabs}
                        activeTab={activeBookingsTab}
                        onTabChange={(tab) => bookStore.setActiveBookingsTab(tab)}
                    />
                </div>
            )}

            {activeTab === 'order' && (
                <>
                    <div className={styles.content}>
                        <div className={styles.divider}></div>

                        <div className={styles.modulesRow}>
                            <div className={styles.modulesRowTitle}>Заказать</div>
                            <select
                                className={styles.modulesSelect}
                                value={modulesSelectValue}
                                onChange={(e) => bookStore.setModulesSelectValue(e.target.value as ModulesSelectValue)}
                            >
                                {modulesSelectOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.modulesControls}>
                            <div className={classNames(
                                styles.modulesControlsItem,
                                styles.modulesControlsItemActive
                            )}>
                                с 10:40
                            </div>
                            <div className={styles.modulesControlsItem}>
                                на 2 часа
                            </div>
                            <div className={styles.modulesControlsItem}>
                                сегодня
                            </div>
                        </div>
                    </div>
                    {activeScheme && (
                        <TimeSlider
                            timeStart={activeScheme.time_start}
                            timeEnd={activeScheme.time_end}
                        />
                    )}
                </>
            )}
        </DrawerV2>
    );
});
