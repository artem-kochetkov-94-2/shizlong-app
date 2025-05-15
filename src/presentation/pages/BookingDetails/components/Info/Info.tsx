import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { formatFullDate, formatTimeRange, getTimeRangeDurationInHours, declensionOfHours } from "@src/application/utils/formatDate";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { bookingCardStore } from "@src/application/store/bookingCardStore";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Routes } from "@src/routes";
import styles from './Info.module.css';

export const Info = observer(() => {
  const navigate = useNavigate();
  const { booking } = bookingCardStore;

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardBodyHeader}>
        <div className={styles.cardBodyHeaderRow}>
          <div className={styles.cardBodyHeaderCol}>
            <div className={styles.cardBodyHeaderTitle}>пляж</div>
            <div className={styles.cardBodyHeaderSubtitle}>
              {booking?.sector_scheme?.sector.location.name}
            </div>
            <div className={styles.cardBodyHeaderText}>
              {booking?.sector_scheme?.sector.name}
            </div>
          </div>
          <div className={styles.cardBodyHeaderCol}>
            <IconButton
              size="medium"
              shape="rounded"
              iconName="arrow-right"
              onClick={() => navigate(Routes.Location.replace(':id', booking?.sector_scheme?.sector.location.id.toString() ?? ''))}
              withShadow={true}
              color="white"
              iconColor="dark"
            />
          </div>
        </div>
      </div>

      <div className={styles.contacts}>
        <div className={styles.contactItem}>
          <Icon name="time" size="extra-small" className={styles.icon} />
          <div className={styles.label}>
            {formatTimeRange(
              new Date(booking.booking_modules[0]!.start_time),
              new Date(booking.booking_modules[0]!.end_time)
            )}
          </div>
          <div className={styles.timeRangeTag}>
            <Tag
              size='medium'
              color='primary'
              text={
                getTimeRangeDurationInHours(
                  new Date(booking.booking_modules[0]!.start_time),
                  new Date(booking.booking_modules[0]!.end_time)
                ) + ' ' + declensionOfHours(
                  getTimeRangeDurationInHours(
                    new Date(booking.booking_modules[0]!.start_time),
                    new Date(booking.booking_modules[0]!.end_time)
                  )
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
            {booking?.sector_scheme?.sector.location.region},{' '}
            {booking?.sector_scheme?.sector.location.city},{' '}
            {booking?.sector_scheme?.sector.location.address}
          </div>
        </div>
      </div>
    </div>
  );
});