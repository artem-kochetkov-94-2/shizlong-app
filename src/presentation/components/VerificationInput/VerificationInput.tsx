import { IconButton } from '@src/presentation/ui-kit/IconButton';
import styles from './VerificationInput.module.css';
import { CallStrategy } from '@src/domain/common/verification/callStrategy';
import { SmsStrategy } from '@src/domain/common/verification/smsStrategy';
import { verificationStore } from '@src/application/store/verificationStore';
import smartphoneImg from './assets/smartphone.svg';
import messageImg from './assets/message.svg';
import { observer } from 'mobx-react-lite';
import { Button } from '@src/presentation/ui-kit/Button';
import { useTimer } from '@src/application/hooks/useTimer';
import ReactCodeInput from 'react-code-input';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import cn from 'classnames';

interface VerificationInputProps {
  onExit: () => void;
  showNavigateBtn?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  isKeyboardVisible?: boolean;
}

const RESEND_INTERVAL_SECONDS = 60;

export const VerificationInput = observer(
  ({ onExit, showNavigateBtn = true, onFocus, onBlur, isKeyboardVisible = false }: VerificationInputProps) => {
    const { phoneNumber, verificationError, strategy } = verificationStore;
    const navigate = useNavigate();

    const isCallStrategy = strategy instanceof CallStrategy;
    const isSmsStrategy = strategy instanceof SmsStrategy;

    const { timeLeft, setTimeLeft } = useTimer(RESEND_INTERVAL_SECONDS);

    const inputWrapperRef = useRef<HTMLDivElement>(null);

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

            {isSmsStrategy && (
              <>
                Мы отправили SMS с кодом проверки на ваш телефон {phoneNumber}. Укажите{' '}
                <span>проверочный код</span> из SMS
              </>
            )}
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
            {timeLeft > 0 && (
              <div className={styles.hint}>
                Вы можете запросить код по SMS через{' '}
                <span>
                  {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
                  {timeLeft % 60}
                </span>
              </div>
            )}

            {timeLeft === 0 && (
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
                {/* Прислать код по SMS повторно */}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
