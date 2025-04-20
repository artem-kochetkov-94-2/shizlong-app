import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Routes } from "@src/routes";
import { Sheet } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookingDetailsQR.module.css";
import { Card } from "@src/presentation/ui-kit/Card";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { observer } from "mobx-react-lite";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { formatFullDate, formatTimeRange, getTimeRangeDurationInHours, declensionOfHours } from "@src/application/utils/formatDate";
import { Button } from "@src/presentation/ui-kit/Button";
import { DecorateButton } from "@src/presentation/components/DecorateButton";
import { useEffect } from "react";
import { bookingCardStore } from "@src/application/store/bookingCardStore";

export const BookingDetailsQR = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        bookingCardStore.setBookingId(Number(id));
    }, [id]);

    const { bookings } = bookingsStore;
    const booking = bookings.find(b => b.id === Number(id));

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
                            {booking?.sector_scheme.sector.location.name}, сектор {booking?.sector_scheme.sector.name}
                        </div>

                        <IconButton
                            iconName="cross"
                            size="medium"
                            shape="rounded"
                            className={styles.closeButton}
                            onClick={() => navigate(-1)}
                            withShadow={false}
                        />
                    </div>
                    <Sheet.Scroller>
                        <div className={styles.content}>
                            <div className={styles.qr}>
                                <img
                                    src={`data:image/png;base64, ${booking.qr}`}
                                    alt=""
                                    className={styles.qrCodeImg}
                                />
                                <div className={styles.qrCodeTitle}>Активная бронь</div>
                            </div>

                            <div className={styles.services}>
                                {booking.booking_modules.map(module => (
                                    <Tag
                                        size='medium'
                                        color='default'
                                        text={module.module.name}
                                        rightContent={`#${module.module.number}`}
                                        shadow
                                    />
                                ))}
                            </div>

                            {booking.accessories.length > 0 && (
                                <Card>
                                    <div className={styles.accessories}>
                                        {booking.accessories.map(accessory => (
                                            <Tag
                                                size='medium'
                                                color='gray'
                                                text={accessory.beach_accessory?.name}
                                                leftContent={
                                                    <img
                                                        src={accessory.beach_accessory?.link_icon}
                                                        alt={accessory.beach_accessory?.name}
                                                        className={styles.accessoryImage}
                                                    />
                                                }
                                                rightContent={`${accessory.quantity} ед.`}
                                                shadow
                                            />
                                        ))}
                                    </div>
                                </Card>
                            )}

                            <Card>
                                <div className={styles.contacts}>
                                    <div className={styles.contactItem}>
                                        <Icon name="time" size="extra-small" className={styles.icon} />
                                        <div className={styles.label}>
                                            {formatTimeRange(new Date(booking.booking_modules[0]!.start_time), new Date(booking.booking_modules[0]!.end_time))}
                                        </div>
                                        <div className={styles.timeRangeTag}>
                                            <Tag
                                                size='medium'
                                                color='primary'
                                                text={getTimeRangeDurationInHours(
                                                    new Date(booking.booking_modules[0]!.start_time),
                                                    new Date(booking.booking_modules[0]!.end_time)) + ' ' + declensionOfHours(getTimeRangeDurationInHours(new Date(booking.booking_modules[0]!.start_time),
                                                    new Date(booking.booking_modules[0]!.end_time))
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <Icon name="calendar" size="extra-small" className={styles.icon} />
                                        <div className={styles.label}>{formatFullDate(new Date(booking.booking_modules[0]!.start_time))}</div>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <Icon
                                            name="location"
                                            size="extra-small"
                                            className={styles.icon}
                                        />
                                        <div className={styles.text}>
                                            {booking?.sector_scheme.sector.location.region},{' '}
                                            {booking?.sector_scheme.sector.location.city},{' '}
                                            {booking?.sector_scheme.sector.location.address}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className={styles.payment}>
                                <DecorateButton text={`Оплачено ${booking.total_price.formatted_value}`} />
                                <Button
                                    variant={'gray2'}
                                    onClick={() => navigate(Routes.BookingDetailsReceipt.replace(':id', booking.id.toString()))}
                                    disabled={booking.status.name === 'reserved'}
                                >
                                    <Icon name={'check2'} size='extra-small' />
                                    <span>Показать чек</span>
                                </Button>
                            </div>
                        </div>
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
});
