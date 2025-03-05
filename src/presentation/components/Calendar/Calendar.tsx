import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2"
import { IconButton } from "@src/presentation/ui-kit/IconButton"
import styles from "./Calendar.module.css";
import { Button } from "@src/presentation/ui-kit/Button";
import { useState } from "react";
import { Calendar as CalendarComponent } from "react-calendar";
import "./calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <DrawerV2 open={isOpen} onChange={onClose}>
            <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                    <div className={styles.calendarHeaderLeft}>
                        <div className={styles.calendarHeaderTitle}>Выберите день</div>
                        <div className={styles.calendarHeaderDate}>24 августа 2025</div>
                    </div>
                    <IconButton
                        iconName="cross"
                        size="large"
                        shape="rounded"
                        className={styles.calendarHeaderClose}
                        color="gray"
                        withShadow={false}
                    />
                </div>

                <div className={styles.calendarBody}>
                    <CalendarComponent
                        onChange={onChange}
                        value={value}
                        prevLabel={
                            <IconButton
                                iconName="arrow-left"
                                size="large"
                                shape="rounded"
                                color="white"
                                className={styles.calendarHeaderPrev}
                            />
                        }
                        nextLabel={
                            <IconButton
                                iconName="arrow-right"
                                size="large"
                                shape="rounded"
                                color="white"
                                className={styles.calendarHeaderNext}
                            />
                        }
                        prev2Label={null}
                        next2Label={null}
                        minDate={new Date()}
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                    />
                </div>

                <div className={styles.calendarFooter}>
                    <Button size="medium" variant="yellow">Выбрать</Button>
                    <Button size="medium" variant="tertiary" onClick={onClose}>Отмена</Button>
                </div>
            </div>
        </DrawerV2>
    );
}
