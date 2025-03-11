import styles from './WorkTime.module.css';
import { FilterPageHeader } from '../FilterPageHeader';
import { CheckBox } from '@src/presentation/ui-kit/CheckBox';
import { Button } from '@src/presentation/ui-kit/Button';
import { Card } from '@src/presentation/ui-kit/Card';
import { CheckBoxes } from '@src/presentation/ui-kit/CheckBox/CheckBoxes';
import { SearchInput } from '@src/presentation/ui-kit/SearchInput';

interface WorkTimeProps {
  onClick: () => void;
}

export const WorkTime: React.FC<WorkTimeProps> = ({ onClick }) => {
  return (
    <div className={styles.workTime}>
      <FilterPageHeader onClick={onClick} onClearFilter={() => {}}>
        Время работы
      </FilterPageHeader>
      <Card>
        <SearchInput />
      </Card>
      <CheckBoxes>
        <CheckBox text={'Открыто'} rightContent={'4565'} />
        <CheckBox text={'Дневной'} rightContent={'521'} />
        <CheckBox text={'Ночной'} rightContent={'54'} />
      </CheckBoxes>
      <Card>
        <Button variant={'yellow'}>Применить</Button>
      </Card>
    </div>
  );
};
