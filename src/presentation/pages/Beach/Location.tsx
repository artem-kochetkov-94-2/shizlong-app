import { locationStore } from '@src/application/store/locationStore';
import { observer } from 'mobx-react-lite';
import { Contacts } from './components/Contacts';
import { Features } from '@src/presentation/components/Features/Features';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { About } from '@src/presentation/components/About/About';
import styles from './Location.module.css';
import { mapStore } from '@src/application/store/mapStore';
import { Sheet } from 'react-modal-sheet';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import { locationsStore } from '@src/application/store/locationsStore';
import { useDrawer, INITIAL_SNAP_POINT, SNAP_POINTS } from './useDrawer';
import { profileStore } from '@src/application/store/profileStore';
import { ClientFooter } from './components/Footer/ClientFooter';
import { CashierFooter } from './components/Footer/CashierFooter';

export const Location = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, setIsOpen, snap, setSnap, ref, snapTo, paddingBottom } = useDrawer();

  const { isCashier } = profileStore;
  const { location, additionalServicesAsFeatures, services } = locationStore;
  
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

  const servicesFeatures = services.map((s) => ({
    name: s.name,
    icon: s.placed_icon?.link_icon,
    extraTitle: `${s.minimal_price?.price.formatted_value}`,
    extraDescription: s.minimal_price?.type.description,
  }));

  return (
    <>
      <Header handleToggleFavorite={handleToggleFavorite} />

      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={() => setIsOpen(true)}
        detent='content-height'
        snapPoints={SNAP_POINTS}
        onSnap={(s) => setSnap(s)}
        initialSnap={INITIAL_SNAP_POINT}
        dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ paddingBottom }}>
            <Navigation location={location} snap={snap} />
            <Sheet.Scroller>
              {snap === 2 ? null : (
                <div className={styles.content}>
                  <Contacts location={location} />
                  <About title='Описание' description={location.description ?? ''} />
                  <Features title='Услуги' items={servicesFeatures} />
                  {additionalServicesAsFeatures.length > 0 && (
                    <Features
                      title='Пляжная инфраструктура'
                      items={additionalServicesAsFeatures}
                    />
                  )}
                </div>
              )}
            </Sheet.Scroller>
            
            {isCashier ? (
              <CashierFooter snap={snap} snapTo={snapTo} />
            ) : (
              <ClientFooter
                snap={snap}
                snapTo={snapTo}
                handleToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
              />
            )}
          </Sheet.Content>
        </Sheet.Container>
        {snap === 0 ? <Sheet.Backdrop /> : <></>}
      </Sheet>
    </>
  );
});
