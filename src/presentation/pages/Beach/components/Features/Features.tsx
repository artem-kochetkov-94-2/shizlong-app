import React from 'react';
import styles from './Features.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { Icon } from '@presentation/ui-kit/Icon';
import { IconName } from '@presentation/ui-kit/Icon/types';

interface FeatureItem {
  name: string;
  icon: string;
}

interface FeaturesProps {
  items: FeatureItem[];
}

export const Features: React.FC<FeaturesProps> = ({ items }) => {
  return (
    <Card>
      <div className={styles.features}>
        <h3 className={styles.title}>Особенности</h3>
        <ul className={styles.itemList}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <Icon name={item.icon as IconName} size="small" className={styles.icon} />
              <span className={styles.name}>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}; 