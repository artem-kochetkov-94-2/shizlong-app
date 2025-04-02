import PhoneInput from 'react-phone-input-2';
import { useState } from 'react';
import { Button } from '@src/presentation/ui-kit/Button';
import { verificationStore } from '@src/application/store/verificationStore';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import styles from './ModalAuth.module.css';
import { Icon } from '@src/presentation/ui-kit/Icon';

interface ModalProps {
  onClose: () => void;
}

export const ModalAuth = ({ onClose }: ModalProps) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const submit = () => {
    verificationStore.reset();
    verificationStore.setPhoneNumber(value);
    verificationStore.startVerification();
    onClose();
    navigate(Routes.Verification);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Icon
          name='cross'
          className={styles.closeButton}
          onClick={onClose}
          size='medium'
        />
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
            onClick={submit}
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
