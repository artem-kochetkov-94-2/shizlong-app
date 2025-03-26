import { ReactNode, useState } from 'react';
import cn from 'classnames';
import styles from './CheckBox.module.css';
import { Icon } from '../Icon';

interface CheckBoxProps {
  text?: ReactNode;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
}

export const CheckBox = ({ text, rightContent, leftContent }: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked(!checked);
  const id = `checkbox-${text}`;

  return (
    <label className={cn(styles.container)}>
      {leftContent && <div className={styles.leftContent}>{leftContent}</div>}
      {text && <div className={styles.text}>{text}</div>}
      {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
      <span
        className={cn(styles.customCheckbox, {
          [styles.checked]: checked,
        })}
      >
        {checked && <Icon name='check4' size={'small'} />}
      </span>
      <input
        type='checkbox'
        id={id}
        className={styles.checkbox}
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
};
