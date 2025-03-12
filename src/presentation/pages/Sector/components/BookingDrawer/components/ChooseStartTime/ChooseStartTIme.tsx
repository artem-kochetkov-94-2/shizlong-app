import styles from './ChooseStartTime.module.css';
import cn from 'classnames';

export const ChooseStartTime = () => {
    return (
        <div className={cn(
            styles.modulesControlsItem,
            styles.modulesControlsItemActive
        )}>
            с 10:40
        </div>
    );
};
