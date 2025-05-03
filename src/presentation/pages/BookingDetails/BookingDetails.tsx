import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Routes } from "@src/routes";
import { Sheet } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { formatFullDate, formatTimeRange, getTimeRangeDurationInHours, declensionOfHours } from "@src/application/utils/formatDate";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Card } from "@src/presentation/ui-kit/Card";
import { Features } from "@src/presentation/components/Features";
import waves from "@src/assets/waves.png";
import styles from "./BookingDetails.module.css";
import { bookingCardStore } from "@src/application/store/bookingCardStore";
import { useEffect, useState } from "react";
import { CancelBookingPanel } from "@src/presentation/components/CancelBookingPanel";
import { HeaderRightContent } from "./components/HeaderRightContent";
import { Actions } from "./components/Actions";
import { profileStore } from "@src/application/store/profileStore";
import { Footer } from "./components/Footer";
import { Payment } from "./components/Payment";

const bookingStatuses = {
  busy: 'оплачена',
  confirmed: 'оплачена',
  cancelled: 'Отменена',
  completed: 'отдых состоялся',
}

export const BookingDetails = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { booking } = bookingCardStore;
    const { isCashier } = profileStore;

    const [isCancelOpen, setCancelOpen] = useState(false);

    useEffect(() => {
      bookingCardStore.setBookingId(Number(id));
    }, [id]);

    if (!booking) {
      return <div>Бронь не найдена</div>;
    }
  
    return (
      <>
        <Sheet
          isOpen={true}
          onClose={() => navigate(Routes.Locations)}
          detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Content>
              <div className={styles.header} style={{ backgroundImage: `url(${waves})` }} />
              <Sheet.Header />
              <Sheet.Scroller>
                <div className={styles.content}>
                  <Card className={styles.card}>
                    <div className={styles.cardHeader}>
                      <IconButton
                        size="medium"
                        shape="rounded"
                        iconName="arrow-left"
                        onClick={() => navigate(-1)}
                        withShadow={true}
                        color="white"
                        iconColor="dark"
                      />
                      <div className={styles.cardHeaderContent}>
                        <div className={styles.cardTitle}>Моя бронь</div>
                        <div className={styles.cardSubtitle}>
                          {bookingStatuses[booking.status.name as keyof typeof bookingStatuses]}
                        </div>
                      </div>

                      <HeaderRightContent booking={booking} />
                    </div>

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
                  </Card>

                  {isCashier ? null : (
                    <Actions booking={booking} setCancelOpen={setCancelOpen} />
                  )}

                  <Features
                    title="Входящие модули"
                    items={booking.booking_modules.map((module) => ({
                      name: module.module.name,
                      nameAccent: module.module.number ? `#${module.module.number}` : '',
                      icon: module.module.placed_icon?.link_icon ?? '',
                      onClick: () => {
                        navigate(Routes.Sector.replace(':id', booking.sector_scheme?.sector.id.toString() ?? '') + `?module=${module.module.id}`);
                      }
                    }))}
                  />

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

                  {isCashier && (
                    <div className={styles.payment}>
                      <Payment booking={booking} />
                    </div>
                  )}
                </div>
              </Sheet.Scroller>
              <Footer booking={booking} />
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>

        <CancelBookingPanel
          isOpen={isCancelOpen}
          onClose={() => setCancelOpen(false)}
          bookingId={booking.id}
        />
      </>
    );
});