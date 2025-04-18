import React from 'react';
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
}

export const SearchInput = ({
  placeholder,
  rightContent,
  withBorder,
  value,
  onChange,
  size = 'medium',
  disabled = false,
}: SearchInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleSearch = () => {
    console.log('Поиск:', value);
  };

  return (
    <div className={classNames(styles.searchContainer, {
      [styles.notEmpty]: value,
      [styles.withBorder]: withBorder,
      [styles.large]: size === 'large'
    })}>
      <Icon name="search" size="small" onClick={handleSearch} />
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles.searchInput}
        disabled={disabled}
      />
      {value && (
        <IconButton
          iconName="cross"
          size="small"
          iconSize="extra-small"
          onClick={() => onChange?.('')}
        />
      )}
      {rightContent}
    </div>
  );
};
