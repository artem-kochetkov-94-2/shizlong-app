import styles from './TimeSlider.module.css';
import React, { useMemo } from 'react';

export const TimeSlider = ({ timeStart, timeEnd }: { timeStart: string; timeEnd: string }) => {
    const hours = useMemo(() => {
        const [startHour, startMinute, startSecond] = timeStart.split(':').map(Number);
        const [endHour, endMinute, endSecond] = timeEnd.split(':').map(Number);

        const start = new Date();
        start.setHours(startHour, startMinute, startSecond, 0);

        const end = new Date();
        end.setHours(endHour, endMinute, endSecond, 0);

        const hours: string[] = [];
        while (start < end) {
            hours.push(start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
            start.setHours(start.getHours() + 1);
        }
        return hours;
    }, [timeStart, timeEnd]);

    return (
        <div className={styles.timeSlider}>
            {hours.map((hour) => (
                <React.Fragment key={hour}>
                    <div className={styles.hour}>
                        <span>{hour}</span>
                    </div>
                    <div className={styles.hourPart} />
                    <div className={styles.hourPart} />
                    <div className={styles.halfHour} />
                    <div className={styles.hourPart} />
                    <div className={styles.hourPart} />
                </React.Fragment>
            ))}
        </div>
    );
};
