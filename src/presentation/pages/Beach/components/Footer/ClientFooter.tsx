import { locationStore } from '@src/application/store/locationStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@presentation/ui-kit/Button';
import styles from './ClientFooter.module.css';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import classNames from 'classnames';
import { Routes } from '@src/routes';
import cn from 'classnames';
import { createYandexMapsRouteLink } from '@src/application/utils/createYandexMapsRouteLink';
import { geoStore } from '@src/application/store/geoStore';
import { observer } from 'mobx-react-lite';
import { shareLink } from '@src/application/utils/shareLink';
import { profileStore } from '@src/application/store/profileStore';

interface ClientFooterProps {
    snapTo: (snap: number) => void;
    handleToggleFavorite: () => void;
    isFavorite: boolean;
    snap: number;
}

export const ClientFooter = observer(({
    snap,
    snapTo,
    handleToggleFavorite,
    isFavorite,
}: ClientFooterProps) => {
    const { isCashier } = profileStore;

    const navigate = useNavigate();
    const { location: geoLocation } = geoStore;
    const { location, sectors } = locationStore;

    return (
        <div className={classNames(styles.footer, { [styles.shortFooter]: snap === 2 })}>
            <Button
                variant='yellow'
                onClick={() => {
                    locationStore.choosePlace();
                    if (sectors.length === 1) {
                        navigate(Routes.Sector.replace(':id', sectors[0].id.toString()));
                    } else {
                        navigate(Routes.LocationPlan.replace(':id', location?.id.toString() ?? ''))
                    }

                    if (snap === 0) {
                        snapTo(1);
                    }
                }}
            >
                {isCashier ? 'К секторам пляжа' : 'Выбрать место'}
            </Button>
            {snap === 0 ? (
                <div className={styles.actions}>
                    <IconButton
                        iconName='favorite-outline'
                        size='large'
                        shape='rounded'
                        color='white'
                        onClick={handleToggleFavorite}
                        className={cn({ [styles.favorite]: isFavorite })}
                    />
                    <IconButton
                        iconName='route'
                        size='large'
                        shape='rounded'
                        color='white'
                        href={createYandexMapsRouteLink(
                            [geoLocation.latitude, geoLocation.longitude],
                            location?.coordinates.slice().reverse() as [number, number] || [0, 0]
                        )}
                    />
                    <IconButton
                        iconName='in-map'
                        size='large'
                        shape='rounded'
                        color='white'
                        onClick={() => shareLink('')}
                    />
                </div>
            ) : null}
        </div>
    );
});
