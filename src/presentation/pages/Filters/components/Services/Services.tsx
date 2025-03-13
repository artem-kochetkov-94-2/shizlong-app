import styles from './Services.module.css';
import { FilterPageHeader } from '../FilterPageHeader';
import { CheckBox } from '@src/presentation/ui-kit/CheckBox';
import { Button } from '@src/presentation/ui-kit/Button';
import { Card } from '@src/presentation/ui-kit/Card';
import { CheckBoxes } from '@src/presentation/ui-kit/CheckBox/CheckBoxes';
import { SearchInput } from '@src/presentation/ui-kit/SearchInput';
import { Icon } from '@src/presentation/ui-kit/Icon';

interface ServicesProps {
  onClick: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onClick }) => {
  return (
    <div className={styles.price}>
      <FilterPageHeader onClick={onClick} onClearFilter={() => {}}>
        Цены
      </FilterPageHeader>
      <Card>
        <SearchInput />
      </Card>
      <CheckBoxes>
        <CheckBox
          text={'Одиночный шезлонг'}
          rightContent={'4565'}
          leftContent={<Icon name={'beachFilter'} />}
        />
        <CheckBox
          text={'Качеля'}
          rightContent={'521'}
          leftContent={<Icon name={'beachFilter'} />}
        />
        <CheckBox
          text={'Джакузи'}
          rightContent={'53'}
          leftContent={<Icon name={'beachFilter'} />}
        />
        <CheckBox
          text={'Ракушка'}
          rightContent={'21'}
          leftContent={<Icon name={'beachFilter'} />}
        />
        <CheckBox
          text={'Пуфик'}
          rightContent={'223'}
          leftContent={<Icon name={'beachFilter'} />}
        />
        <CheckBox
          text={'Бунгало малое без столика'}
          rightContent={'53'}
          leftContent={<Icon name={'beachFilter'} />}
        />
      </CheckBoxes>
      <Card>
        <Button variant={'yellow'}>Применить</Button>
      </Card>
    </div>
  );
};
