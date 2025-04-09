import cn from 'classnames';
import { Time } from '@src/presentation/components/Time';
import styles from './ChooseStartTime.module.css';
import { bookStore } from '@src/application/store/bookStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const roundMinutesUpToNearestQuarter = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const roundedMinutes = Math.ceil(minute / 15) * 15;
    const adjustedHour = roundedMinutes === 60 ? hour + 1 : hour;
    const adjustedMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
    return `${adjustedHour.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
};

export const ChooseStartTime = observer(() => {
    const { startTime } = bookStore;

    const handleTimeChange = (value: string) => {
        bookStore.setStartTime(value);
    };

    const handleTimeBlur = () => {
        handleTimeChange(roundMinutesUpToNearestQuarter(startTime));
    };

    useEffect(() => {
        handleTimeChange(roundMinutesUpToNearestQuarter(startTime));
    }, [startTime]);

    console.log('startTime', startTime);

    return (
        <div className={cn(
            styles.modulesControlsItem,
            styles.modulesControlsItemActive
        )}>
            <Time
                value={startTime}
                onChange={handleTimeChange}
                onBlur={handleTimeBlur}
            />
        </div>
    );
});
