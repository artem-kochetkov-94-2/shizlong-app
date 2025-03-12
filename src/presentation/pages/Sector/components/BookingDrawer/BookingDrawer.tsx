import { IconButton } from "@src/presentation/ui-kit/IconButton";
import styles from './BookingDrawer.module.css';
import { RoundedTabs } from "@src/presentation/ui-kit/RoundedTabs"; 
import {
    bookStore,
    sectorTabs,
    SectorTab,
    bookingTabs
} from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { sectorStore } from "@src/application/store/sectorStore";
import { SchemeMode } from "../SchemeMode/SchemeMode";
import classNames from "classnames";
import { Tabs } from "@src/presentation/ui-kit/Tabs";
import { Sheet, SheetRef } from 'react-modal-sheet';
import { DRAG_VELOCITY_THRESHOLD } from "@src/const";
import { useEffect, useRef, useState } from "react";
import { ModulesSelect } from "./components/ModulesSelect";
import { ChooseDate } from "./components/ChooseDate";
import { ChooseTime } from "./components/ChooseTime";
import { ChooseStartTime } from "./components/ChooseStartTime";
// import { TimeSlider } from "@src/presentation/components/TimeSlider";

const SNAP_POINTS = [758, 309, 79];
const INITIAL_SNAP_POINT = 1;

export const BookingDrawer = observer(() => {
    const { activeTab } = bookStore;
    const { activeBookingsTab } = bookStore;
    const { activeScheme, schemes } = sectorStore;

    const [isOpen, setIsOpen] = useState(true);

    const ref = useRef<SheetRef>(null);
    const snapTo = (i: number) => ref.current?.snapTo(i);

    useEffect(() => {
        setTimeout(() => {
            snapTo(1);
        }, 1000);
    }, []);

    return (
        <Sheet
            ref={ref}
            isOpen={isOpen}
            onClose={() => setIsOpen(true)}
            detent="content-height"
            snapPoints={SNAP_POINTS}
            initialSnap={INITIAL_SNAP_POINT}
            dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
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
                                    <ModulesSelect />
                                </div>

                                <div className={styles.modulesControls}>
                                    <ChooseStartTime />
                                    <ChooseTime />
                                    <ChooseDate />
                                </div>
                            </div>
                            {/* {activeScheme && (
                                <TimeSlider
                                    timeStart={activeScheme.time_start}
                                    timeEnd={activeScheme.time_end}
                                />
                            )} */}
                        </>
                    )}
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
});
