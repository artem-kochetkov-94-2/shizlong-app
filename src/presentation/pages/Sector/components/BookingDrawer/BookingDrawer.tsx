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
// import { ModulesSelect } from './components/ModulesSelect';
import { ChooseDate } from './components/ChooseDate';
import { ChooseTime } from './components/ChooseTime';
import { ChooseStartTime } from './components/ChooseStartTime/ChooseStartTIme';
import { ProfileButton } from '@src/presentation/pages/Locations/components/Navigation/components/ProfileButton';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { Button } from '@src/presentation/ui-kit/Button';
import { locationStore } from '@src/application/store/locationStore';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { BookingCard } from '@src/presentation/components/BookingCard';

const SNAP_POINTS = [758, 309, 79];
const INITIAL_SNAP_POINT = 1;

export const BookingDrawer = observer(() => {
  const { activeTab } = bookStore;
  const { activeBookingsTab, modules, bookPrice } = bookStore;
  const { currentBookings } = bookingsStore;
  const { activeScheme, schemes, sector } = sectorStore;
  const { location } = locationStore;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const ref = useRef<SheetRef>(null);
  const snapTo = (i: number) => ref.current?.snapTo(i);

  console.log('sector', JSON.parse(JSON.stringify(sectorStore.sector)));

  const locationBookings = currentBookings.filter((b) => b.sector_scheme.sector.location.id === location?.id);

  useEffect(() => {
    setTimeout(() => {
      snapTo(1);
    }, 1000);
  }, []);

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
            <IconButton iconName='qr-code' size='large' />
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

                  <div className={styles.modulesRow}>
                    <div className={styles.modulesRowTitle}>Заказать</div>
                  </div>

                  <div className={styles.modulesControls}>
                    <ChooseStartTime />
                    <ChooseTime />
                    <ChooseDate />
                  </div>

                  {modules.size > 0 && (
                    <div style={{ marginTop: 15}}>
                      <Button
                        variant='yellow'
                        size='medium'
                        onClick={() => navigate(Routes.Booking)}
                      >
                        Заказать {bookPrice.toLocaleString()} ₽
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
