import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './PaymentsMethods.module.css';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Card } from '@src/presentation/ui-kit/Card';
import { paymentStore } from '@src/application/store/paymentStore';

export const PaymentMethods = observer(() => {
  const navigate = useNavigate();
  const { tokens } = paymentStore;

  return (
    <div className={styles.container}>
      <PageHeader topPadding={true}>Способы оплаты</PageHeader>

      <div className={styles.content}>
        {tokens.length > 0 ? (
          <>
            {tokens.map((token) => (
              <Card key={token.id}>
                <div className={styles.header}>
                  <div className={styles.circle} />
                  <div className={styles.text}>На банковскую карту</div>
                  <Icon
                    name={'check4'}
                    size={'small'}
                  />
                </div>

                <div className={styles.tokens}>
                  <div className={styles.token}>
                    **** **** **** {token.card_number}
                  </div>
                </div>

                <Button
                  variant={'secondary'}
                  onClick={() => paymentStore.deleteToken(token.id)}
                  className={styles.button}
                >
                  Удалить карту
                </Button>
              </Card>
            ))}
          </>
        ) : (
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
          className={styles.button}
        >
          Добавить карту
        </Button>
      </div>
    </div>
  );
});
