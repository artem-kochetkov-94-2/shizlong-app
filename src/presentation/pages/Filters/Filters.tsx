import { observer } from 'mobx-react-lite';
import styles from './Filters.module.css';
import { DrawerV2 } from '@src/presentation/ui-kit/DrawerV2';
import { Card } from '@src/presentation/ui-kit/Card';
import { FilterLink } from './components/FilterLink';
import { Tag } from '@src/presentation/ui-kit/Tag';
import { useState } from 'react';
import { renderComponent } from './components/renderComponent';
import { FilterPageHeader } from './components/FilterPageHeader';
import { useNavigate } from 'react-router-dom';
import Toggle from '@src/presentation/ui-kit/Toggle/Toggle';
import { Icon } from '@src/presentation/ui-kit/Icon';

export const Filters = observer(() => {
  const [component, setComponent] = useState<string>('empty');
  const navigate = useNavigate();
  const handleSetComponent = (component: string) => {
    setComponent(component);
  };

  return (
    <div className={styles.favorites}>
      <DrawerV2 overflowHeight={79} overlay={false}>
        {component != 'empty' &&
          renderComponent(component, () => handleSetComponent('empty'))}
        {component === 'empty' && (
          <>
            <FilterPageHeader onClick={() => navigate(-1)} count={3}>
              Фильтры
            </FilterPageHeader>
            <div className={styles.container}>
              <Card>
                <FilterLink
                  onClick={() => setComponent('WorkTime')}
                  onClearFilter={() => {}}
                >
                  Время работы
                </FilterLink>
                <div className={styles.tags}>
                  <Tag text={'Дневной'} size={'medium'} color={'gray'} />
                  <Tag text={'Ночной'} size={'medium'} color={'gray'} />
                </div>
              </Card>

              <Card>
                <FilterLink arrow={false} className={styles.filterLink}>
                  <span>С рейтингом от 4.8 </span>
                  <Icon name={'star'} size='extra-small' color='secondary' />
                  <Toggle />
                </FilterLink>
              </Card>
              <Card>
                <FilterLink arrow={false}>
                  <span>Доступно для инвалидов</span>
                  <Toggle />
                </FilterLink>
              </Card>
              <Card>
                <FilterLink onClick={() => setComponent('Price')}>
                  <span>Цены</span>
                </FilterLink>
              </Card>
              <Card>
                <FilterLink
                  onClick={() => setComponent('Services')}
                  onClearFilter={() => {}}
                >
                  <span>Услуги</span>
                </FilterLink>
                <div className={styles.tags}>
                  <Tag text={'Одиночный шезлонг'} size={'medium'} color={'gray'} />
                  <Tag text={'Качеля'} size={'medium'} color={'gray'} />
                  <Tag text={'2 шезлонга с зонтиком'} size={'medium'} color={'gray'} />
                  <Tag text={'Джакузи'} size={'medium'} color={'gray'} />
                  <Tag text={'Ракушка'} size={'medium'} color={'gray'} />
                  <Tag
                    text={'Бунгало малое без столика'}
                    size={'medium'}
                    color={'gray'}
                  />
                  <Tag text={'пуфик'} size={'medium'} color={'gray'} />
                </div>
              </Card>
              <Card>
                <FilterLink onClick={() => setComponent('')}>
                  <span>Аксессуары</span>
                </FilterLink>
              </Card>
              <Card>
                <FilterLink onClick={() => setComponent('')}>
                  <span>Пляжная инфраструктура</span>
                </FilterLink>
              </Card>
            </div>
          </>
        )}
      </DrawerV2>
    </div>
  );
});
