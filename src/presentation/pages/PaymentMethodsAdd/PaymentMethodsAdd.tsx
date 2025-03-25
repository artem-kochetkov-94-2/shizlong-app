import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './PaymentsMethodsAdd.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { Button } from '@src/presentation/ui-kit/Button';
import { paymentStore } from '@src/application/store/paymentStore';
import { useEffect } from 'react';
import classNames from 'classnames';

export const PaymentMethodsAdd = () => {
  useEffect(() => {
    paymentStore.init();
  }, []);

  useEffect(() => {
    const formElement = document.getElementById('payment-form');

    const listener = async (event: Event) => {
      event.preventDefault();

      const additionalData = {
        holder_name: document.getElementById('cardholder-name')?.value,
      }
      
      await paymentStore.createToken(additionalData);
    }

    formElement?.addEventListener('submit', listener);
    return () => {
      formElement?.removeEventListener('submit', listener);
    };
  }, []);

  return (
    <>
      <PageHeader topPadding={true}>Добавление карты</PageHeader>

      <div className={styles.wrapper}>
        <div className={styles.title}>Укажите данные вашей карты</div>

        <Card>
          <form id="payment-form">
            <div className={styles.field}>
              <label className={classNames(styles.label)}>Name</label>
              <input id="cardholder-name" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={classNames(styles.label)}>Card Number</label>
              <div id="card-number" className={styles.input}></div>
            </div>
            <div className={styles.field}>
              <label className={classNames(styles.label)}>Expiration Date</label>
              <div id="exp-date" className={styles.input}></div>
            </div>
            <div className={styles.field}>
              <label className={classNames(styles.label)}>CVV</label>
              <div id="cvv" className={styles.input}></div>
            </div>
              <div className={styles.field}>
              <div id="user-agreement" className="input"></div>
            </div>

            <Button
              variant={'yellow'}
              type="submit"
              id="pay_button"
            >
              Добавить карту
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
