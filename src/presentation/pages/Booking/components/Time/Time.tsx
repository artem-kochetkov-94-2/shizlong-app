import { IconButton } from "@src/presentation/ui-kit/IconButton"
import styles from "./Time.module.css";
import { Button } from "@src/presentation/ui-kit/Button";
import { Card } from "@src/presentation/ui-kit/Card";
import cn from "classnames";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Time as TimeComponent } from "@src/presentation/components/Time";
import { bookStore } from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { Sheet } from 'react-modal-sheet';
import {
    formatFullDate,
    formatShortDate,
    formatTimeRange,
    getTimeRangeDurationInHoursAndMinutes,
    calculateTimeDifferenceInHours,
} from "@src/application/utils/formatDate";
import { useState } from "react";
// import { useMemo, useState } from "react";
// import { ModuleScheme } from "@src/infrastructure/Locations/types";

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

const formatPeriodTime = (time: string) => {
    return time.split(':').slice(0, 2).join(':');
};

export const Time = observer(({
    isOpen,
    onClose,
    startTime,
    endTime,
}: TimeProps) => {
    const {
        bookedModules,
        formattedDate,
        date,
        allPeriods,
        moduleSchemePeriod,
    } = bookStore;
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    const [activePeriod, setActivePeriod] = useState<[string, string] | null>(bookStore.moduleSchemePeriod);

    if (!bookedModules.length) return null;

    const handleBlur = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, isStart: boolean) => {
        const roundedTime = roundMinutesToNearestQuarter(value);
        setter(roundedTime);

        if (isStart) {
            const differenceInMinutes = getDifferenceInMinutes(roundedTime, end);
            if (differenceInMinutes % 60 !== 0) {
                const additionalMinutes = differenceInMinutes % 60 < 30 ? -(differenceInMinutes % 60) : 60 - (differenceInMinutes % 60);
                const [endHour, endMinute] = end.split(':').map(Number);
                const newEndMinute = endMinute + additionalMinutes;
                const newEndHour = endHour + Math.floor(newEndMinute / 60);
                const adjustedEndMinute = newEndMinute % 60;
                setEnd(`${newEndHour}:${adjustedEndMinute < 10 ? '0' : ''}${adjustedEndMinute}`);
            }
        }
    }

    const handleHourlySubmit = () => {
        bookStore.setStartTime(start);
        bookStore.setFormHours(calculateTimeDifferenceInHours(start, end));
        onClose();
    }

    const handlePeriodSubmit = () => {
        if (!activePeriod) return;

        const startTime = activePeriod[0].split(':').slice(0, 2).join(':');
        const endTime = activePeriod[1].split(':').slice(0, 2).join(':');
        bookStore.setStartTime(startTime);
        bookStore.setEndTime(endTime);
        bookStore.setPeriod([activePeriod[0], activePeriod[1]]);
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
                                {moduleSchemePeriod ? (
                                    <div className={styles.periods}>
                                        {allPeriods.map((period) => {
                                            // const isDisabled = !availablePeriodToBook.find((p) => p.id === period.id);

                                            return (
                                                <div
                                                    key={`${period[0]}-${period[1]}`}
                                                    className={cn(styles.period, {
                                                        [styles.periodActive]: activePeriod?.[0] === period[0] && activePeriod?.[1] === period[1],
                                                        // [styles.periodDisabled]: isDisabled,
                                                    })}
                                                    onClick={() => {
                                                        // if (isDisabled) return;
                                                        setActivePeriod(period);
                                                    }}
                                                >
                                                    <div className={styles.periodTime}>
                                                        {formatPeriodTime(period[0])} - {formatPeriodTime(period[1])}
                                                    </div>
                                                    <div className={styles.periodName}>{bookStore.getNamePeriod(period)}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className={styles.time}>
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
                                    </div>
                                )}
                                
                                {bookedModules.length === 1 && (
                                    <div className={styles.reservations}>
                                        <div className={styles.reservationsTitle}>
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
                                        })}
                                    </div>
                                )}

                                <div className={styles.reservationsFooter}>
                                    По местному времени
                                </div>
                            </Card>

                            {/* {error && <div className={styles.error}>{error}</div>} */}
                        </div>

                        <div className={styles.footer}>
                            <Button
                                size="medium"
                                variant="yellow"
                                onClick={moduleSchemePeriod ? handlePeriodSubmit : handleHourlySubmit}
                            >
                                Выбрать
                            </Button>
                            <Button size="medium" variant="tertiary" onClick={onClose}>Отмена</Button>
                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
});
