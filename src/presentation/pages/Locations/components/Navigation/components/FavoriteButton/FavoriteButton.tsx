import { IconButton } from "@presentation/ui-kit/IconButton";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";

export const FavoriteButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      iconName="favorite-outline"
      size="large"
      onClick={() => navigate(Routes.Favorites)}
    />
  );
};
