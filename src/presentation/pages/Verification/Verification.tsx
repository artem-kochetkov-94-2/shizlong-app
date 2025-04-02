import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { observer } from 'mobx-react-lite';
import { verificationStore } from '@src/application/store/verificationStore';
import { Sheet } from 'react-modal-sheet';
import { useEffect } from 'react';
import { VerificationInput } from '@src/presentation/components/VerificationInput';

export const Verification = observer(() => {
  const navigate = useNavigate();
  const { phoneNumber } = verificationStore;

  useEffect(() => {
    if (!phoneNumber) {
      navigate(Routes.Auth);
      return;
    }
  }, [phoneNumber]);

  return (
    <Sheet
      isOpen={true}
      onClose={() => navigate(Routes.Locations)}
      detent='content-height'
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <VerificationInput onExit={() => navigate(Routes.Locations)} />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
});
