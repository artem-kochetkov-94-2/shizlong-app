import { Button } from '@src/presentation/ui-kit/Button';
import backgroundImg from './assets/bg.jpg';
import logoImg from './assets/logo.svg';
import backgroundGeoImg from './assets/bg-geo.png';
import mapImg from './assets/map.svg';
import styles from './Init.module.css';
import { Routes } from '@src/routes';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { geoStore } from '@src/application/store/geoStore';
import { observer } from 'mobx-react-lite';
import { verificationStore } from '@src/application/store/verificationStore';

export const Init = observer(() => {
    const [showWelcome, setShowWelcome] = useState(true);
    const navigate = useNavigate();
    const { permissionStatus, error, locationSetted } = geoStore;
    const { isVerified } = verificationStore;

    useEffect(() => {
        setTimeout(() => {
            setShowWelcome(false);
        }, 1000);
    }, []);

    const closePage = useCallback(() => {
        if (isVerified) {
            navigate(Routes.Locations);
        } else {
            navigate(Routes.Auth);
        }
    }, [isVerified, navigate]);

    useEffect(() => {
        if (locationSetted || error) {
            console.log('Init error', error);
            closePage();
            return;
        }

        if (permissionStatus === 'denied') {
            closePage();
            return;
        }

        if (permissionStatus === 'granted') {
            closePage();
        }
    }, [permissionStatus, closePage, error, locationSetted]);

    return (
        <div>
            {showWelcome && (
                <div className={styles.welcome} style={{ backgroundImage: `url(${backgroundImg})` }}>
                    <img src={logoImg} alt="logo" />
                </div>
            )}

            <div className={styles.geo} style={{ backgroundImage: `url(${backgroundGeoImg}), linear-gradient(360deg, #FFEACA 0%, #FADEB3 64.98%, #E3C496 100%)` }}>
                <div className={styles.geoContent}>
                    <img src={mapImg} alt="Карта" />
                    <div className={styles.geoTitle}>
                        Привет! Давайте определим ваше положение на карте?
                    </div>
                    <div className={styles.geoDescription}>
                        Разрешите геолокацию, чтобы находить места рядом, строить маршруты и видеть своё местоположение.
                    </div>

                    <Button variant="primary" size="large" onClick={geoStore.requestLocation}>
                        Разрешить геолокацию
                    </Button>

                    <div className={styles.geoLicense}>Используя приложение, вы соглашаетесь с <a href="">Лицензионным соглашением</a></div>
                </div>
            </div>

            <IconButton
                iconName="cross"
                size="large"
                className={styles.iconClose}
                shape="rounded"
                onClick={closePage}
            />
        </div>
    );
});
