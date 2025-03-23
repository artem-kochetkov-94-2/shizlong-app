import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Routes } from "@src/routes";
import { Sheet } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookingDetails.module.css";
// import { Card } from "@src/presentation/ui-kit/Card";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { formatFullDate, formatTimeRange, getTimeRangeDurationInHours, declensionOfHours } from "@src/application/utils/formatDate";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Card } from "@src/presentation/ui-kit/Card";
// import { Tag } from "@src/presentation/ui-kit/Tag";
// import { Icon } from "@src/presentation/ui-kit/Icon";
// import { formatFullDate, formatTimeRange, getTimeRangeDurationInHours, declensionOfHours } from "@src/application/utils/formatDate";
// import { Button } from "@src/presentation/ui-kit/Button";
// import { DecorateButton } from "@src/presentation/components/DecorateButton";

export const BookingDetails = observer(() => {
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
                    <div className={styles.content}>
                        <Card className={styles.card}>
                            <div className={styles.cardHeader}>
                                <IconButton
                                    size="medium"
                                    shape="rounded"
                                    iconName="arrow-left"
                                    onClick={() => navigate(Routes.Locations)}
                                    withShadow={true}
                                    color="white"
                                />
                                <div className={styles.cardHeaderContent}>
                                    <div className={styles.cardTitle}>Моя бронь</div>
                                    <div className={styles.cardSubtitle}>оплачена</div>
                                </div>
                                <div className={styles.cardHeaderActions}>
                                    <IconButton
                                        size="medium"
                                        shape="rounded"
                                        iconName="qr-code2"
                                    />
                                </div>
                            </div>

                            <div className={styles.cardBody}>
                                <div className={styles.cardBodyHeader}>
                                    <div className={styles.cardBodyHeaderRow}>
                                        <div className={styles.cardBodyHeaderCol}>
                                            <div className={styles.cardBodyHeaderTitle}>пляж</div>
                                            <div className={styles.cardBodyHeaderSubtitle}>
                                                {booking?.module.sector.location.name}
                                            </div>
                                            <div className={styles.cardBodyHeaderText}>
                                                {booking?.module.sector.name}
                                            </div>
                                        </div>
                                        <div className={styles.cardBodyHeaderCol}>
                                            <IconButton
                                                size="medium"
                                                shape="rounded"
                                                iconName="arrow-right"
                                                onClick={() => navigate(Routes.Location.replace(':id', booking?.module.sector.location.id.toString()))}
                                                withShadow={true}
                                                color="white"
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                        <div>
                                            {booking?.module.sector.location.region}
                                            {booking?.module.sector.location.city}
                                            {booking?.module.sector.location.address}
                                        </div>
                                        <div className={styles.text}>Краснодарский край, Сочи, микрорайон Центральный</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* <div className={styles.header}>
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
                    </div> */}
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
});
