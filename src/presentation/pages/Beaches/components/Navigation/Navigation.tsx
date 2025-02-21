import { FavoriteButton } from "./components/FavoriteButton";
import { ProfileButton } from "./components/ProfileButton";
import { SearchInput } from "./components/SearchInput";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <FavoriteButton />
      <SearchInput />
      <ProfileButton />
    </div>
  );
};
