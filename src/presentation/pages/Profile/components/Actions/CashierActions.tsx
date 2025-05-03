import styles from './style.module.css';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { eventService } from '@src/application/services/EventService/EventService';
import { EVENT } from '@src/application/services/EventService/EventList';

export const CashierActions = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.actions}>
            <div
                className={classNames(
                    styles.actionItem,
                    styles.notifications,
                    styles.actionItemDisabled
                )}
            >
                <IconButton
                    iconName='bell'
                    size='large'
                    withBorder
                    withBlur
                />
                <span>Уведомления</span>
                {/* <span className={styles.notificationsCount}>1</span> */}
            </div>

            <div className={styles.actionItem} onClick={() => navigate(Routes.ProfileBookings)}>
                <IconButton
                    iconName='check6'
                    size='large'
                    withBorder
                    withBlur
                />
                <span>Брони</span>
            </div>

            <div className={styles.actionItem}>
                <IconButton
                    iconName='qr-code'
                    size='large'
                    withBorder
                    withBlur
                    onClick={() => {
                        eventService.emit(EVENT.MODAL_SCAN, { isActive: true });
                    }}
                />
                <span>QR-сканер</span>
            </div>
      </div>
    );
};
