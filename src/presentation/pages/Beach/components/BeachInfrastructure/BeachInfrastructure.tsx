import React from 'react';
import styles from './BeachInfrastructure.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { Icon } from '@presentation/ui-kit/Icon';
import { IconName } from '@presentation/ui-kit/Icon/types';

interface InfrastructureItem {
  name: string;
  icon: string;
}

interface BeachInfrastructureProps {
  items: InfrastructureItem[];
}

export const BeachInfrastructure: React.FC<BeachInfrastructureProps> = ({ items }) => {
  return (
    <Card>
      <div className={styles.infrastructure}>
        <h3 className={styles.title}>Пляжная инфраструктура</h3>
        <ul className={styles.itemList}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <Icon name={item.icon as IconName} size="small" className={styles.icon} />
              <span className={styles.name}>{item.name}</span>
            </li>
          ))}
        </ul>
        <button className={styles.showMore}>Показать всё</button>
      </div>
    </Card>
  );
}; 