import { locationStore } from '@src/application/store/locationStore';
import { observer } from 'mobx-react-lite';
import { Contacts } from './components/Contacts';
import { Features } from '@src/presentation/components/Features/Features';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Button } from '@presentation/ui-kit/Button';
import { About } from '@src/presentation/components/About/About';
import styles from './Location.module.css';
import { useState } from 'react';
import { mapStore } from '@src/application/store/mapStore';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import classNames from 'classnames';
import { Routes } from '@src/routes';
import { locationsStore } from '@src/application/store/locationsStore';
import cn from 'classnames';
import { createYandexMapsRouteLink } from '@src/application/utils/createYandexMapsRouteLink';
import { geoStore } from '@src/application/store/geoStore';

const SNAP_POINTS = [1, 483, 150];
const INITIAL_SNAP_POINT = 1;

export const Location = observer(() => {
  const [isOpen, setIsOpen] = useState(true);
  const [snap, setSnap] = useState(INITIAL_SNAP_POINT);
  const { location: geoLocation } = geoStore;
  const ref = useRef<SheetRef>(null);
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { location, additionalServicesAsFeatures, services, sectors } = locationStore;
  const isFavorite = locationsStore.getFavoriteStatus(Number(id));

  const handleToggleFavorite = (): void => {
    locationsStore.toggleFavoriteLocation(Number(id), !isFavorite);
  };

  useEffect(() => {
    if (!id) return;

    locationStore.setLocation(Number(id));
    mapStore.toggleSelectionLocationMarker(Number(id), true);

    return () => {
      mapStore.toggleSelectionLocationMarker(Number(id), false);
    };
  }, [id]);

  if (!location) return null;

  // @todo - если не в час
  const servicesFeatures = services.map((s) => ({
    name: s.name,
    icon: s.placed_icon?.link_icon,
    extraTitle: `${s.minimal_price?.price.formatted_value}`,
    // @todo
    extraDescription: `в час ???`,
  }));

  return (
    <>
      <Header handleToggleFavorite={handleToggleFavorite} />

      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={() => setIsOpen(true)}
        snapPoints={SNAP_POINTS}
        onSnap={(s) => setSnap(s)}
        initialSnap={INITIAL_SNAP_POINT}
        dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
            <Navigation location={location} snap={snap} />
            <Sheet.Scroller>
              {snap === 2 ? null : (
                <div className={styles.content}>
                  <Contacts location={location} />
                  <About title='Описание' description={location.description ?? ''} />
                  <Features title='Услуги' items={servicesFeatures} />
                  <Features
                    title='Пляжная инфраструктура'
                    items={additionalServicesAsFeatures}
                  />
                  {/* @todo - особенности */}
                  {/* <Features title="Особенности" items={peculiarities} /> */}
                </div>
              )}
            </Sheet.Scroller>
            <div
              className={classNames(styles.footer, { [styles.shortFooter]: snap === 2 })}
            >
              <Button
                variant='yellow'
                onClick={() => {
                  locationStore.choosePlace();
                  if (sectors.length === 1) {
                    navigate(Routes.Sector.replace(':id', sectors[0].id.toString()));
                  } else if (snap === 0) {
                    snapTo(1);
                  }
                }}
              >
                Выбрать место
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
                    href={
                      createYandexMapsRouteLink(
                        [geoLocation.latitude, geoLocation.longitude],
                        location.coordinates.slice().reverse() as [number, number]
                      )}
                  />
                  <IconButton
                    iconName='in-map'
                    size='large'
                    shape='rounded'
                    color='white'
                  />
                </div>
              ) : null}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        {snap === 0 ? <Sheet.Backdrop /> : <></>}
      </Sheet>
    </>
  );
});
