import { useState } from 'react';
import { items } from './const';
import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './NotificationsSettings.module.css';

export const NotificationsSettings = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.NotificationsSettings}>
      <PageHeader>Настройка уведомлений</PageHeader>
      <div className={styles.subHeader}>Выберите способ уведомления</div>
      <div className={styles.radioGroup}>
        {items.map(({ id, label, content }) => (
          <div key={id} className={styles.radioItem} onClick={() => setSelected(id)}>
            <label htmlFor={id} className={styles.radioLabel}>
              <div className={styles.checkContainer}>
                <input
                  type='radio'
                  id={id}
                  name='radio'
                  className={styles.radioInput}
                  defaultChecked={selected === id}
                />
                <span className={`${selected === id ? styles.open : ''}`}>{label}</span>
              </div>
              {selected === id && <span className={styles.status}>Установите приложение</span>}
            </label>
            <div className={`${styles.expandableContent} ${selected === id ? styles.open : ''}`}>
              {selected === id && content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
