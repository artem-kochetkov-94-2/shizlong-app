import React, { useState } from 'react';
import styles from './About.module.css';
import { Card } from '@src/presentation/ui-kit/Card';

export const About: React.FC<{ title?: string, description?: string }> = ({
  title = "Описание",
  description = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const maxSymbols = 300;

  return (
    <Card>
      <div className={styles.about}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          {description.slice(0, isOpen ? description.length : maxSymbols)}
        </div>
        {description.length > maxSymbols && (
          <button className={styles.showMore} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Скрыть' : 'Показать всё'}
          </button>
        )}
      </div>
    </Card>
  );
};
