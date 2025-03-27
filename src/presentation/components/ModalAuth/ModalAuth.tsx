import PhoneInput from 'react-phone-input-2';
import styles from './ModalAuth.module.css';
import { useState } from 'react';
import { Button } from '@src/presentation/ui-kit/Button';

interface ModalProps {
  onClose: () => void;
}

export const ModalAuth = ({ onClose }: ModalProps) => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          Пожалуйста, авторизуйтесь, для дальнейшего использования приложения
        </div>
        <div className={styles.content}>
          <div className={styles.h2}>Авторизация</div>
          <div className={styles.p}>Введите свой номер телефона</div>
          <PhoneInput
            country={'ru'}
            value={value}
            onChange={(v) => setValue(v)}
            specialLabel={'Номер телефона'}
            placeholder={'000 000 0000'}
            containerClass={styles.input}
          />
          <Button
            variant='primary'
            size='large'
            disabled={value.length !== 11}
            withShadow={true}
            onClick={onClose}
          >
            Авторизация
          </Button>
          <div className={styles.hint}>
            Нажимая «Войти», вы соглашаетесь с <a href='#'>Условиями использования</a> и{' '}
            <a href='#'>Политикой конфиденциальности</a>
          </div>
        </div>
      </div>
    </div>
  );
};
