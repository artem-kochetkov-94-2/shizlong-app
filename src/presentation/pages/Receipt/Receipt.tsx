import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './Receipt.module.css';
import { DrawerV2 } from '@src/presentation/ui-kit/DrawerV2';
import { Card } from '@src/presentation/ui-kit/Card';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { DecorateButton } from '@src/presentation/components/DecorateButton';

export const Receipt = () => {
  return (
    <div className={styles.receipt}>
      <DrawerV2 overflowHeight={79} overlay={false}>
        <PageHeader>Показать чек</PageHeader>
        <div className={styles.container}>
          <Card>
            <div className={styles.header}>Шезлонгер</div>
            <div className={styles.paragraph}>Чек по операции</div>
            <div className={styles.paragraph}>3 июля 2025 15:22:42 (МСК)</div>
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
              <div className={styles.info}>3 600 ₽</div>
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
              <div className={styles.info}>Любая дополнительная информация о платеже</div>
            </div>
            <DecorateButton text={'Оплачено 3 600 ₽'} />
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
      </DrawerV2>
    </div>
  );
};
