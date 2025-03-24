import React, { useState } from 'react';
import styles from './Features.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { Icon } from '@src/presentation/ui-kit/Icon';
import cn from 'classnames';

export interface FeatureItem {
  name: string;
  nameAccent?: string;
  icon: string;
  extraTitle?: string;
  extraDescription?: string;
  onClick?: () => void;
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
          {items.map(({ name, icon, extraTitle, extraDescription, nameAccent, onClick }, index) => {
            if (index >= extraLength && !isExpanded) return null;

            return (
              <li key={index} className={cn(styles.item, { [styles.clickable]: !!onClick })} onClick={onClick}>
                <div className={styles.itemContent}>
                  <div className={styles.imageWrapper}>
                    <img src={icon} />
                  </div>
                  <span className={styles.name}>
                    {name}
                    {nameAccent && <span className={styles.nameAccent}>{" "}{nameAccent}</span>}
                  </span>
                </div>
              
                {(extraTitle || extraDescription) && (
                  <div className={styles.itemExtra}>
                    {extraTitle && <div className={styles.extraTitle}>{extraTitle}</div>}
                    {extraDescription && <div className={styles.extraDescription}>{extraDescription}</div>}
                  </div>
                )}

                {onClick && (
                  <div className={styles.itemArrow}>
                    <Icon name="arrow-right" size="extra-small" />
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
