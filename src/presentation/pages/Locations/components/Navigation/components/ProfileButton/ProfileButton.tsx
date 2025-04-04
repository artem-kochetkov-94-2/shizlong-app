import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { verificationStore } from '@src/application/store/verificationStore';
import { Routes } from '@src/routes';
import { IconButton } from '@presentation/ui-kit/IconButton';

export const ProfileButton = observer(() => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(verificationStore.isVerified ? Routes.Profile : Routes.Auth);
  };

  return (
    <IconButton
      iconName='profile'
      size='large'
      iconSize='small'
      onClick={handleProfileClick}
    />
  );
});
