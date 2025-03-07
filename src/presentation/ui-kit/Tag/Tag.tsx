import { ReactNode } from 'react';
import styles from './Tag.module.css';
import classNames from 'classnames';

interface TagProps {
  text: ReactNode;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'gray' | 'default';
  rightContent?: ReactNode;
  leftContent?: ReactNode;
}

export const Tag = ({
  text,
  size = 'small',
  color = 'primary',
  rightContent,
  leftContent,
}: TagProps) => {
  return (
    <div className={classNames(styles.tag, styles[size], styles[color])}>
      {leftContent && <div className={styles.leftContent}>{leftContent}</div>}
      {text && <div className={styles.text}>{text}</div>}
      {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
    </div>
  );
};
