import styles from './ChoosePeriod.module.css';
import { bookStore } from '@src/application/store/bookStore';
import { observer } from 'mobx-react-lite';
import { declensionOfHours } from '@src/application/utils/formatDate';
import { formatPeriodTime } from '@src/application/utils/formatPeriodTime';

export const ChoosePeriod = observer(() => {
    const { hourlyPeriods, allPeriods, activePeriod } = bookStore;

    return (
        <div className={styles.modulesControlsItem}>
            <select
                className={styles.modulesControlsItemInput}
                value={activePeriod}
                onChange={(e) => {
                    if (isFinite(Number(e.target.value))) {
                        bookStore.setPeriod({
                            type: 'hourly',
                            hours: Number(e.target.value),
                        });
                    } else {
                        const [startTime, endTime] = e.target.value.split(',');
                        bookStore.setPeriod({
                            type: 'period',
                            startTime,
                            endTime,
                        });
                    }
                }}
            >
                {[...allPeriods].map(period => (
                    <option key={period.toString()} value={period.toString()}>
                        {formatPeriodTime(period[0])} - {formatPeriodTime(period[1])}
                    </option>
                ))}
                {hourlyPeriods.map(hour => (
                    <option key={hour} value={hour}>
                        {hour} {declensionOfHours(hour)}
                    </option>
                ))}
            </select>
        </div>
    );
});
