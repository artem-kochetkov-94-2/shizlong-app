import { IconButton } from "@src/presentation/ui-kit/IconButton"
import styles from "./Time.module.css";
import { Button } from "@src/presentation/ui-kit/Button";
import { Card } from "@src/presentation/ui-kit/Card";
import cn from "classnames";
import { Icon } from "@src/presentation/ui-kit/Icon";
// import { Time as TimeComponent } from "@src/presentation/components/Time";
import { bookStore } from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { Sheet } from 'react-modal-sheet';
import {
    formatFullDate,
    formatShortDate,
    formatTimeRange,
    getTimeRangeDurationInHoursAndMinutes,
    // calculateTimeDifferenceInHours,
} from "@src/application/utils/formatDate";
import { useMemo, useState } from "react";
import { ModuleScheme } from "@src/infrastructure/Locations/types";

interface TimeProps {
    isOpen: boolean,
    onClose: () => void,
    startTime: string,
    endTime: string
}

const getDifferenceInMinutes = (start: string, end: string) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    return (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
}

const roundMinutesToNearestQuarter = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const roundedMinutes = Math.round(minute / 15) * 15;
    const adjustedHour = roundedMinutes === 60 ? hour + 1 : hour;
    const adjustedMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
    return `${adjustedHour.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
};

export const Time = observer(({
    isOpen,
    onClose,
    // startTime,
    // endTime,
}: TimeProps) => {
    const { bookedModules, formattedDate, date, periodsToBook, moduleSchemeId } = bookStore;
    // const [start, setStart] = useState(startTime);
    // const [end, setEnd] = useState(endTime);
    const [activePeriodId, setActivePeriodId] = useState<number | null>(moduleSchemeId);

    if (!bookedModules.length) return null;

    // const handleBlur = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, isStart: boolean) => {
    //     const roundedTime = roundMinutesToNearestQuarter(value);
    //     setter(roundedTime);

    //     if (isStart) {
    //         const differenceInMinutes = getDifferenceInMinutes(roundedTime, end);
    //         if (differenceInMinutes % 60 !== 0) {
    //             const additionalMinutes = differenceInMinutes % 60 < 30 ? -(differenceInMinutes % 60) : 60 - (differenceInMinutes % 60);
    //             const [endHour, endMinute] = end.split(':').map(Number);
    //             const newEndMinute = endMinute + additionalMinutes;
    //             const newEndHour = endHour + Math.floor(newEndMinute / 60);
    //             const adjustedEndMinute = newEndMinute % 60;
    //             setEnd(`${newEndHour}:${adjustedEndMinute < 10 ? '0' : ''}${adjustedEndMinute}`);
    //         }
    //     }
    // }

    console.log('bookedModules', JSON.parse(JSON.stringify(bookedModules)));
    console.log('moduleSchemeId', moduleSchemeId);

    console.log('----------------------------------bookStore', bookStore.formStartTime);
    console.log('----------------------------------bookStore', bookStore.endTime);

    // const _handleSubmit = () => {
    //     bookStore.setStartTime(start);
    //     bookStore.setHours(calculateTimeDifferenceInHours(start, end));
    //     onClose();
    // }

    const handleSubmit = () => {
        const period = periodsToBook.find((p) => p.id === activePeriodId);
        if (!period) return;

        const startTime = period.start_time.split(':').slice(0, 2).join(':');
        const endTime = period.end_time.split(':').slice(0, 2).join(':');
        bookStore.setStartTime(startTime);
        bookStore.setEndTime(endTime);

        bookStore.setModuleSchemeId(period.id);
        onClose();
    }

    // const error = useMemo(() => {
    //     const differenceInMinutes = getDifferenceInMinutes(start, end);
    //     if (differenceInMinutes <= 0) {
    //         return 'Время окончания должно быть позже времени начала.';
    //     }
    //     if (differenceInMinutes % 60 !== 0) {
    //         return 'Разница между временем начала и окончания должна быть кратна 1 часу.';
    //     }

    //     // @todo - время начала не может быть больше текущего времени
    //     return null;
    // }, [start, end]);

    console.log('periodsToBook', JSON.parse(JSON.stringify(periodsToBook)));

    return (
        <Sheet
            isOpen={isOpen}
            onClose={() => onClose()}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className={styles.calendar}>
                        <div className={styles.header}>
                            <div className={styles.headerTitle}>Выберите время отдыха</div>
                            <div className={styles.headerDate}>{formatFullDate(date as Date)}</div>

                            <IconButton
                                iconName="cross"
                                size="large"
                                shape="rounded"
                                className={styles.headerClose}
                                color="gray"
                                withShadow={false}
                                onClick={onClose}
                            />
                        </div>

                        <div className={styles.body}>
                            <Card>
                                <div className={styles.periods}>
                                    {periodsToBook.map((period) => (
                                        <div
                                            key={period.id}
                                            className={cn(styles.period, {
                                                [styles.periodActive]: period.id === activePeriodId,
                                            })}
                                            onClick={() => setActivePeriodId(period.id)}
                                        >
                                            <div className={styles.periodTime}>{period.start_time} - {period.end_time}</div>
                                            <div className={styles.periodName}>{period.name}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* <div className={styles.time}>
                                    <TimeComponent
                                        value={start}
                                        onChange={(value) => setStart(value)}
                                        onBlur={() => handleBlur(setStart, start, true)}
                                    />
                                    <TimeComponent
                                        value={end}
                                        onChange={(value) => setEnd(value)}
                                        onBlur={() => handleBlur(setEnd, end, false)}
                                    />
                                </div> */}
                                <div className={styles.reservations}>
                                    {/* <div className={styles.reservationsTitle}>
                                        <Icon name="time" size="extra-small"/>
                                        <span>Доступность модуля</span>
                                        <span>{formattedDate}</span>
                                    </div>

                                    {bookedModules[0]?.slots.map((s) => {
                                        const duration = getTimeRangeDurationInHoursAndMinutes(s.from, s.to);

                                        return (
                                            <div
                                                className={
                                                    cn(
                                                        styles.reservation,
                                                        {
                                                            [styles.free]: !s.is_busy,
                                                            [styles.booked]: s.is_busy,
                                                        }
                                                    )
                                                }
                                            >
                                                <span>{s.is_busy ? 'Занят' : 'Свободен'}</span>
                                                <span>{formatTimeRange(s.from, s.to)}</span>
                                                <span>{duration.hours} ч. {duration.minutes ? `${duration.minutes} мин.` : ''}</span>
                                            </div>
                                        );
                                    })} */}
                                </div>
                                <div className={styles.reservationsFooter}>
                                    По местному времени
                                </div>
                            </Card>

                            {/* {error && <div className={styles.error}>{error}</div>} */}
                        </div>

                        <div className={styles.footer}>
                            <Button size="medium" variant="yellow" onClick={handleSubmit}>Выбрать</Button>
                            <Button size="medium" variant="tertiary" onClick={onClose}>Отмена</Button>
                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
});
