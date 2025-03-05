import React from 'react';
import styles from './StyledInput.module.css';
import cn from 'classnames';

interface StyledInputProps {
  placeholder?: string;
  value?: string;
  type: string;
  onChange?: (value: string) => void;
}

export const StyledInput = ({
  placeholder,
  value,
  type,
  onChange,
}: StyledInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        value={value}
        className={cn(styles.input, {
          [styles.inputFocused]: value,
        })}
        onChange={handleInputChange}
      />
      <label className={styles.label}>{placeholder} {value}</label>
    </div>
  );
};
