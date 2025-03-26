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
    formatTimeRange,
    getTimeRangeDurationInHoursAndMinutes,
    calculateTimeDifferenceInHours,
} from "@src/application/utils/formatDate";
import { useState } from "react";

interface TimeProps {
    isOpen: boolean,
    onClose: () => void,
    startTime: string,
    endTime: string
}

export const Time = observer(({
    isOpen,
    onClose,
    startTime,
    endTime,
}: TimeProps) => {
    const { selectedModule, formattedDate, date } = bookStore;
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    if (!selectedModule) return null;

    const handleSubmit = () => {
        bookStore.setStartTime(start);
        bookStore.setHours(calculateTimeDifferenceInHours(start, end));
        onClose();
    }

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
                                <div className={styles.time}>
                                    <TimeComponent
                                        value={start}
                                        onChange={(value) => setStart(value)}
                                    />
                                    <TimeComponent
                                        value={end}
                                        onChange={(value) => setEnd(value)}
                                    />
                                </div>
                                <div className={styles.reservations}>
                                    <div className={styles.reservationsTitle}>
                                        <Icon name="time" size="extra-small"/>
                                        <span>Доступность модуля</span>
                                        <span>{formattedDate}</span>
                                    </div>

                                    {selectedModule.slots.map((s) => {
                                        const duration = getTimeRangeDurationInHoursAndMinutes(s.start_hour, s.end_hour);

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
                                                <span>{formatTimeRange(s.start_hour, s.end_hour)}</span>
                                                <span>{duration.hours} ч. {duration.minutes ? `${duration.minutes} мин.` : ''}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.reservationsFooter}>
                                    По местному времени
                                </div>
                            </Card>
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
