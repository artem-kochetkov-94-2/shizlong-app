import { useState } from 'react';
import { formatFullDate } from '@src/application/utils/formatDate';
import { RawBooking } from '@src/infrastructure/bookings/types';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';
import { Button } from '@src/presentation/ui-kit/Button';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import { paymentStore } from '@src/application/store/paymentStore';
import { observer } from 'mobx-react-lite';
import { locationsStore } from '@src/application/store/locationsStore';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { CancelBookingPanel } from '../CancelBookingPanel';
import styles from './BookingCard.module.css';
import { createYandexMapsRouteLink } from '@src/application/utils/createYandexMapsRouteLink';
import { geoStore } from '@src/application/store/geoStore';

const bookingStatusMap = {
  reserved: 'Не оплачена',
  confirmed: 'Оплачена',
  busy: 'Оплачена',
  pending: 'Активна',
  cancelled: 'Отменена',
  completed: 'Завершена',
};

export const bgColorByStatus = {
  reserved: '#161D25CC',
  confirmed: '#161D25CC',
  busy: '#161D25CC',
  pending: '#FBD24C',
  cancelled: '#F95E5E',
  completed: '#ED9B58',
};

export const colorByStatus = {
  reserved: '#ffffff',
  confirmed: '#ffffff',
  busy: '#ffffff',
  pending: '#292C31',
  cancelled: '#ffffff',
  completed: '#ffffff',
};

export const BookingCard = observer(({ booking }: { booking: RawBooking }) => {
  const [isCancelOpen, setCancelOpen] = useState(false);
  const navigate = useNavigate();
  const isFavorite = locationsStore.getFavoriteStatus(booking.sector_scheme?.sector.location_id);
  const { isLoadingProcessPayment } = paymentStore;
  const { isLoadingCancelBooking } = bookingsStore;
  const { location: geoLocation } = geoStore;
  const { locations } = locationsStore;
  const location = locations.find((l) => l.id === booking.sector_scheme?.sector.location_id);

  console.log('booking', JSON.parse(JSON.stringify(booking)));

  return (
    <>
      <CancelBookingPanel
        isOpen={isCancelOpen}
        onClose={() => setCancelOpen(false)}
        bookingId={booking.id}
      />
      <div className={styles.item} key={booking.id}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.category}>Пляж</div>
            <div
              className={styles.name}
              onClick={() => navigate(Routes.BookingDetails.replace(':id', booking.id.toString()))}
            >
              {booking.sector_scheme?.sector.location.name}
            </div>

            <div className={styles.row}>
              {/* <Tag text="Вы на пляже" /> */}
              <span>{booking.sector_scheme?.sector.name}</span>
            </div>
            <div className={styles.range}>
              <span>{formatFullDate(new Date(booking.booking_modules?.[0]?.start_time))}</span>
              <Icon name='time' size='extra-small' />
              <span>
                {new Date(booking.booking_modules?.[0]?.start_time).toLocaleString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                -{' '}
                {new Date(booking.booking_modules?.[0]?.end_time).toLocaleString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>

          <div className={styles.slider}>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              touchRatio={1}
              simulateTouch={true}
              touchStartPreventDefault={false}
            >
              <SwiperSlide>
                <img src={booking.sector_scheme?.sector.location.link_space} />
              </SwiperSlide>
            </Swiper>

            <div
              className={styles.status}
              style={{
                backgroundColor: bgColorByStatus[booking.status.name],
                color: colorByStatus[booking.status.name],
              }}
            >
              <span>{bookingStatusMap[booking.status.name]}</span>
            </div>

            <div
              className={styles.qrCode}
              onClick={() => navigate(Routes.BookingDetailsQR.replace(':id', booking.id.toString()))}
            >
              <Icon name='qr-code2' size='small' color='dark' />
            </div>
          </div>

          {isFavorite && (
            <div className={styles.favorite}>
              <IconButton
                iconName='favorite'
                size='medium'
                iconSize='extra-small'
                color='white'
              />
            </div>
          )}
        </div>

        {/* <TimeSlider
          timeStart="10:00:00"
          timeEnd="13:00:00"
        /> */}

        <div className={styles.actions}>
          <div className={styles.actionItem}>
            <Button
              size='medium'
              variant='tertiary'
              onClick={() => {
                navigate(Routes.Sector.replace(':id', booking.sector_scheme?.sector.id.toString() || ''));
              }}
            >
              <Icon name='location-flag' size='extra-small' />
              <span>На схему</span>
            </Button>
            <IconButton
              iconName='route'
              size='large'
              iconSize='small'
              shape='rounded'
              color='white'
              iconColor='dark'
              href={createYandexMapsRouteLink(
                [geoLocation?.latitude, geoLocation?.longitude],
                location?.coordinates.slice().reverse() as [number, number] || [0, 0],
              )}
            />
            <IconButton
              iconName='in-map'
              size='large'
              iconSize='small'
              shape='rounded'
              color='white'
              iconColor='dark'
            />
          </div>

          <div className={styles.actionItem}>
            {booking.status.name === 'reserved' && (
              <>
                <Button
                  size='medium'
                  variant='yellow'
                  onClick={() => paymentStore.processPayment(booking.id)}
                  isLoading={isLoadingProcessPayment.has(booking.id)}
                  disabled={isLoadingProcessPayment.has(booking.id)}
                >
                  <span>Оплатить</span>
                </Button>
                <Button
                  size='medium'
                  variant='tertiary'
                  onClick={() => setCancelOpen(true)}
                  isLoading={isLoadingCancelBooking.get(booking.id)}
                  disabled={isLoadingCancelBooking.get(booking.id)}
                >
                  <span>Отменить</span>
                </Button>
              </>
            )}
            {booking.status.name === 'busy' && (
              <Button
                size='medium'
                variant='tertiary'
                onClick={() => setCancelOpen(true)}
              >
                <span>Отменить</span>
              </Button>
            )}
            {/* <IconButton
                iconName="stop"
                size="large"
                iconSize="small"
                shape="rounded"
                color="white"
            />
            <IconButton
                iconName="megaphone"
                size="large"
                iconSize="small"
                shape="rounded"
                color="white"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
});
