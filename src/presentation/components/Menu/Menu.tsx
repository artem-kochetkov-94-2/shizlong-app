import { useLocation } from 'react-router-dom';
import { Routes } from '@src/routes';
import { Icon } from '@src/presentation/ui-kit/Icon';
import umbrella from './assets/umbrella.svg';
import styles from './Menu.module.css';
import { eventService } from '@src/application/services/EventService/EventService';
import { EVENT } from '@src/application/services/EventService/EventList';

export const Menu = () => {
    const location = useLocation();
    const isLocationsActive = location.pathname === Routes.Locations;

    const qrCodeClickHandler = () => {
        console.log('qrCodeClickHandler');
        eventService.emit(EVENT.MODAL_SCAN, { isActive: true });
    }

    return (
        <div className={styles.menu}>
            <div className={styles.menuItem} onClick={qrCodeClickHandler}>
                <Icon name="qr-code" size="medium" />
            </div>

            <div className={`${styles.menuItem} ${isLocationsActive ? styles.active : ''}`}>
                <img src={umbrella} alt="" />
                <span>Пляжи</span>
            </div>
        </div>
    );
}