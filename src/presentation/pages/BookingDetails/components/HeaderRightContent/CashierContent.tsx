import { Icon } from '@src/presentation/ui-kit/Icon';
import styles from './styles.module.css';
import { RawBooking } from "@src/infrastructure/bookings/types";

interface CashierContentProps {
  booking: RawBooking;
}

export const CashierContent = ({ booking }: CashierContentProps) => {
  return (
    <div className={styles.cardHeaderActions}>
        <div className={styles.customer}>
            <div className={styles.customerName}>{booking.customer.name}</div>
            <div className={styles.customerPhone}>
                <Icon name="phone" size="extra-small" />
                <span>{booking.customer.phone}
            </span>
            </div>
        </div>
    </div>
  );
};

