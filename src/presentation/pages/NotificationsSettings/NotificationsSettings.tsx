import { useState } from 'react';
import { items } from './const';
import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './NotificationsSettings.module.css';
import { RadioItem } from '@src/presentation/ui-kit/RadioItem';

export const NotificationsSettings = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <div className={styles.NotificationsSettings}>
      <PageHeader>Настройка уведомлений</PageHeader>
      <div className={styles.subHeader}>Выберите способ уведомления</div>

      <div className={styles.radioGroup}>
        {items.map(({ id, label, content, status, statusState, disabled }) => (
          <RadioItem
            key={id}
            id={id}
            label={label}
            selected={selected}
            status={status}
            statusState={statusState}
            onClick={() => setSelected(id)}
            disabled={disabled}
          >
            {content}
          </RadioItem>
        ))}
      </div>
    </div>
  );
};
