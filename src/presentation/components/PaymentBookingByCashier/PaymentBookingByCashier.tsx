import { Sheet } from 'react-modal-sheet';
import { RadioItem } from '@src/presentation/ui-kit/RadioItem';
import styles from "./PaymentBookingByCashier.module.css";
import { Button } from '@src/presentation/ui-kit/Button';
import { useState } from 'react';

interface PaymentBookingByCashierProps {
  isOpen: boolean;
  onClose: () => void;
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

export const PaymentBookingByCashier = ({ isOpen, onClose }: PaymentBookingByCashierProps) => {
  if (!isOpen) return null;
  const [selectedOption, setSelectedOption] = useState('');

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
              // disabled={isCreatingBooking}
              // isLoading={isCreatingBooking}
              // onClick={createBooking}
            >
              Заказать
            </Button>
            <Button
              size="medium"
              variant="tertiary"
              // disabled={isCreatingBooking}
              // isLoading={isCreatingBooking}
              // onClick={createBooking}
            >
              Отмена
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
