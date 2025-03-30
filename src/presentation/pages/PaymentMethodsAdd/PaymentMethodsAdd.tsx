import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './PaymentsMethodsAdd.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { Button } from '@src/presentation/ui-kit/Button';
import { paymentStore } from '@src/application/store/paymentStore';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

type DirtyFields = {
  cardNumber: boolean;
  expiry: boolean;
  cvv: boolean;
}

type FocusedFields = {
  cardNumber: boolean;
  expiry: boolean;
  cvv: boolean;
}

export const PaymentMethodsAdd = observer(() => {
  const { cardNumber, expiry, cvv, isAddingNewCard } = paymentStore;
  const [focused, setFocused] = useState<FocusedFields>({
    cardNumber: false,
    expiry: false,
    cvv: false,
  });
  const [dirtyFields, setDirtyFields] = useState<DirtyFields>({
    cardNumber: false,
    expiry: false,
    cvv: false,
  });

  useEffect(() => {
    paymentStore.init();
  }, []);

  useEffect(() => {
    const formElement = document.getElementById('payment-form');

    const listener = async (event: Event) => {
      event.preventDefault();

      const additionalData = {
        // @ts-ignore
        holder_name: document.getElementById('cardholder-name')?.value,
      }
      
      await paymentStore.addNewCard(additionalData);
    }

    formElement?.addEventListener('submit', listener);
    return () => {
      formElement?.removeEventListener('submit', listener);
    };
  }, []);

  useEffect(() => {
    if (!cardNumber) return;
    
    cardNumber.on('change', () => {
      setDirtyFields((prev) => ({ ...prev, cardNumber: true }));
    })
    
    cardNumber.on('focus', () => {
      setFocused((prev) => ({ ...prev, cardNumber: true }));
    })
    
    cardNumber.on('blur', () => {
      setFocused((prev) => ({ ...prev, cardNumber: false }));
    })
  }, [cardNumber]);

  useEffect(() => {
    if (!expiry) return;
    
    expiry.on('change', () => {
      setDirtyFields((prev) => ({ ...prev, expiry: true }));
    })
    
    expiry.on('focus', () => {
      setFocused((prev) => ({ ...prev, expiry: true }));
    })
    
    expiry.on('blur', () => {
      setFocused((prev) => ({ ...prev, expiry: false }));
    })
  }, [expiry]);

  useEffect(() => {
    if (!cvv) return;
    
    cvv.on('change', () => {
      setDirtyFields((prev) => ({ ...prev, cvv: true }));
    })
    
    cvv.on('focus', () => {
      setFocused((prev) => ({ ...prev, cvv: true }));
    })
    
    cvv.on('blur', () => {
      setFocused((prev) => ({ ...prev, cvv: false }));
    })
  }, [cvv]);

  const isCardNumberFocused = focused.cardNumber || dirtyFields.cardNumber;
  const isExpiryFocused = focused.expiry || dirtyFields.expiry;
  const isCvvFocused = focused.cvv || dirtyFields.cvv;

  return (
    <>
      <PageHeader topPadding={true}>Добавление карты</PageHeader>

      <div className={styles.wrapper}>
        <div className={styles.title}>Укажите данные вашей карты</div>

        <Card boxShadow={true}>
          <form id="payment-form">
            <div className={styles.field}>
              <label className={classNames(styles.label, { [styles.focused]: isCardNumberFocused })}>Номер карты</label>
              <div id="card-number" className={classNames(styles.inputWrapper, styles.cardNumber)}></div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={classNames(styles.label, { [styles.focused]: isExpiryFocused })}>Действует до</label>
                <div id="exp-date" className={styles.inputWrapper}></div>
              </div>
              <div className={styles.field}>
                <label className={classNames(styles.label, { [styles.focused]: isCvvFocused })}>CVV</label>
                <div id="cvv" className={styles.inputWrapper}></div>
              </div>
            </div>
            <div className={styles.field}>
              <label className={classNames(styles.label, { [styles.focused]: isCardNumberFocused })}>Name</label>
              <input id="cardholder-name" className={styles.inputWrapper} />
            </div>
            <div className={styles.field}>
              <div id="user-agreement" className="input"></div>
            </div>

            <Button
              variant={'yellow'}
              type="submit"
              id="pay_button"
              isLoading={isAddingNewCard}
              disabled={isAddingNewCard}
              withShadow={true}
            >
              Добавить карту
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
});
