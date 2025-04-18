import { FavoriteButton } from "./components/FavoriteButton";
import { ProfileButton } from "./components/ProfileButton";
import { SearchInput } from "@src/presentation/ui-kit/SearchInput";
import styles from "./Navigation.module.css";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { useState } from "react";

export const Navigation = () => {
  const [search, setSearch] = useState('');

  return (
    <div className={styles.navigation}>
      <FavoriteButton />
      <SearchInput
        placeholder="Поиск"
        rightContent={<Icon name="filter" size="small" />}
        value={search}
        onChange={setSearch}
        disabled={true}
      />
      <ProfileButton />
    </div>
  );
};
