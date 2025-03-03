import { useNavigate } from 'react-router-dom';
import { IconButton } from '@presentation/ui-kit/IconButton';
import { Routes } from '@src/routes';

export const ProfileButton = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(Routes.Profile);
  };

  return (
    <IconButton iconName="profile" size="large" iconSize="small" onClick={handleProfileClick} />
  );
}; 