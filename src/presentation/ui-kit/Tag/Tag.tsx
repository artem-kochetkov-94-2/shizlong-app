import styles from './Tag.module.css';
import classNames from 'classnames';

interface TagProps {
  text: string;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'gray';
}

export const Tag = ({ text, size = 'small', color = 'primary' }: TagProps) => {
  return (
    <div className={classNames(styles.tag, styles[size], styles[color])}>{text}</div>
  );
};
