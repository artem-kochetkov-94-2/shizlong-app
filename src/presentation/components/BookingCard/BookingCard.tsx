import { formatFullDate } from "@src/application/utils/formatDate";
import { RawBooking } from "@src/infrastructure/bookings/types";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Routes } from "@src/routes";
import styles from "./BookingCard.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@src/presentation/ui-kit/Button";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { paymentStore } from "@src/application/store/paymentStore";
import { observer } from "mobx-react-lite";
import { locationsStore } from "@src/application/store/locationsStore";
import { bookingsStore } from "@src/application/store/bookingsStore";

const bookingStatusMap = {
    'reserved': 'Не оплачена',
    'pending': 'Активна',
    'confirmed': 'Оплачена',
    'cancelled': 'Отменена',
    'completed': 'Завершена',
}

export const bgColorByStatus = {
    'reserved': '#161D25CC',
    'completed': '#ED9B58',
    'cancelled': '#F95E5E',
    'pending': '#FBD24C',
    'confirmed': '#161D25CC',
}

export const colorByStatus = {
    'reserved': '#ffffff',
    'completed': '#ffffff',
    'cancelled': '#ffffff',
    'pending': '#292C31',
    'confirmed': '#ffffff',
}

export const BookingCard = observer(({ booking }: { booking: RawBooking }) => {
    const navigate = useNavigate();
    const isFavorite = locationsStore.getFavoriteStatus(booking.module.sector.location.id);
    const { isLoadingProcessPayment } = paymentStore;
    const { isLoadingCancelBooking } = bookingsStore;

    return (
        <div className={styles.item} key={booking.id}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.category}>Пляж</div>
                    <div className={styles.name}>
                        {booking.module.sector.location.name}
                    </div>

                    <div className={styles.row}>
                        {/* <Tag text="Вы на пляже" /> */}
                        <span>{booking.module.sector.name}</span>
                    </div>
                    <div className={styles.range}>
                        <span>{formatFullDate(new Date(booking.start_time))}</span>
                        <Icon name="time" size="extra-small" />
                        <span>{new Date(booking.start_time).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.end_time).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
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
                            <img src={booking.module.sector.location.link_space} />
                        </SwiperSlide>
                    </Swiper>

                    <div
                        className={styles.status}
                        style={{
                            backgroundColor: bgColorByStatus[booking.status],
                            color: colorByStatus[booking.status],
                        }}
                    >
                        <span>{bookingStatusMap[booking.status]}</span>
                    </div>

                    <div
                        className={styles.qrCode}
                        onClick={() => navigate(Routes.BookingDetails.replace(':id', booking.id.toString()))}
                    >
                        <Icon name="qr-code2" size="small" color="dark" />
                    </div>
                </div>

                {isFavorite && (
                    <div className={styles.favorite}>
                        <IconButton
                            iconName="favorite"
                            size="medium"
                            iconSize="extra-small"
                            color="white"
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
                        size="medium"
                        variant="tertiary"
                        onClick={() => {
                            navigate(Routes.Sector.replace(':id', booking.module.sector.id.toString()));
                        }}
                    >
                        <Icon name="location-flag" size="extra-small" />
                        <span>На схему</span>
                    </Button>
                    <IconButton
                        iconName="route"
                        size="large"
                        iconSize="small"
                        shape="rounded"
                        color="white"
                        iconColor="dark"
                    />
                    <IconButton
                        iconName="in-map"
                        size="large"
                        iconSize="small"
                        shape="rounded"
                        color="white"
                        iconColor="dark"
                    />
                </div>

                <div className={styles.actionItem}>
                    {booking.status === 'reserved' && (
                        <>
                            <Button
                                size="medium"
                                variant="yellow"
                                onClick={() => paymentStore.processPayment(booking.id)}
                                isLoading={isLoadingProcessPayment.get(booking.id)}
                                disabled={isLoadingProcessPayment.get(booking.id)}
                            >
                                <span>Оплатить</span>
                            </Button>
                            <Button
                                size="medium"
                                variant="tertiary"
                                onClick={() => bookingsStore.cancelBooking(booking.id)}
                                isLoading={isLoadingCancelBooking.get(booking.id)}
                                disabled={isLoadingCancelBooking.get(booking.id)}
                            >
                                <span>Отменить</span>
                            </Button>
                        </>
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
    );
});
