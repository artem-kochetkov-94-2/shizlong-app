import { formatFullDate } from "@src/application/utils/formatDate";
import { RawBooking } from "@src/infrastructure/bookings/types";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Routes } from "@src/routes";
import styles from "./BookingCard.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@src/presentation/ui-kit/Button";
import { IconButton } from "@src/presentation/ui-kit/IconButton";

const bookingStatusMap = {
    'pending': 'Не оплачена',
    'confirmed': 'Оплачена',
    'cancelled': 'Отменена',
    'completed': 'Завершена',
}

export const bgColorByStatus = {
    'completed': '#ED9B58',
    'cancelled': '#F95E5E',
    'pending': '#FBD24C',
    'confirmed': '#161D25CC',
}

export const colorByStatus = {
    'completed': '#ffffff',
    'cancelled': '#ffffff',
    'pending': '#292C31',
    'confirmed': '#ffffff',
}

export const BookingCard = ({ booking }: { booking: RawBooking }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.item} key={booking.id}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.category}>Пляж</div>
                    <div className={styles.name}>{booking.module.sector.location.name}</div>

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
                        <Icon name="qr-code2" size="small" />
                    </div>
                </div>

                {/* {isFavorite && (
                    <div className={styles.favorite}>
                        <IconButton
                            iconName="favorite"
                            size="medium"
                            iconSize="extra-small"
                        />
                    </div>
                )} */}
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
                    />
                    <IconButton
                        iconName="in-map"
                        size="large"
                        iconSize="small"
                        shape="rounded"
                        color="white"
                    />
                </div>

                {/* <div className={styles.actionItem}>
                    <Button
                        size="medium"
                        variant="yellow"
                    >
                        <span>Продлить</span>
                    </Button>
                    <IconButton
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
                    />
                </div> */}
            </div>

            {/* <img src={`data:image/png;base64, ${booking.qr_code}`} /> */}
        </div>
    );
};
