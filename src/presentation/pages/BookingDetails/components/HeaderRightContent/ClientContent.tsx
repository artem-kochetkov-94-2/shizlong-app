import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Routes } from "@src/routes";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { RawBooking } from "@src/infrastructure/bookings/types";

interface ClientContentProps {
  booking: RawBooking;
}

export const ClientContent = ({ booking }: ClientContentProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.cardHeaderActions}>
      {booking.status.name === 'cancelled' && (
        <IconButton
          size="medium"
          shape="rounded"
          iconName="cancel"
          color="red"
          iconColor="white"
          iconSize="extra-small"
        />
      )}
      {booking.status.name === 'completed' && (
        <Icon size="medium" name="check4" />
      )}
      {(booking.status.name === 'pending' || booking.status.name === 'confirmed' || booking.status.name === 'busy' || booking.status.name === 'reserved') && (
        <IconButton
          size="medium"
          shape="rounded"
          iconName="qr-code2"
          iconColor="dark"
          onClick={() => navigate(Routes.BookingDetailsQR.replace(':id', booking.id.toString()))}
        />
      )}
    </div>
  );
};
