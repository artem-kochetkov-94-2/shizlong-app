import styles from './Tag.module.css';

interface TagProps {
  text: string;
  size?: 'small' | 'medium';
}

export const Tag = ({ text, size = 'small' }: TagProps) => {
  return <div className={`${styles.tag} ${styles[size]}`}>{text}</div>
};