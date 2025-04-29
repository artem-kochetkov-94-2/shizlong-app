import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './SearchInput.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { IconButton } from '@src/presentation/ui-kit/IconButton';

interface SearchInputProps {
  placeholder?: string;
  rightContent?: React.ReactNode;
  withBorder?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'medium' | 'large';
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
}

export const SearchInput = ({
  placeholder,
  rightContent,
  withBorder,
  value,
  onChange,
  size = 'medium',
  disabled = false,
  onFocus,
  onBlur,
  onClear,
}: SearchInputProps) => {
  const [focused, setFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleSearch = () => {
    console.log('Поиск:', value);
  };

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  }

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  }

  return (
    <div className={classNames(styles.searchContainer, {
      [styles.notEmpty]: value,
      [styles.withBorder]: withBorder,
      [styles.large]: size === 'large',
      [styles.focused]: focused,
    })}>
      <Icon name="search" size="small" onClick={handleSearch} />
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles.searchInput}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {value && (
        <IconButton
          iconName="cross"
          size="small"
          iconSize="extra-small"
          onClick={onClear ? onClear : () => onChange?.('')}
          color="grayDark"
          iconColor="white"
        />
      )}
      {rightContent}
    </div>
  );
};
