import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Routes } from "@src/routes";
import { Sheet } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
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
import { Info } from "./components/Info";
import { Accessories } from "./components/Accessories";
import { Button } from "@src/presentation/ui-kit/Button";

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
  const { isCashier, profile } = profileStore;
  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [isCancelOpen, setCancelOpen] = useState(false);

  useEffect(() => {
    bookingCardStore.setBookingId(Number(id));
  }, [id]);

  if (!booking) {
    return <div>Бронь не найдена</div>;
  }

  const isBookingCreatedByMe = booking.customer.id === profile?.id;

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

                  <Info />
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

                <Accessories />

                {isCashier && (
                  (booking.status.name === 'reserved' && isBookingCreatedByMe) ? (
                    <Button
                      variant="yellow"
                      // onClick={() => setCancelOpen(true)}
                      // isLoading={isLoadingCancelBooking.get(booking.id)}
                      // disabled={isLoadingCancelBooking.get(booking.id)}
                    >
                      <span>Оплатить</span>
                    </Button>
                  ) : (
                    <div className={styles.payment}>
                      <Payment booking={booking} />
                    </div>
                  )
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

      {/* {isCashier && (
        <PaymentBookingByCashier
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
        />
      )} */}
    </>
  );
});
