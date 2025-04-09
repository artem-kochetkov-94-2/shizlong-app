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
import { Button } from "@src/presentation/ui-kit/Button";
import { DecorateButton } from "@src/presentation/components/DecorateButton";
import waves from "@src/assets/waves.png";
import styles from "./BookingDetails.module.css";
import { bookingCardStore } from "@src/application/store/bookingCardStore";
import { useEffect, useRef, useState } from "react";
import { paymentStore } from "@src/application/store/paymentStore";
import { bookingsStore } from "@src/application/store/bookingsStore";
import classNames from "classnames";
import { CancelBookingPanel } from "@src/presentation/components/CancelBookingPanel";

const bookingStatuses = {
  pending: 'активна',
  confirmed: 'оплачена',
  cancelled: 'Отменена',
  completed: 'отдых состоялся',
}

export const BookingDetails = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const timer = useRef<number | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const { startedProcessPayment } = paymentStore;
    const [isCancelOpen, setCancelOpen] = useState(false);

    useEffect(() => {
      bookingCardStore.setBookingId(Number(id));
    }, [id]);

    const { booking } = bookingCardStore;
    const { isLoadingProcessPayment } = paymentStore;

    useEffect(() => {
      if (!booking || booking.status !== 'reserved') {
        return;
      }

      if (!startedProcessPayment.has(Number(booking?.id))) {
        return;
      }

      const getStatus = async () => {
        try {
          setPaymentStatus('Ожидание оплаты...');
          const status = await bookingsStore.getPaymentStatus(Number(booking.id));
          console.log(status);

          if (status === 'processing') {
            timer.current = setTimeout(() => {
              getStatus();
            }, 2000);
            return;
          }

          if (status === 'complete') {
            setPaymentStatus('Оплата прошла успешно');
            bookingsStore.getMyBookings();
          }

          paymentStore.clearProcessPayment(Number(booking.id));
        } catch (e) {
          console.log(e);
        }
      }

      getStatus();

      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      }
    }, [booking, startedProcessPayment]);

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
                          {bookingStatuses[booking.status as keyof typeof bookingStatuses]}
                        </div>
                      </div>
                      <div className={styles.cardHeaderActions}>
                        {booking.status === 'cancelled' && (
                          <IconButton
                            size="medium"
                            shape="rounded"
                            iconName="cancel"
                            color="red"
                            iconColor="white"
                            iconSize="extra-small"
                          />
                        )}
                        {booking.status === 'completed' && (
                          <Icon size="medium" name="check4" />
                        )}
                        {(booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'reserved') && (
                          <IconButton
                            size="medium"
                            shape="rounded"
                            iconName="qr-code2"
                            iconColor="dark"
                            onClick={() => navigate(Routes.BookingDetailsQR.replace(':id', booking.id.toString()))}
                          />
                        )}
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
                              iconColor="dark"
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
                          <div className={styles.text}>
                            {booking?.module.sector.location.region},{' '}
                            {booking?.module.sector.location.city},{' '}
                            {booking?.module.sector.location.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className={styles.actions}>
                    {booking.status === 'reserved' && (
                      <Button
                        variant={'yellow'}
                        onClick={() => paymentStore.processPayment(booking.id)}
                        isLoading={isLoadingProcessPayment.get(booking.id)}
                        disabled={isLoadingProcessPayment.get(booking.id)}
                      >
                        <span>Оплатить</span>
                      </Button>
                    )}

                    {(booking.status === 'confirmed' || booking.status === 'reserved') && (
                      <Button variant={'gray2'} onClick={() => setCancelOpen(true)}>
                        <Icon name={'cancel'} size='extra-small' />
                        <span>Отменить</span>
                      </Button>
                    )}

                    {(booking.status === 'completed' || booking.status === 'cancelled') && (
                      <Button variant={'yellow'}>
                        <Icon name={'retry'} size='extra-small' />
                        <span>Повторить</span>
                      </Button>
                    )}

                    {booking.status === 'pending' && (
                      <Button variant={'gray2'}>
                        <Icon name={'stop'} size='extra-small' />
                        <span>Завершить</span>
                      </Button>
                    )}
                      
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
                    />
                  </div>

                    {paymentStatus && (
                      <Card>
                        <div className={classNames(styles.paymentStatus, {
                          // @todo
                          [styles.paymentStatusError]: paymentStatus === 'Ожидание оплаты...',
                          [styles.paymentStatusSuccess]: paymentStatus === 'Оплата прошла успешно'
                        })}>
                          <div className={styles.paymentStatusText}>{paymentStatus}</div>
                        </div>
                      </Card>
                    )}

                    <Features
                      title="Входящие модули"
                      items={[{
                        name: booking.module.name,
                        nameAccent: booking.module.number,
                        icon: booking.module.placed_icon.link_icon,
                        onClick: () => {
                          navigate(Routes.Sector.replace(':id', booking.module.sector.id.toString()) + `?module=${booking.module.id}`);
                        }
                      }]}
                    />

                    <Card>
                      <div className={styles.accessories}>
                        <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>
                        <div className={styles.accessoriesSubtitle}>входят в бронь</div>

                        <div className={styles.accessoriesContent}>
                          {booking.booking_accessories.map((accessory) => (
                            <div className={styles.accessoryWrapper}>
                              <div className={styles.accessory}>
                                <img
                                  src={accessory.beach_accessory.link_icon}
                                  alt={accessory.beach_accessory.name}
                                />
                                <div className={styles.accessoryName}>
                                  {accessory.beach_accessory.name}
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
                </div>

                  <div className={styles.payment}>
                    <DecorateButton text={`Оплачено ${booking.total_price.toLocaleString('ru-RU')} ₽`} />
                    <Button
                      variant={'gray2'}
                      onClick={() => navigate(Routes.BookingDetailsReceipt.replace(':id', booking.id.toString()))}
                    >
                      <Icon name={'check2'} size='extra-small' />
                      <span>Показать чек</span>
                    </Button>
                  </div>
              </Sheet.Scroller>
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