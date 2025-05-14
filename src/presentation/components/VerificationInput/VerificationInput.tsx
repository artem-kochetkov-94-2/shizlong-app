import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import { CallStrategy } from '@src/domain/common/verification/callStrategy';
import { verificationStore } from '@src/application/store/verificationStore';
import smartphoneImg from './assets/smartphone.svg';
import messageImg from './assets/message.svg';
import { observer } from 'mobx-react-lite';
import { Button } from '@src/presentation/ui-kit/Button';
import ReactCodeInput from 'react-code-input';
import cn from 'classnames';
import styles from './VerificationInput.module.css';
import { useCheckVerification } from './useCheckVerification';
// import { SmsStrategy } from '@src/domain/common/verification/smsStrategy';
// import { useTimer } from '@src/application/hooks/useTimer';
// const RESEND_INTERVAL_SECONDS = 60;

interface VerificationInputProps {
  onExit: () => void;
  showNavigateBtn?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  isKeyboardVisible?: boolean;
}

export const VerificationInput = observer(
  ({ onExit, showNavigateBtn = true, onFocus, onBlur, isKeyboardVisible = false }: VerificationInputProps) => {
    const {
      phoneNumber,
      verificationError,
      strategy,
      requestReverseCallPhone,
      requestReverseCallFetching,
      checkReverseCallVerificationFetching,
      checkReverseCallVerificationPreparing,
    } = verificationStore;
    const navigate = useNavigate();
    const isCallStrategy = strategy instanceof CallStrategy;
    const inputWrapperRef = useRef<HTMLDivElement>(null);

    // const isSmsStrategy = strategy instanceof SmsStrategy;
    // const { timeLeft, setTimeLeft } = useTimer(RESEND_INTERVAL_SECONDS);

    useEffect(() => {
      const inputs = inputWrapperRef.current?.querySelectorAll('input');
      if (!onFocus || !onBlur) return;
      inputs?.forEach(input => {
        input.addEventListener('focus', onFocus);
        input.addEventListener('blur', onBlur);
      });

      return () => {
        inputs?.forEach(input => {
          input.removeEventListener('focus', onFocus);
          input.removeEventListener('blur', onBlur);
        });
      };
    }, [onFocus, onBlur]);

    useCheckVerification(phoneNumber, onExit);

    return (
      <div className={cn(styles.wrapper, isKeyboardVisible && styles.wrapperKeyboardVisible)}>
        <div className={styles.title}>Введите код</div>

        <img src={isCallStrategy ? smartphoneImg : messageImg} alt='smartphone' />

        {showNavigateBtn && (
          <>
            <IconButton
              iconName='arrow-left'
              size='medium'
              shape='rounded'
              className={styles.backButton}
              onClick={() => navigate(-1)}
              withShadow={false}
            />

            <IconButton
              iconName='cross'
              size='medium'
              shape='rounded'
              className={styles.closeButton}
              onClick={() => onExit()}
              withShadow={false}
            />
          </>
        )}

        <div className={styles.content}>
          <div className={styles.description}>
            {isCallStrategy && (
              <>
                На ваш телефон {phoneNumber} сейчас позвонит робот. Укажите{' '}
                <span>4 последние</span> цифры номера, с которого вам позвонили.
              </>
            )}

            {/* {isSmsStrategy && (
              <>
                Мы отправили SMS с кодом проверки на ваш телефон {phoneNumber}. Укажите{' '}
                <span>проверочный код</span> из SMS
              </>
            )} */}
          </div>

          <div className={styles.codeInputWrapper} ref={inputWrapperRef}>
            <ReactCodeInput
              className={styles.codeInput}
              type='number'
              fields={4}
              name={'code'}
              inputMode={'tel'}
              onChange={(value) => {
                if (value.length === 4) {
                  verificationStore.sendCode(value, () => onExit());
                }
              }}
            />
            {verificationError && <div className={styles.error}>{verificationError}</div>}
          </div>

          <div className={styles.footer}>
            {/* {timeLeft > 0 && (
              <div className={styles.hint}>
                Вы можете запросить код по SMS через{' '}
                <span>
                  {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
                  {timeLeft % 60}
                </span>
              </div>
            )} */}

              <div className={styles.footerHint}>
                Или вы можете самостоятельно позвонить для подтверждения авторизации. Это бесплатно.
              </div>

              <Button
                className={styles.button}
                variant='tertiary'
                size='medium'
                fullWidth={false}
                disabled={requestReverseCallFetching || checkReverseCallVerificationFetching || checkReverseCallVerificationPreparing}
                isLoading={requestReverseCallFetching || checkReverseCallVerificationFetching || checkReverseCallVerificationPreparing}
                onClick={() => verificationStore.requestReverseCall(phoneNumber)}
                href={`tel:+${requestReverseCallPhone}`}
              >
                {(checkReverseCallVerificationPreparing || checkReverseCallVerificationFetching) ? 'Проверяем статус верификации...' : 'Подтвердить звонком'}
              </Button>

            {/* {timeLeft === 0 && (
              <Button
                className={styles.button}
                variant='tertiary'
                size='medium'
                fullWidth={false}
                onClick={() => {
                  verificationStore.reinit();
                  setTimeLeft(RESEND_INTERVAL_SECONDS);
                }}
              >
                Прислать код по SMS
              </Button>
            )} */}
          </div>
        </div>
      </div>
    );
  }
);
