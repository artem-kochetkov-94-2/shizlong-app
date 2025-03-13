import { Time } from '@src/presentation/components/Time';
import styles from './ChooseStartTime.module.css';
import cn from 'classnames';
import { bookStore } from '@src/application/store/bookStore';
import { observer } from 'mobx-react-lite';

export const ChooseStartTime = observer(() => {
    const { startTime } = bookStore;

    return (
        <div className={cn(
            styles.modulesControlsItem,
            styles.modulesControlsItemActive
        )}>
            <Time value={startTime} onChange={(value) => bookStore.setStartTime(value)} />
            {/* с 10:40 */}
        </div>
    );
});
