import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import { observer } from 'mobx-react-lite';
import { AddCard } from '@src/presentation/components/AddCard';

export const PaymentMethodsAdd = observer(() => {
  return (
    <>
      <PageHeader topPadding={true}>Добавление карты</PageHeader>
      <AddCard buttonText='Добавить карту' />
    </>
  );
});
