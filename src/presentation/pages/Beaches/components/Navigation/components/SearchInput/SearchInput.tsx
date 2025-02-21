import React, { useState } from 'react';
import styles from './SearchInput.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';

export const SearchInput = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Поиск:', query);
  };

  return (
    <div className={`${styles.searchContainer} ${query ? styles.notEmpty : ''}`}>
      <Icon name="search" size="small" onClick={handleSearch} />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Поиск"
        className={styles.searchInput}
      />
      <Icon name="filter" size="small" />
    </div>
  );
};
