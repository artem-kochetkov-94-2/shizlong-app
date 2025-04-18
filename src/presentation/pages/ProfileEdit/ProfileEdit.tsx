import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './ProfileEdit.module.css';
import { Button } from '@src/presentation/ui-kit/Button';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { StyledInput } from '@src/presentation/ui-kit/StyledInput';
import PhoneInput from 'react-phone-input-2';
import { useEffect, useState } from 'react';
import { profileStore } from '@src/application/store/profileStore';
import { observer } from 'mobx-react-lite';

export const ProfileEdit = observer(() => {
  const { profile } = profileStore;

  const [firstName, setFirstName] = useState(profile?.name ?? '');
  const [lastName, setLastName] = useState(profile?.last_name ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setFirstName(profile?.name ?? '');
    setLastName(profile?.last_name ?? '');
    setPhone(profile?.phone ?? '');
  }, [profile]);

  const handleSubmit = () => {
    profileStore.updateProfile({
      name: firstName,
      last_name: lastName,
      phone: phone,
      file: file,
    });
  };

  return (
    <div className={styles.container}>
      <PageHeader topPadding>Изменить информацию</PageHeader>
      <div className={styles.profileEditor}>
        <div className={styles.editorCard2}>
          <div className={styles.profilePhoto}>
            <Icon name={'profile'} size={'small'} />
          </div>
          <Button variant={'gray2'}>Выбрать фото</Button>
        </div>
        <div className={styles.editorCard1}>
          <div className={styles.h2}>Ваше имя</div>
          <StyledInput
            value={firstName}
            onChange={(v) => setFirstName(v)}
            type={'text'}
            placeholder={'Имя'}
          />
          <StyledInput
            value={lastName}
            onChange={(v) => setLastName(v)}
            type={'text'}
            placeholder={'Фамилия'}
          />
          <Button variant={'yellow'} onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
        <div className={styles.editorCard1}>
          <div className={styles.h2}>Телефон</div>
          <PhoneInput
            country={'ru'}
            value={phone}
            onChange={(v) => setPhone(v)}
            specialLabel={'Номер телефона'}
            placeholder={'000 000 0000'}
            containerClass={styles.input}
          />
          <Button variant={'yellow'}>Подтвердить телефон</Button>
        </div>
      </div>
    </div>
  );
});
