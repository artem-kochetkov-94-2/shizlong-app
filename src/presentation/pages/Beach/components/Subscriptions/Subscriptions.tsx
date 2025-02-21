import React from 'react';
import styles from './Subscriptions.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { Icon } from '@presentation/ui-kit/Icon';

interface Subscription {
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
}

interface SubscriptionsProps {
  subscriptions: Subscription[];
}

export const Subscriptions: React.FC<SubscriptionsProps> = ({ subscriptions }) => {
  return (
    <div className={styles.subscriptions}>
      <h3 className={styles.title}>Доступные абонементы</h3>
      {subscriptions.map((subscription, index) => (
        <Card key={index} className={styles.subscriptionCard}>
          <div className={styles.subscription}>
            <div className={styles.header}>
              <Icon name="subscription" size="small" className={styles.icon} />
              <h4 className={styles.subscriptionTitle}>{subscription.title}</h4>
              <Icon name="arrow_forward" size="small" className={styles.arrowIcon} />
            </div>
            <p className={styles.description}>{subscription.description}</p>
            <ul className={styles.features}>
              {subscription.features.map((feature, i) => (
                <li key={i} className={styles.feature}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <span className={styles.duration}>{subscription.duration}</span>
              <span className={styles.price}>{subscription.price}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}; 