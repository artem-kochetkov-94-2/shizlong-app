import { verificationStore } from "@src/application/store/verificationStore";
import { useEffect, useRef } from "react";

export const useCheckVerification = (phoneNumber: string, onExit: VoidFunction) => {
  const { requestReverseCallPhone } = verificationStore;
  const callTimeoutRef = useRef<null | number>(null);
  // const [status, setStatus] = useState('');

  // Отслеживаем возврат на вкладку
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && requestReverseCallPhone) {
        // Даем время на завершение звонка
        if (callTimeoutRef.current) {
          clearTimeout(callTimeoutRef.current);
        }

        verificationStore.setCheckReverseCallVerificationPreparing(true);

        callTimeoutRef.current = setTimeout(() => {
          verificationStore.checkReverseCallVerification(phoneNumber, () => onExit())
        }, 2000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (callTimeoutRef.current) clearTimeout(callTimeoutRef.current);
      verificationStore.setCheckReverseCallVerificationPreparing(false);
    };
  }, [requestReverseCallPhone]);
}
