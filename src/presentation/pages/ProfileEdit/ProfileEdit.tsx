import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './ProfileEdit.module.css';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { StyledInput } from '@src/presentation/ui-kit/StyledInput';
import PhoneInput from 'react-phone-input-2';
import { useState } from 'react';

export const ProfileEdit = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <PageHeader>Изменить информацию</PageHeader>
      <div className={styles.profileEditor}>
        <div className={styles.editorCard2}>
          <div className={styles.profilePhoto}>
            <Icon name={'profile'} size={'small'} />
          </div>
          <Button variant={'gray2'}>Выбрать фото</Button>
        </div>
        <div className={styles.editorCard1}>
          <div className={styles.h2}>Ваше имя</div>
          <StyledInput type={'text'} placeholder={'Имя'} />
          <StyledInput type={'text'} placeholder={'Фамилия'} />
          <Button variant={'yellow'}>Сохранить</Button>
        </div>
        <div className={styles.editorCard1}>
          <div className={styles.h2}>Телефон</div>
          <PhoneInput
            country={'ru'}
            value={value}
            onChange={(v) => setValue(v)}
            specialLabel={'Номер телефона'}
            placeholder={'000 000 0000'}
            containerClass={styles.input}
          />
          <Button variant={'yellow'}>Подтвердить телефон</Button>
        </div>
      </div>
    </div>
  );
};
