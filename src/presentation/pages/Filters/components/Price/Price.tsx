import styles from './Price.module.css';
import { FilterPageHeader } from '../FilterPageHeader';
import { CheckBox } from '@src/presentation/ui-kit/CheckBox';
import { Button } from '@src/presentation/ui-kit/Button';
import { Card } from '@src/presentation/ui-kit/Card';
import { CheckBoxes } from '@src/presentation/ui-kit/CheckBox/CheckBoxes';
import { SearchInput } from '@src/presentation/ui-kit/SearchInput';

interface PriceProps {
  onClick: () => void;
}

export const Price: React.FC<PriceProps> = ({ onClick }) => {
  return (
    <div className={styles.price}>
      <FilterPageHeader onClick={onClick} onClearFilter={() => {}}>
        Цены
      </FilterPageHeader>
      <Card>
        <SearchInput />
      </Card>
      <CheckBoxes>
        <CheckBox text={'Низкие'} rightContent={'4565'} />
        <CheckBox text={'Средние'} rightContent={'521'} />
        <CheckBox text={'Выше среднего'} rightContent={'53'} />
        <CheckBox text={'Высокие'} rightContent={'2'} />
      </CheckBoxes>
      <Card>
        <Button variant={'yellow'}>Применить</Button>
      </Card>
    </div>
  );
};
