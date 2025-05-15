import { profileStore } from "@src/application/store/profileStore";
import { observer } from "mobx-react-lite";
import styles from "./Footer.module.css";
import { RawBooking, RawCashierBooking } from "@src/infrastructure/bookings/types";
import { Payment } from "../Payment";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Routes } from "@src/routes";
import { Button } from "@src/presentation/ui-kit/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { CancelBookingPanel } from "@src/presentation/components/CancelBookingPanel";

interface FooterProps {
    booking: RawBooking | RawCashierBooking;
}

export const Footer = observer(({ booking }: FooterProps) => {
    const navigate = useNavigate();
    const { isCashier } = profileStore;
    const [isCancelOpen, setCancelOpen] = useState(false);
    const { isLoadingCancelBooking } = bookingsStore;

    return (
        <div className={styles.footer}>
            {isCashier ? (
                <>
                    {(booking.status.name !== 'cancelled' && booking.status.name !== 'completed') && (
                        <Button
                            variant={'gray2'}
                            onClick={() => setCancelOpen(true)}
                            isLoading={isLoadingCancelBooking.get(booking.id)}
                            disabled={isLoadingCancelBooking.get(booking.id)}
                        >
                            <Icon name={'cancel'} size='extra-small' />
                            <span>Отменить</span>
                        </Button>
                    )}

                    <Button
                        variant={'gray2'}
                        onClick={() => navigate(Routes.Sector.replace(':id', booking.sector_scheme?.sector.id.toString() ?? '') + '?show-booking-details=true')}
                    >
                        <Icon name={'location-flag'} size='extra-small' />
                        <span>На сектор</span>
                    </Button>

                    <CancelBookingPanel
                        isOpen={isCancelOpen}
                        onClose={() => setCancelOpen(false)}
                        bookingId={booking.id}
                    />
                </>
            ) : (
                <Payment booking={booking as RawBooking} />
            )}
            
        </div>
    )
});
