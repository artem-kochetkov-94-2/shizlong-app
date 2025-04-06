import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './BookingDetailsReceipt.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { DecorateButton } from '@src/presentation/components/DecorateButton';
import { Sheet } from 'react-modal-sheet';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingCardStore } from '@src/application/store/bookingCardStore';
import { useEffect } from 'react';
import { formatFullDateWithTime } from '@src/application/utils/formatDate';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { observer } from 'mobx-react-lite';

export const BookingDetailsReceipt = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    bookingCardStore.fetchBooking(Number(id));
  }, [id]);

  const { bookings } = bookingsStore;
  const booking = bookings.find(b => b.id === Number(id));

  if (!booking) {
    return <div>Бронь не найдена</div>;
  }

  return (
    <Sheet
      isOpen={true}
      onClose={() => navigate(-1)}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <PageHeader>Показать чек</PageHeader>
          <Sheet.Scroller>
            <div className={styles.receipt}>
              <div className={styles.container}>
                <Card>
                  <div className={styles.header}>Шезлонгер</div>
                  <div className={styles.paragraph}>Чек по операции</div>
                  <div className={styles.paragraph}>{formatFullDateWithTime(new Date(booking.created_at))}</div>
                  <hr />
                  <div className={styles.wrapper}>
                    <div className={styles.subHeader}>Операция </div>
                    <div className={styles.info}>Оплата услуг</div>
                    <div className={styles.subHeader}>ФИО плательщика</div>
                    <div className={styles.info}>Иванов Иван Иванович</div>
                    <div className={styles.subHeader}>Телефон плательщика</div>
                    <div className={styles.info}>+7 (982) 247-52-44</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.subHeader}>Получатель</div>
                    <div className={styles.info}>ООО «Шезлонгер»</div>
                    <div className={styles.subHeader}>Сумма платежа</div>
                    <div className={styles.info}>{booking.total_price.toLocaleString('ru-RU')} ₽</div>
                    <div className={styles.subHeader}>Комиссия</div>
                    <div className={styles.info}>0,00 ₽</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.subHeader}>Номер документа</div>
                    <div className={styles.info}>1000000000000523291656</div>
                    <div className={styles.subHeader}>Код авторизации</div>
                    <div className={styles.info}>070304</div>
                  </div>
                  <hr />
                  <div className={styles.wrapper}>
                    <div className={styles.subHeader}>Дополнительная информация</div>

                    {/* <div className={styles.row}>
                      <div className={styles.col}>
                        <span className={styles.info}>{booking.module.name}</span>
                        <span className={styles.subHeader}>
                          {booking.module.toLocaleString('ru-RU')} ₽ × {booking.module.quantity} ед.
                        </span>
                      </div>
                      <div className={styles.col}>
                        <span className={styles.info}>
                          {(item.quantity * item.beach_accessory.price).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div> */}
                    
                    {booking.booking_accessories.map((item) => (
                      <div className={styles.row}>
                        <div className={styles.col}>
                          <span className={styles.info}>{item.beach_accessory.name}</span>
                          <span className={styles.subHeader}>{item.beach_accessory.price.toLocaleString('ru-RU')} ₽ × {item.quantity} ед.</span>
                        </div>
                        <div className={styles.col}>
                          <span className={styles.info}>{(item.quantity * item.beach_accessory.price).toLocaleString('ru-RU')} ₽</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.button}>
                    <DecorateButton
                      color='blue'
                      text={`Оплачено ${booking.total_price.toLocaleString('ru-RU')} ₽`}
                    />
                  </div>
                </Card>
              </div>
              <Card className={styles.card}>
                <Button variant={'gray2'}>
                  <Icon name={'save'} size='extra-small' /> Сохранить
                </Button>
                <Button variant={'gray2'}>
                  <Icon name={'send'} size='extra-small' />
                  Отправить
                </Button>
              </Card>
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
});
