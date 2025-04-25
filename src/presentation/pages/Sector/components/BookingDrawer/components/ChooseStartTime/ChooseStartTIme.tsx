import cn from 'classnames';
import { Time } from '@src/presentation/components/Time';
import styles from './ChooseStartTime.module.css';
import { bookStore } from '@src/application/store/bookStore';
import { observer } from 'mobx-react-lite';
import { roundMinutesUpToNearestQuarter } from '@src/application/utils/roundMinutesUpToNearestQuarter';
import { formatPeriodTime } from '@src/application/utils/formatPeriodTime';

export const ChooseStartTime = observer(() => {
    const { formStartTime, moduleSchemePeriod } = bookStore;

    const handleTimeChange = (value: string) => {
        bookStore.setStartTime((roundMinutesUpToNearestQuarter(value)));
    };

    const handleTimeBlur = () => {
        handleTimeChange(roundMinutesUpToNearestQuarter(formStartTime));
    };

    return (
        <div className={cn(
            styles.modulesControlsItem,
            { [styles.modulesControlsItemActive]: moduleSchemePeriod?.type === 'period' }
        )}>
            {moduleSchemePeriod?.type === 'hourly' && (
                <Time
                    value={formStartTime}
                    onChange={handleTimeChange}
                    onBlur={handleTimeBlur}
                />
            )}
            {moduleSchemePeriod?.type === 'period' && (
                <div>{formatPeriodTime(moduleSchemePeriod.startTime)} - {formatPeriodTime(moduleSchemePeriod.endTime)}</div>
            )}
        </div>
    );
});
