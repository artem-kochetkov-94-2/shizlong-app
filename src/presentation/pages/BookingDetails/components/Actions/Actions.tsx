import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { observer } from "mobx-react-lite";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Button } from "@src/presentation/ui-kit/Button";
import styles from "./Actions.module.css";
import { paymentStore } from "@src/application/store/paymentStore";
import { RawBooking } from "@src/infrastructure/bookings/types";
import classNames from "classnames";
import { Card } from "@src/presentation/ui-kit/Card";
import { shareLink } from "@src/application/utils/shareLink";
import { Routes } from "@src/routes";

interface ActionsProps {
    booking: RawBooking;
    setCancelOpen: (open: boolean) => void;
}

export const Actions = observer(({ booking, setCancelOpen }: ActionsProps) => {
    const { isLoadingProcessPayment, isPaymentError, isPaymentSuccess } = paymentStore;

    const hasPaymentStatus =
        isLoadingProcessPayment.has(booking.id)
        || isPaymentError.has(booking.id)
        || isPaymentSuccess.has(booking.id);

    return (
        <>
            <div className={styles.actions}>
                {booking.status.name === 'reserved' && (
                    <Button
                        variant={'yellow'}
                        onClick={() => paymentStore.processPayment(booking.id)}
                        isLoading={isLoadingProcessPayment.has(booking.id)}
                        disabled={isLoadingProcessPayment.has(booking.id)}
                        withShadow={true}
                    >
                        <span>Оплатить</span>
                    </Button>
                )}

                {(booking.status.name === 'confirmed' || booking.status.name === 'busy' || booking.status.name === 'reserved') && (
                    <Button variant={'gray2'} onClick={() => setCancelOpen(true)} withShadow={true}>
                        <Icon name={'cancel'} size='extra-small' />
                        <span>Отменить</span>
                    </Button>
                )}

                {(booking.status.name === 'completed' || booking.status.name === 'cancelled') && (
                    <Button variant={'yellow'} withShadow={true}>
                        <Icon name={'retry'} size='extra-small' />
                        <span>Повторить</span>
                    </Button>
                )}

                {/* {booking.status.name === 'pending' && (
                    <Button variant={'gray2'} withShadow={true}>
                        <Icon name={'stop'} size='extra-small' />
                        <span>Завершить</span>
                    </Button>
                )} */}
                    
                <IconButton
                    size="large"
                    shape="rounded"
                    iconName="location-flag"
                    iconColor="dark"
                    color="white"
                />
                <IconButton
                    size="large"
                    shape="rounded"
                    iconName="route"
                    iconColor="dark"
                    color="white"
                />
                <IconButton
                    size="large"
                    shape="rounded"
                    iconName="in-map"
                    iconColor="dark"
                    iconSize="small"
                    color="white"
                    onClick={() => shareLink(Routes.Location.replace(':id', (booking.sector_scheme?.sector?.location_id ?? '')))}
                />
            </div>

            {hasPaymentStatus && (
                <Card>
                    <div className={classNames(styles.paymentStatus, {
                        [styles.paymentStatusProcess]: isLoadingProcessPayment.has(booking.id),
                        [styles.paymentStatusSuccess]: isPaymentSuccess.has(booking.id),
                        [styles.paymentStatusError]: isPaymentError.has(booking.id)
                    })}>
                        <div className={styles.paymentStatusText}>
                            {isLoadingProcessPayment.has(booking.id)
                                ? 'Ожидание оплаты...'
                                : isPaymentError.has(booking.id)
                                    ? 'Ошибка оплаты'
                                    : 'Оплата прошла успешно'
                                }
                        </div>
                    </div>
                </Card>
            )}
        </>
    )
});
