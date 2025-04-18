import { Icon } from "@src/presentation/ui-kit/Icon/Icon"
import classNames from "classnames"
import { formatPhoneNumber } from "@src/application/utils/formatPhone"
import { observer } from "mobx-react-lite"
// import { ChangeEvent } from "react";
// import { useState } from "react";
// import { useRef } from "react";
import { profileStore } from "@src/application/store/profileStore";
import styles from './UserInfo.module.css';

export const UserInfo = observer(() => {
    // const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
    // const fileInputRef = useRef<HTMLInputElement>(null);
    const { profile, isCashier } = profileStore;

    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //   const file = event.target.files?.[0];

    //   if (file) {
    //     setSelectedAvatar(file);
    //   }
    // };
  
    // const handleAvatarClick = () => {
    //   fileInputRef.current?.click();
    // };

    return (
      <div className={styles.userInfo}>
        <div
          className={classNames(styles.avatar, !profile?.employee?.photo && styles.avatarEmpty)}
          // className={classNames(styles.avatar, !selectedAvatar && styles.avatarEmpty)}
          // onClick={handleAvatarClick}
        >
          {/* <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          /> */}
          {profile?.employee?.photo ? <img src={profile.employee.photo} alt='' /> : <Icon name={'profile'} />}

          {/* {!selectedAvatar && <Icon name={'profile'} />}
          {selectedAvatar && <img src={URL.createObjectURL(selectedAvatar)} alt='' />} */}
        </div>
        <div>
          <div className={styles.userName}>
            {profile?.name} {profile?.last_name}
          </div>
          {!isCashier && (
            <div className={styles.userPhone}>
              {formatPhoneNumber(profile?.phone || '')}
            </div>
          )}
        </div>
      </div>
    )
});
