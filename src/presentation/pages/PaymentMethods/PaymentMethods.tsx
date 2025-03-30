import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './PaymentsMethods.module.css';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '@src/application/store/userStore';

export const PaymentMethods = observer(() => {
  const navigate = useNavigate();
  const { tokens } = userStore.paymentStore;

  return (
    <>
      <PageHeader topPadding={true}>Способы оплаты</PageHeader>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.circle} />
          <div className={styles.text}>На банковскую карту</div>
          <Icon
            name={'check4'}
            size={'small'}
          />
        </div>

        {tokens.length > 0 && (
          <div className={styles.tokens}>
            {tokens.map((token) => (
              <div className={styles.token}>
                **** **** **** {token.card_number}
              </div>
            ))}
          </div>
        )}

        {tokens.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.info}>Вы ещё не добавили ни одной карты</div>
            <Icon
              name={'card2'}
              size={'medium'}
              className={styles.icon}
            />
          </div>
        )}

        <Button
          variant={'yellow'}
          onClick={() => navigate(Routes.PaymentMethodsAdd)}
        >
          Добавить карту
        </Button>
      </div>
    </>
  );
});
