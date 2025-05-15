import { Sheet } from 'react-modal-sheet';
import { RadioItem } from '@src/presentation/ui-kit/RadioItem';
import styles from "./PaymentBookingByCashier.module.css";
import { Button } from '@src/presentation/ui-kit/Button';
import { useState } from 'react';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { observer } from 'mobx-react-lite';

interface PaymentBookingByCashierProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
}

interface Option {
  id: string;
  label: string;
  status: boolean;
  disabled: boolean;
}

const options: Option[] = [
  {
    id: 'option1',
    label: 'Наличными',
    status: false,
    disabled: false,
  },
  {
    id: 'option2',
    label: 'Банковская карта',
    status: false,
    disabled: true,
  },
  {
    id: 'option3',
    label: 'СБП',
    status: false,
    disabled: true,
  },
];

export const PaymentBookingByCashier = observer(({ isOpen, onClose, bookingId }: PaymentBookingByCashierProps) => {
  const { isLoadingConfirmBooking } = bookingsStore;
  const [selectedOption, setSelectedOption] = useState('');

  if (!isOpen) return null;

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => onClose()}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className={styles.header}>
            <div className={styles.title}>Укажите способ оплаты</div>
          </div>
          <div className={styles.content}>
            {options.map((option) => {
              const { id, label, status } = option;

              return (
                <RadioItem
                  key={id}
                  id={id}
                  label={label}
                  selected={selectedOption}
                  status={status}
                  onClick={(id) => setSelectedOption(id)}
                />
              );
            })}
          </div>
          <div className={styles.footer}>
            <Button
              size="medium"
              variant="yellow"
              isLoading={isLoadingConfirmBooking.get(bookingId)}
              disabled={isLoadingConfirmBooking.get(bookingId)}
              onClick={() => bookingsStore.confirmBookingByCashier(bookingId, onClose)}
            >
              Заказать
            </Button>
            <Button
              size="medium"
              variant="tertiary"
              onClick={onClose}
            >
              Отмена
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
});
