import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './Tag.module.css';
interface TagProps {
  text: ReactNode;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'gray' | 'default';
  rightContent?: ReactNode;
  leftContent?: ReactNode;
  shadow?: boolean;
}

export const Tag = ({
  text,
  size = 'small',
  color = 'primary',
  rightContent,
  leftContent,
  shadow,
}: TagProps) => {
  return (
    <div className={cn(styles.tag, styles[size], styles[color], { [styles.shadow]: shadow })}>
      {leftContent && <div className={styles.leftContent}>{leftContent}</div>}
      {text && <div className={styles.text}>{text}</div>}
      {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
    </div>
  );
};
