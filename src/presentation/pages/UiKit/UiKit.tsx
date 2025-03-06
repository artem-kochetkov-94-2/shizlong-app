import { Button } from '@src/presentation/ui-kit/Button';

import { icons } from '@src/presentation/ui-kit/Icon/const';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { IconName } from '@src/presentation/ui-kit/Icon/types';
import styles from './UiKit.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { StyledInput } from '@src/presentation/ui-kit/StyledInput';
import { useState } from 'react';
import { ReminderItem } from '@src/presentation/ui-kit/ReminderItem';

export const UiKit = () => {
  const [valueInput, setValueInput] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#fff',
        padding: '10px',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Card className={styles.background}>
        <div className={styles.uiKit}>
          {Object.entries(icons).map(([key]) => (
            <Icon key={key} name={key as IconName} />
          ))}
        </div>
      </Card>

      <Card className={styles.background}>
        <Button variant='primary' size='small'>
          Button
        </Button>
        <Button variant='primary'>Button</Button>
        <Button variant='primary' size='large'>
          Button
        </Button>
        <Button variant='primary' size='small' fullWidth={false}>
          Button
        </Button>
        <Button variant='primary' size='medium' fullWidth={false}>
          Button
        </Button>
        <Button variant='primary' size='large' fullWidth={false}>
          Button
        </Button>
      </Card>

      <Card className={styles.background}>
        <ReminderItem variant='default'>Незавершённый заказ</ReminderItem>
        <ReminderItem variant='primary' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='gray' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='orange' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='yellow' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='disabled' arrow>
          Незавершённый заказ
        </ReminderItem>
      </Card>

      <Card className={styles.background}>
        <StyledInput
          type={'text'}
          placeholder={'Инпут'}
          value={valueInput}
          onChange={setValueInput}
        />
      </Card>
    </div>
  );
};
