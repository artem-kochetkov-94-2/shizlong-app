import { useLocation } from 'react-router-dom';
import { Routes } from '@src/routes';
import { Icon } from '@src/presentation/ui-kit/Icon';
import umbrella from './assets/umbrella.svg';
import styles from './Menu.module.css';

export const Menu = () => {
    const location = useLocation();
    const isLocationsActive = location.pathname === Routes.Locations;

    return (
        <div className={styles.menu}>
            <div className={styles.menuItem}>
                <Icon name="qr-code" size="medium" />
            </div>

            <div className={`${styles.menuItem} ${isLocationsActive ? styles.active : ''}`}>
                <img src={umbrella} alt="" />
                <span>Пляжи</span>
            </div>
        </div>
    );
}