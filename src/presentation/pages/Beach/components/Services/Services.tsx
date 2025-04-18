import React from 'react';
import styles from './Services.module.css';
import { Card } from '@src/presentation/ui-kit/Card';

interface Service {
  name: string;
  price: string;
  duration: string;
}

interface ServicesProps {
  services: Service[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <Card>
      <div className={styles.services}>
        <h3 className={styles.title}>Услуги</h3>
        <ul className={styles.serviceList}>
          {services.map((service, index) => (
            <li key={index} className={styles.serviceItem}>
              <span className={styles.serviceName}>{service.name}123</span>
              <span className={styles.servicePrice}>{service.price}</span>
              <span className={styles.serviceDuration}>{service.duration}</span>
            </li>
          ))}
        </ul>
        <button className={styles.showMore}>Показать всё</button>
      </div>
    </Card>
  );
}; 