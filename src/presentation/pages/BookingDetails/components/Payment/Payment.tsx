import { Button } from "@src/presentation/ui-kit/Button";
import { DecorateButton } from "@src/presentation/components/DecorateButton";
import { Routes } from "@src/routes";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { useNavigate } from "react-router-dom";
import { RawBooking } from "@src/infrastructure/bookings/types";

interface PaymentProps {
    booking: RawBooking;
}

export const Payment = ({ booking }: PaymentProps) => {
    const navigate = useNavigate();

    return (
        <>
            <DecorateButton text={`Оплачено ${booking.status.name === 'reserved' ? 0 : booking.total_price.formatted_value}`} />
            <Button
                variant={'gray2'}
                onClick={() => navigate(Routes.BookingDetailsReceipt.replace(':id', booking.id.toString()))}
                disabled={booking.status.name === 'reserved'}
            >
                <Icon name={'check2'} size='extra-small' />
                <span>Показать чек</span>
            </Button>
        </>
    )
}
