import React from 'react';
import styles from './Contacts.module.css';
import { Icon } from '@presentation/ui-kit/Icon';
import { Card } from '@src/presentation/ui-kit/Card';
import { RawLocation } from '@src/infrastructure/Locations/types';

export const Contacts: React.FC<{ location: RawLocation }> = ({ location }) => {
  return (
    <Card>
      <div className={styles.contacts}>
        <div className={styles.contactItem}>
          <Icon name="location" size="extra-small" className={styles.icon} />
          <div>
            <div className={styles.label}>Адрес</div>
            <div className={styles.text}>{location.address}</div>
          </div>
        </div>
        <div className={styles.contactItem}>
          <Icon name="time" size="extra-small" className={styles.icon} />
          <div>
            <div className={styles.label}>Время работы</div>
            <div className={styles.text}>{location.working_hours}</div>
          </div>
        </div>
        {/* <div className={styles.contactItem}>
          <Icon name="calendar" size="extra-small" className={styles.icon} />
          <div>
            <div className={styles.label}>Период работы</div>
            <div className={styles.text}>{location.season}</div>
          </div>
        </div> */}
      </div>
    </Card>
  );
};
