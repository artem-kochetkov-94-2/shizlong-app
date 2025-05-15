import { formatFullDate } from '@src/application/utils/formatDate';
import { RawCashierBooking } from '@src/infrastructure/bookings/types';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './BookingCardByCashier.module.css';
import { Tag } from '@src/presentation/ui-kit/Tag';
import { declension } from '@src/application/utils/delcension';

interface BookingCardByCashierProps {
  booking: RawCashierBooking;
}

export const BookingCardByCashier = observer(({ booking }: BookingCardByCashierProps) => {
  const navigate = useNavigate();
  console.log('booking', JSON.parse(JSON.stringify(booking)));

  return (
    <>
      <div className={styles.item} key={booking.id}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.category}>{booking.sector_scheme?.sector?.name} пляжа</div>
            <div
              className={styles.name}
              onClick={() => navigate(Routes.BookingDetails.replace(':id', booking.id.toString()))}
            >
              {booking.sector_scheme?.sector?.location.name}
            </div>

            <div className={styles.customer}>
              <span className={styles.customerName}>{booking.customer.name}</span>
              <Tag text={booking.customer.phone} size='medium' />
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
                <img src={booking.sector_scheme?.sector?.location.link_space} />
              </SwiperSlide>
            </Swiper>
            <div className={styles.status}>
              {booking.modules_count} {declension(booking.modules_count, ['модуль', 'модуля', 'модулей'])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
