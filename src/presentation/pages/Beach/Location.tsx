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
import { DRAG_VELOCITY_THRESHOLD, SERVER_URL } from '@src/const';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import classNames from 'classnames';
import { Routes } from '@src/routes';

const SNAP_POINTS = [1, 483, 150];
const INITIAL_SNAP_POINT = 1;

export const Location = observer(() => {
  const [isOpen, setIsOpen] = useState(true);
  const [snap, setSnap] = useState(INITIAL_SNAP_POINT);
  const ref = useRef<SheetRef>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { location, additionalServicesAsFeatures, services, sectors } = locationStore;

  useEffect(() => {
    if (!id) return;

    locationStore.setLocation(Number(id));
    mapStore.toggleSelectionLocationMarker(Number(id), true);

    return () => {
      mapStore.toggleSelectionLocationMarker(Number(id), false);
    };
  }, [id]);

  if (!location) return null;

  const servicesFeatures = services.map((s) => ({
    name: s.name,
    icon: s.placed_icon.link_icon,
    extraTitle: `${s.price_per_hour} ₽ `,
    extraDescription: `в час`,
  }));

  console.log('snap', snap);

  return (
    <>
      <Header />

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
                  {/* <Features title="Особенности" items={peculiarities} /> */}
                </div>
              )}
            </Sheet.Scroller>
            <div
              className={classNames(styles.footer, { [styles.shortFooter]: snap === 2 })}
            >
              <Button variant='yellow' onClick={() => {
                locationStore.choosePlace();
                if (sectors.length === 1) {
                  navigate(Routes.Sector.replace(':id', sectors[0].id.toString()));
                }
              }}>
                Выбрать место
              </Button>
              {snap === 0 ? (
                <div className={styles.actions}>
                  <IconButton
                    iconName='favorite-outline'
                    size='large'
                    shape='rounded'
                    color='white'
                  />
                  <IconButton
                    iconName='route'
                    size='large'
                    shape='rounded'
                    color='white'
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
