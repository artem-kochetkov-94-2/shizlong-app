import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './PaymentsMethods.module.css';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';

export const PaymentMethods = () => {
  const navigate = useNavigate();

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
        <div className={styles.empty}>
          <div className={styles.info}>Вы ещё не добавили ни одной карты</div>
          <Icon
            name={'card2'}
            size={'medium'}
            className={styles.icon}
          />
        </div>

        <Button
          variant={'yellow'}
          onClick={() => navigate(Routes.PaymentMethodsAdd)}
        >
          Добавить карту
        </Button>
      </div>
    </>
  );
};
