import React, { useState } from 'react';
import styles from './About.module.css';
import { Card } from '@src/presentation/ui-kit/Card';

export const About: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const title = "Описание";
  const description = ["Абонемент «Семейный» – ваш ключ к идеальному пляжному отдыху в центре Сочи!", "Наслаждайтесь комфортом и роскошью на благоустроенном песчано-галечном пляже с протяженной береговой линией без волнорезов. Абонемент включает:"];
  const features = ["Доступ к пляжному комплексу на 7 дней", "Комфортный шезлонг с матрасом", "Большой пляжный зонт..."];

  return (
    <Card>
      <div className={styles.about}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          {description.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <li key={index} className={styles.feature}>
              <span className={styles.checkmark}>✔</span> {feature}
            </li>
          ))}
        </ul>
        <button className={styles.showMore} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Скрыть' : 'Показать всё'}
        </button>
      </div>
    </Card>
  );
};
