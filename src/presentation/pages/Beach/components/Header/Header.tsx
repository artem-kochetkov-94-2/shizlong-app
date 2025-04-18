import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import { locationsStore } from '@src/application/store/locationsStore';
import { locationStore } from '@src/application/store/locationStore';
import styles from './Header.module.css';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Routes } from '@src/routes';
import { createYandexMapsRouteLink } from '@src/application/utils/createYandexMapsRouteLink';
import { geoStore } from '@src/application/store/geoStore';

interface HeaderProps {
  handleToggleFavorite: () => void;
}

export const Header = observer(({ handleToggleFavorite }: HeaderProps) => {
  const navigate = useNavigate();
  const { location } = locationStore;
  const { location: geoLocation } = geoStore;
  const { id } = useParams<{ id: string }>();
  const isFavorite = locationsStore.getFavoriteStatus(Number(id));

  return (
    <div className={styles.header}>
      <IconButton
        iconName='arrow-left'
        size='medium'
        onClick={() => navigate(Routes.Locations)}
        className={styles.backButton}
        shape='rounded'
        color='white'
      />

      <div className={styles.title}>
        <span className={styles.category}>пляж</span>
        <span className={styles.name}>{location?.name}</span>
      </div>

      <div className={cn(styles.icons)}>
        <IconButton
          className={cn({ [styles.favorite]: isFavorite })}
          size='medium'
          iconName='favorite-outline'
          shape='rounded'
          color='white'
          onClick={handleToggleFavorite}
          disabled={isFavorite === null}
        />
        <IconButton
          iconName='route'
          size='medium'
          shape='rounded'
          color='white'
          href={createYandexMapsRouteLink(
            [geoLocation.latitude, geoLocation.longitude],
            location?.coordinates.slice().reverse() as [number, number],
          )}
        />
      </div>
    </div>
  );
});
