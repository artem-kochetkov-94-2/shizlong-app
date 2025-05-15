import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import { observer } from 'mobx-react-lite';
import { verificationStore } from '@src/application/store/verificationStore';
import { Sheet } from 'react-modal-sheet';
import { useEffect } from 'react';
import { VerificationInput } from '@src/presentation/components/VerificationInput';
import useKeyboardVisibility from '@src/application/hooks/useKeyboardVisibility';

export const Verification = observer(() => {
  const navigate = useNavigate();
  const { phoneNumber } = verificationStore;
  const { isKeyboardVisible, setIsKeyboardVisible } = useKeyboardVisibility();

  useEffect(() => {
    if (!phoneNumber) {
      navigate(Routes.Auth);
      return;
    }

    verificationStore.requestReverseCall(phoneNumber);
  }, [phoneNumber]);

  const handleFocus = () => {
    setTimeout(() => {
      setIsKeyboardVisible(true);
    }, 0);
  };

  const handleBlur = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <Sheet
      isOpen={true}
      onClose={() => navigate(Routes.Locations)}
      detent='content-height'
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
        <Sheet.Scroller>
          <VerificationInput
            onExit={() => navigate(Routes.Locations)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isKeyboardVisible={isKeyboardVisible}
          />
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
});
