import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Routes } from "@src/routes";
import { Sheet } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookingQr.module.css";
import { Card } from "@src/presentation/ui-kit/Card";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { formatFullDate, formatTimeRange, getTimeRangeDurationInHours, declensionOfHours } from "@src/application/utils/formatDate";
import { Button } from "@src/presentation/ui-kit/Button";
import { DecorateButton } from "@src/presentation/components/DecorateButton";

export const BookingQr = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { bookings } = bookingsStore;
    const booking = bookings.find(b => b.id === Number(id));

    useEffect(() => {
        bookingsStore.getMyBookings();
    }, []);

    if (!booking) {
        return <div>Бронь не найдена</div>;
    }

    return (
        <Sheet
            isOpen={true}
            onClose={() => navigate(Routes.Locations)}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className={styles.header}>
                        <div className={styles.title}>Моя бронь</div>
                        <div className={styles.subtitle}>
                            {booking?.module.sector.location.name}, сектор {booking?.module.sector.name}
                        </div>

                        <IconButton
                            iconName="cross"
                            size="medium"
                            shape="rounded"
                            className={styles.closeButton}
                            onClick={() => navigate(Routes.Locations)}
                            withShadow={false}
                        />
                    </div>

                    <div className={styles.content}>
                        <div className={styles.qr}>
                            <img
                                src={`data:image/png;base64, ${booking.qr_code}`}
                                alt=""
                                className={styles.qrCodeImg}
                            />
                            <div className={styles.qrCodeTitle}>Активная бронь</div>
                        </div>

                        <div className={styles.services}>
                            <Tag
                                size='medium'
                                color='default'
                                text={booking.module.name}
                                rightContent={`#${booking.module.number}`}
                                shadow
                            />
                        </div>

                        <Card>
                            <div className={styles.accessories}>
                                {booking.booking_accessories.map(accessory => (
                                    <Tag
                                        size='medium'
                                        color='gray'
                                        text={accessory.beach_accessory.name}
                                        leftContent={
                                            <img
                                                src={accessory.beach_accessory.link_icon}
                                                alt={accessory.beach_accessory.name}
                                                className={styles.accessoryImage}
                                            />
                                        }
                                        rightContent={`${accessory.quantity} ед.`}
                                        shadow
                                    />
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <div className={styles.contacts}>
                                <div className={styles.contactItem}>
                                    <Icon name="time" size="extra-small" className={styles.icon} />
                                    <div className={styles.label}>{formatTimeRange(new Date(booking.start_time), new Date(booking.end_time))}</div>
                                    <div className={styles.timeRangeTag}>
                                        <Tag
                                            size='medium'
                                            color='primary'
                                            text={getTimeRangeDurationInHours(new Date(booking.start_time), new Date(booking.end_time)) + ' ' + declensionOfHours(getTimeRangeDurationInHours(new Date(booking.start_time), new Date(booking.end_time)))}
                                        />
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <Icon name="calendar" size="extra-small" className={styles.icon} />
                                    <div className={styles.label}>{formatFullDate(new Date(booking.start_time))}</div>
                                </div>
                                <div className={styles.contactItem}>
                                    <Icon
                                        name="location"
                                        size="extra-small"
                                        className={styles.icon}
                                    />
                                    {/* todo */}
                                    <div className={styles.text}>Краснодарский край, Сочи, микрорайон Центральный</div>
                                </div>
                            </div>
                        </Card>

                        <div className={styles.payment}>
                            {/* format price */}
                            <DecorateButton text={`Оплачено ${booking.total_price.toLocaleString('ru-RU')} ₽`} />
                            <Button variant={'gray2'}>
                                <Icon name={'check2'} size='extra-small' /> Показать чек
                            </Button>
                        </div>

                        <div style={{ height: 500 }}></div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
});
