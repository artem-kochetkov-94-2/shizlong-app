import React, { useState } from 'react';
import styles from './Features.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { IconButton } from '@presentation/ui-kit/IconButton';
import { Icon } from '@presentation/ui-kit/Icon';

export interface FeatureItem {
  name: string;
  icon: string;
  extraTitle?: string;
  extraDescription?: string;
}

interface FeaturesProps {
  items: FeatureItem[];
  title: string;
  extraLength?: number;
}

export const Features: React.FC<FeaturesProps> = ({ items, title, extraLength = 5 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`${!isExpanded && styles.smallPadding}`}>
      <div className={styles.title}>{title} <span>{items.length}</span></div>

      <div>
        <ul className={styles.itemList}>
          {items.map(({ name, icon, extraTitle, extraDescription }, index) => {
            if (index >= extraLength && !isExpanded) return null;

            return (
              <li key={index} className={styles.item}>
                <div className={styles.itemContent}>
                  <IconButton shape="rounded" size="large">
                    <img src={icon} />
                  </IconButton>
                  <span className={styles.name}>{name}</span>
                </div>
              
                {(extraTitle || extraDescription) && (
                  <div className={styles.itemExtra}>
                    {extraTitle && <div className={styles.extraTitle}>{extraTitle}</div>}
                    {extraDescription && <div className={styles.extraDescription}>{extraDescription}</div>}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {items.length > extraLength && !isExpanded && (
        <button className={styles.button} onClick={() => setIsExpanded(true)}>
          <span>Показать все</span>
          <Icon name="arrow-bottom" size="extra-small" className={styles.arrow} />
        </button>
      )}
    </Card>
  );
};
