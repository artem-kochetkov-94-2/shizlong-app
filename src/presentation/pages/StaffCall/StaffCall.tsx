import { DrawerV2 } from '@src/presentation/ui-kit/DrawerV2';
import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import { CheckBoxes } from '@src/presentation/ui-kit/CheckBox/CheckBoxes';
import { CheckBox } from '@src/presentation/ui-kit/CheckBox';
import { Card } from '@src/presentation/ui-kit/Card';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Button } from '@src/presentation/ui-kit/Button';
import styles from './StaffCall.module.css';
import { useState } from 'react';

export const StaffCall = () => {
  const [staffCall, setStaffCall] = useState(false);

  return (
    <div className={styles.staffCall}>
      <DrawerV2 overflowHeight={79} overlay={false}>
        <PageHeader subHeader={'Сектор #2 пляжа Ривьера'}>Вызов сотрудника</PageHeader>
        <div className={styles.info}>
          <Icon name={'beachFilter'} />
          <div className={styles.text}>Одиночный шезлонг деревянный</div>
          <span>#32</span>
        </div>
        <div className={styles.info}>
          <Icon name={'beachFilter'} />
          <div className={styles.text}>Одиночный шезлонг пластиковый</div>
          <span>#18</span>
        </div>
        <div className={styles.subHeader}>Причина вызова</div>
        <CheckBoxes>
          <CheckBox text={'Получить акссесуары'} />
          <CheckBox text={'Уборка территории'} />
          <CheckBox text={'Неисправность шезлонга'} />
        </CheckBoxes>
        <div className={styles.wrapper}>
          <Card>
            <div className={styles.comment}>Комментарии</div>
            <textarea className={styles.commentInput} placeholder='Введите текст' />
          </Card>
        </div>
        <Card>
          {staffCall && (
            <Button variant={'yellow'} onClick={() => setStaffCall(true)}>
              Отправить и вызвать
            </Button>
          )}
          {!staffCall && (
            <div className={styles.buttons}>
              <Button variant={'gray2'} disabled>
                Сотрудник вызван
              </Button>
              <Button variant={'gray2'}>Отмена</Button>
            </div>
          )}
        </Card>
      </DrawerV2>
    </div>
  );
};
