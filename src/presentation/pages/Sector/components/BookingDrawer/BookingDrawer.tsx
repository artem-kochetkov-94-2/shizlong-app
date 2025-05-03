import { IconButton } from '@src/presentation/ui-kit/IconButton';
import styles from './BookingDrawer.module.css';
import { RoundedTabs } from '@src/presentation/ui-kit/RoundedTabs';
import {
  bookStore,
  sectorTabs,
  SectorTab,
  bookingTabs,
} from '@src/application/store/bookStore';
import { observer } from 'mobx-react-lite';
import { sectorStore } from '@src/application/store/sectorStore';
import { SchemeMode } from '../SchemeMode/SchemeMode';
import classNames from 'classnames';
import { Tabs } from '@src/presentation/ui-kit/Tabs';
import { Sheet } from 'react-modal-sheet';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import { useEffect } from 'react';
import { ChooseDate } from './components/ChooseDate';
import { ProfileButton } from '@src/presentation/pages/Locations/components/Navigation/components/ProfileButton';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { Button } from '@src/presentation/ui-kit/Button';
import { locationStore } from '@src/application/store/locationStore';
import { ChoosePeriod } from './components/ChoosePeriod/ChoosePeriod';
import { ChooseStartTime } from './components/ChooseStartTime/ChooseStartTIme';
import { eventService } from '@src/application/services/EventService/EventService';
import { EVENT } from '@src/application/services/EventService/EventList';
import { SectorBookings } from './components/SectorBookings';
import { useDrawer } from '@src/presentation/pages/Beach/useDrawer';
import { useClearStates } from './useClearStates';
import { useSetPeriod } from './useSetPeriod';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { profileStore } from '@src/application/store/profileStore';
import { cashierStore } from '@src/application/store/cashierStore';
import { verificationStore } from '@src/application/store/verificationStore';

const SNAP_POINTS = [758, 309, 79];
const INITIAL_SNAP_POINT = 1;

export const BookingDrawer = observer(() => {
  const { activeTab } = bookStore;
  const { activeBookingsTab, bookModules, modulesPrice } = bookStore;
  const { activeScheme, schemes, sector } = sectorStore;
  const { location } = locationStore;
  const { currentBookings } = bookingsStore;

  const navigate = useNavigate();

  const { isOpen, setIsOpen, ref, snap, setSnap, snapTo } = useDrawer();

  useEffect(() => {
    setTimeout(() => {
      snapTo(1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (activeTab === 'order') {
      snapTo(INITIAL_SNAP_POINT);
    }
  }, [activeTab]);

  useClearStates();
  useSetPeriod();

  useEffect(() => {
    if (!verificationStore.isVerified) return;

    if (profileStore.isCashier) {
      cashierStore.initBookigns(sector?.id);
    } else {
      bookingsStore.initCurrentBookings();
    }
  }, [sector?.id, profileStore.isCashier, verificationStore.isVerified]);

  const qrCodeClickHandler = () => {
    eventService.emit(EVENT.MODAL_SCAN, { isActive: true });
  }

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={() => setIsOpen(true)}
      onSnap={(snap) => setSnap(snap)}
      detent='content-height'
      snapPoints={SNAP_POINTS}
      initialSnap={INITIAL_SNAP_POINT}
      dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {(activeTab === 'bookings' && snap === 0) ? (
            null
          ): (
            <div className={styles.controls}>
              <div className={styles.controlsItem}>
                <IconButton iconName='tap' size='extra-small' shape='rounded' />
                <span>Выберите несколько модулей</span>
              </div>
              {activeScheme && schemes.length > 1 && (
                <div className={classNames(styles.controlsItem, styles.scheme)}>
                  <SchemeMode />
                </div>
              )}
            </div>
          )}

          <div className={styles.navigation}>
            <IconButton iconName='qr-code' size='large' onClick={qrCodeClickHandler} />
            <RoundedTabs
              activeTab={activeTab}
              tabs={sectorTabs}
              onTabChange={(tab) => bookStore.setActiveTab(tab as SectorTab)}
            />
            <ProfileButton />
          </div>

          <Sheet.Scroller>
            {activeTab === 'bookings' && (
              <div className={styles.bookings}>
                {currentBookings?.bookingsData.length === 0 && (
                  <div className={styles.bookingsEmpty}>
                    На {sector?.name} пляжа {location?.name} на сегодня у вас броней нет
                  </div>
                )}

                <Tabs
                  tabs={bookingTabs}
                  activeTab={activeBookingsTab}
                  onTabChange={(tab) => bookStore.setActiveBookingsTab(tab)}
                />

                <SectorBookings />
              </div>
            )}

            {activeTab === 'order' && (
              <>
                <div className={styles.content}>
                  <div className={styles.divider} />

                  <div className={styles.modulesControls}>
                    <ChoosePeriod />
                    <ChooseStartTime />
                    <ChooseDate />
                  </div>

                  {bookModules.size > 0 && (
                    <div style={{ marginTop: 10 }}>
                      <Button
                        variant='yellow'
                        size='medium'
                        onClick={() => navigate(Routes.Booking)}
                      >
                        Заказать {modulesPrice.toLocaleString()} ₽
                      </Button>
                    </div>
                  )}
                </div>
                {/* @todo - слайдер времени */}
                {/* {activeScheme && (
                  <TimeSlider
                    timeStart={activeScheme.time_start}
                    timeEnd={activeScheme.time_end}
                  />
                )} */}
              </>
            )}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
});
