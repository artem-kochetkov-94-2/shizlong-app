import { Price } from './Price';
import { Services } from './Services/Services';
import { WorkTime } from './WorkTime';

export const renderComponent = (value: string, setComponent: () => void) => {
  switch (value) {
    case 'WorkTime':
      return <WorkTime onClick={setComponent} />;
    case 'Price':
      return <Price onClick={setComponent} />;
    case 'Services':
      return <Services onClick={setComponent} />;
    default:
      return null;
  }
};
