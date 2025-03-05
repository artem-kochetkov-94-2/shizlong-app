import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './PaymentsMethods.module.css';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';

export const PaymentMethods = () => {
  return (
    <>
      <PageHeader>Способы оплаты</PageHeader>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.circle} />
          <div className={styles.text}>На банковскую карту</div>
          <Icon name={'check4'} size={'medium'} />
        </div>
        <div className={styles.empty}>
          <div className={styles.info}>Вы ещё не добавили ни одной карты</div>
          <Icon name={'card'} size={'large'} className={styles.icon} />
        </div>
        <Button variant={'yellow'}>Добавить карту</Button>
      </div>
    </>
  );
};
