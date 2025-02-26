import { Icon } from "@src/presentation/ui-kit/Icon";
import styles from './Left.module.css';

export const Left = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <Icon name="palm" size="extra-small" />
                <div className={styles.rowTitle}>
                    Осталось <span>5 посещений</span> до <span>29 августа</span>
                </div>
            </div>
            <div className={styles.left}><div style={{ width: '75%'}} /></div>
        </div>
    );
};
