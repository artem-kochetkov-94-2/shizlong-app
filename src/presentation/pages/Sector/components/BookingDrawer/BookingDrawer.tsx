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
import { Sheet, SheetRef } from 'react-modal-sheet';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import { useEffect, useRef, useState } from 'react';
import { ChooseDate } from './components/ChooseDate';
// import { ChooseTime } from './components/ChooseTime';
import { ProfileButton } from '@src/presentation/pages/Locations/components/Navigation/components/ProfileButton';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { Button } from '@src/presentation/ui-kit/Button';
import { locationStore } from '@src/application/store/locationStore';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { BookingCard } from '@src/presentation/components/BookingCard';
import { ChoosePeriod } from './components/ChoosePeriod/ChoosePeriod';
import { ChooseStartTime } from './components/ChooseStartTime/ChooseStartTIme';
import { eventService } from '@src/application/services/EventService/EventService';
import { EVENT } from '@src/application/services/EventService/EventList';

const SNAP_POINTS = [758, 309, 79];
const INITIAL_SNAP_POINT = 1;

export const BookingDrawer = observer(() => {
  const { activeTab } = bookStore;
  const { activeBookingsTab, bookModules, modulesPrice, allPeriods, hourlyPeriods, moduleSchemePeriod, largestPeriod } = bookStore;
  const { currentBookings } = bookingsStore;
  const { activeScheme, schemes, sector } = sectorStore;
  const { location, modules } = locationStore;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const ref = useRef<SheetRef>(null);
  const snapTo = (i: number) => ref.current?.snapTo(i);

  const locationBookings = currentBookings.filter((b) => b.sector_scheme?.sector.location.id === location?.id);

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

  // clear states after change scheme
  useEffect(() => {
    bookStore.clear();
  }, [activeScheme]);

  // clear modules from another sector or scheme
  useEffect(() => {
    if (!sector || !location || !bookModules.size) return;

    const first = bookModules.values().next().value;

    if (first?.sector_id !== sector.id || first?.sector_scheme_id !== activeScheme?.id) {
      bookStore.clear();
    }
  }, [sector, location, bookModules, modules, activeScheme]);

  useEffect(() => {
    if (moduleSchemePeriod !== null) return;

    if (largestPeriod) {
      bookStore.setPeriod({
        type: 'period',
        startTime: `${largestPeriod[0]}`,
        endTime: `${largestPeriod[1]}`,
      });
      return;
    }

    if (hourlyPeriods.length > 0) {
      bookStore.setPeriod({
        type: 'hourly',
        hours: hourlyPeriods[0],
      });
    }
  }, [allPeriods, largestPeriod, hourlyPeriods, moduleSchemePeriod, activeScheme]);

  const qrCodeClickHandler = () => {
    eventService.emit(EVENT.MODAL_SCAN, { isActive: true });
  }

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={() => setIsOpen(true)}
      detent='content-height'
      snapPoints={SNAP_POINTS}
      initialSnap={INITIAL_SNAP_POINT}
      dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
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
                {locationBookings.length === 0 && (
                  <div className={styles.bookingsEmpty}>
                    На {sector?.name} пляжа {location?.name} на сегодня у вас броней нет
                  </div>
                )}

                <Tabs
                  tabs={bookingTabs}
                  activeTab={activeBookingsTab}
                  onTabChange={(tab) => bookStore.setActiveBookingsTab(tab)}
                />

                {locationBookings.length > 0 && (
                  <div className={styles.bookingsContainer}>
                    {locationBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
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
