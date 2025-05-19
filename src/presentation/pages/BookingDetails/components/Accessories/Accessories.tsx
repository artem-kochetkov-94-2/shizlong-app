import { observer } from "mobx-react-lite";
import { bookingCardStore } from "@src/application/store/bookingCardStore";
import styles from './Accessories.module.css';
import { Card } from "@src/presentation/ui-kit/Card";

export const Accessories = observer(() => {
  const { booking } = bookingCardStore;

  return (
    <Card>
      <div className={styles.accessories}>
        <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>
        <div className={styles.accessoriesSubtitle}>входят в бронь</div>

        <div className={styles.accessoriesContent}>
          {booking.accessories.map((accessory) => (
            <div className={styles.accessoryWrapper}>
              <div className={styles.accessory}>
                <img
                  src={accessory.beach_accessory?.link_icon}
                  alt={accessory.beach_accessory?.name}
                />
                <div className={styles.accessoryName}>
                  {accessory.beach_accessory?.name}
                </div>
                <div className={styles.accessoryPrice}>
                  {accessory.quantity} ед.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
});