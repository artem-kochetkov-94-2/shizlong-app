import styles from './style.module.css';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import classNames from 'classnames';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';

export const ClientActions = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.actions}>
            {/* @todo */}
            <div
                className={classNames(
                    styles.actionItem,
                    styles.notifications,
                    styles.actionItemDisabled
                )}
                // onClick={() => navigate(Routes.Notifications)}
            >
                <IconButton iconName='bell' size='large' withBorder withBlur />
                <span>Уведомления</span>
                {/* <span className={styles.notificationsCount}>1</span> */}
            </div>

            <div className={styles.actionItem} onClick={() => navigate(Routes.Favorites)}>
                <IconButton iconName='favorite-outline' size='large' withBorder withBlur />
                <span>Избранное</span>
            </div>

            {/* @todo */}
            <div
                className={classNames(styles.actionItem, styles.actionItemDisabled)}
                // onClick={() => navigate(Routes.Abonements)}
            >
                <IconButton iconName='abonement' size='large' withBorder withBlur />
                <span className={styles.abonement}>
                    <span>Абонемент</span>
                    <span className={styles.abonementCount}>1</span>
                </span>
            </div>
      </div>
    );
};
