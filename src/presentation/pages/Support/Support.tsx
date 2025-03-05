import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import styles from './Support.module.css';
import { AccordionItem } from '@src/presentation/ui-kit/AccordeonItem/AccordionItem';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { Link } from 'react-router-dom';

export const Support = () => {
  return (
    <>
      <PageHeader>Помощь</PageHeader>
      <div className={styles.wrapper}>
        <div className={styles.badge}>
          <div className={styles.badgeIcon}>
            <Icon name={'telegram'} size={'small'} />
          </div>
          <div className={styles.badgeName}>Задать вопрос</div>
        </div>
        <div className={styles.header}>Ответы на частые вопросы</div>
        <AccordionItem title='Как забронировать шезлонг через приложение?'>
          <div className={styles.content}>
            <div className={styles.contentDesc}>Контента нет</div>
          </div>
        </AccordionItem>
        <AccordionItem title='Как отменить свою бронь?'>
          <div className={styles.content}>
            <div className={styles.contentHeader}>Отмена брони:</div>
            <div className={styles.ul}>
              <div className={styles.listItem}>
                <Icon name={'checkYellow'} size={'small'} />
                <div className={styles.text}>
                  Откройте приложение и перейдите в раздел "Мой профиль"
                </div>
              </div>
              <div className={styles.listItem}>
                <Icon name={'checkYellow'} size={'small'} />
                <div className={styles.text}>
                  В разделе "Бронирования" выберите бронь для отмены
                </div>
              </div>
              <div className={styles.listItem}>
                <Icon name={'checkYellow'} size={'small'} />
                <div className={styles.text}>
                  Нажмите кнопку "Отменить бронирование"
                </div>
              </div>
              <div className={styles.listItem}>
                <Icon name={'checkYellow'} size={'small'} />
                <div className={styles.text}>Подтвердите отмену</div>
              </div>
            </div>
            <div className={styles.contentDesc}>
              В случае возникновения проблем обратитесь в службу поддержки через
              чат в приложении.
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title='Как работает система уведомлений о бронировании?'>
          <div className={styles.content}>
            <div className={styles.contentDesc}>Контента нет</div>
          </div>
        </AccordionItem>
        <AccordionItem title='Можно ли забронировать несколько объектов сразу?'>
          <div className={styles.content}>
            <div className={styles.contentDesc}>Контента нет</div>
          </div>
        </AccordionItem>
        <AccordionItem title='Как можно связаться со службой поддержки?'>
          <div className={styles.content}>
            <div className={styles.contentDesc}>Контента нет</div>
          </div>
        </AccordionItem>
        <AccordionItem title='Можно ли продлить бронь?'>
          <div className={styles.content}>
            <div className={styles.contentDesc}>Контента нет</div>
          </div>
        </AccordionItem>
        <AccordionItem title='Как вернуть средства при отмене брони?'>
          <div className={styles.content}>
            <div className={styles.contentDesc}>Контента нет</div>
          </div>
        </AccordionItem>
        <Link to={'/privacy-policy'} className={styles.link}>
          <div>Политика конфеденциальности</div>
          <Icon name={'arrow-right'} size={'small'} />
        </Link>
        <Link to={''} className={styles.link}>
          <div>Лицензионное соглашение</div>
          <Icon name={'arrow-right'} size={'small'} />
        </Link>
      </div>
    </>
  );
};
