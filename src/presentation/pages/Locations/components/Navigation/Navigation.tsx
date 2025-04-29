import { FavoriteButton } from "./components/FavoriteButton";
import { ProfileButton } from "./components/ProfileButton";
import { SearchInput } from "@src/presentation/ui-kit/SearchInput";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { observer } from "mobx-react-lite";
import { locationsStore } from "@src/application/store/locationsStore";
import { useEffect, useState } from "react";
import { Button } from "@src/presentation/ui-kit/Button";
import styles from "./Navigation.module.css";

interface NavigationProps {
  onInputFocus: () => void;
  onInputBlur: () => void;
}

export const Navigation = observer(({ onInputFocus, onInputBlur }: NavigationProps) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(locationsStore.search);
  }, []);

  return (
    <div className={styles.navigation}>
      <FavoriteButton />
      <SearchInput
        placeholder="Поиск"
        rightContent={<Icon name="filter" size="small" />}
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onFocus={() => {
          setInputFocused(true);
          onInputFocus();
        }}
        onBlur={() => {
          setInputFocused(false)
          onInputBlur();
        }}
        onClear={() => {
          setSearchValue('');
          locationsStore.setSearch('');
        }}
        disabled={false}
      />
      {inputFocused || locationsStore.search !== searchValue ? (
        <Button
          variant="yellow"
          className={styles.searchButton}
          onClick={() => {
            // console.clear();
            locationsStore.setSearch(searchValue)
          }}
        >
          Найти
        </Button>
      ) : (
        <ProfileButton />
      )}
    </div>
  );
});
