import React from 'react';
import styles from './Contacts.module.css';
import { Icon } from '@presentation/ui-kit/Icon';
import { Card } from '@src/presentation/ui-kit/Card';
import { IconName } from '@src/presentation/ui-kit/Icon/types';

export const Contacts: React.FC = () => {
  const items = [
    {
      icon: "location",
      label: "Адрес",
      text: 'Краснодарский край, Сочи, микрорайон Центральный'
    },
    {
      icon: "time",
      label: "Время работы",
      text: 'с 9:00 до 21:00'
    },
    {
      icon: "calendar",
      label: "Период работы",
      text: 'С 1 мая по 30 сентября'
    }
  ];

  return (
    <Card>
      <div className={styles.contacts}>
        {items.map(({ icon, label, text }) => (
          <div className={styles.contactItem}>
            <Icon name={icon as IconName} size="extra-small" className={styles.icon} />
            <div>
              <div className={styles.label}>{label}</div>
              <div className={styles.text}>{text}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
