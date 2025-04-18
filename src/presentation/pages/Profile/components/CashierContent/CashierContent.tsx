import styles from './CashierContent.module.css';
import { observer } from "mobx-react-lite";
import { Tabs, useTabs } from '@src/presentation/ui-kit/Tabs';
import { Tab } from '@src/presentation/ui-kit/Tabs/Tabs';
import { cashierStore } from '@src/application/store/cashierStore';
import { CardList } from '@src/presentation/components/CardList';
import { SectorList } from '@src/presentation/components/SectorList';

export const tabs: Tab[] = [
    {
      value: 'sectors',
      label: 'Сектора',
    },
    {
      value: 'locations',
      label: 'Пляжи',
    },
];

export const CashierContent = observer(() => {
  const { locations, sectors } = cashierStore;
  const { currentTab, setCurrentTab } = useTabs(tabs[0].value);
  console.log('CashierContent locations', JSON.parse(JSON.stringify(locations)));
  console.log('CashierContent sectors', JSON.parse(JSON.stringify(sectors)));

  return (
    <div>
        <>
            <div className={styles.title}>Бронирования</div>
            <div className={styles.navigation}>
                <Tabs
                    tabs={tabs.map((t) => {
                        return {
                            ...t,
                            label:
                                t.value === 'sectors'
                                ? `Сектора ${sectors.length}`
                                : `Пляжи ${locations.length}`,
                            };
                        }
                    )}
                    activeTab={currentTab}
                    onTabChange={setCurrentTab}
                />
            </div>

            {currentTab === 'sectors' && <SectorList items={sectors} />}
            {currentTab === 'locations' && <CardList items={locations} />}
        </>
    </div>
  );
});
