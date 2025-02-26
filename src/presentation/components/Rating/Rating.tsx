import React from 'react';
import styles from './Rating.module.css';
import { Icon } from '@presentation/ui-kit/Icon';

interface RatingProps {
  value: number;
  count: number;
  showCount: boolean;
}

function formatNumber(value: number): string {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'т';
  }
  return value.toString();
}

export const Rating: React.FC<RatingProps> = ({ value, count, showCount = true }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.rating}>
      {[...Array(fullStars)].map((_, i) => (
        <Icon key={`full-${i}`} name="star" size="extra-small" className={styles.fullStar} />
      ))}
      {halfStar && <Icon name="star" size="extra-small" className={styles.halfStar} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon key={`empty-${i}`} name="star" size="extra-small" className={styles.emptyStar} />
      ))}
      <span className={styles.value}>{value.toFixed(1)}</span>
      {showCount && <span className={styles.count}>({formatNumber(count)} оценок)</span>}
    </div>
  );
};
