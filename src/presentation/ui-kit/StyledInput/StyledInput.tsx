import React from 'react';
import styles from './StyledInput.module.css';

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
        className={styles.input}
        onChange={handleInputChange}
      />
      <label className={styles.label}>{placeholder}</label>
    </div>
  );
};
