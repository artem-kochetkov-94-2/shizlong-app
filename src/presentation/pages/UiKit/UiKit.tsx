import { Button } from '@src/presentation/ui-kit/Button';

import { icons } from '@src/presentation/ui-kit/Icon/const';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { IconName } from '@src/presentation/ui-kit/Icon/types';
import styles from './UiKit.module.css';
import { Card } from '@src/presentation/ui-kit/Card';
import { StyledInput } from '@src/presentation/ui-kit/StyledInput';
import { useState } from 'react';
import { ReminderItem } from '@src/presentation/ui-kit/ReminderItem';
import { RadioItem } from '@src/presentation/ui-kit/RadioItem';
import { items } from '../NotificationsSettings/const';
import { AccordionItem } from '@src/presentation/ui-kit/AccordeonItem';
import { Tag } from '@src/presentation/ui-kit/Tag';
import { CheckBox } from '@src/presentation/ui-kit/CheckBox';
import { RoundedTabs } from '@src/presentation/ui-kit/RoundedTabs';
import { bookStore, SectorTab, sectorTabs } from '@src/application/store/bookStore';
import { observer } from 'mobx-react-lite';

export const UiKit = observer(() => {
  const [valueInput, setValueInput] = useState('');
  const [selected, setSelected] = useState<string>('');
  const { activeTab } = bookStore;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#fff',
        padding: '10px',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/*Блок с иконками */}
      <Card className={styles.background}>
        <div className={styles.uiKit}>
          {Object.entries(icons).map(([key]) => (
            <Icon key={key} name={key as IconName} />
          ))}
        </div>
      </Card>

      {/*Блок с кнопками */}
      <Card className={styles.background}>
        <Button variant='primary' size='small'>
          Разрещить геолокацию
        </Button>
        <Button variant='yellow' size='small'>
          Далее
        </Button>
        <Button variant='gray' size='small'>
          Далее
        </Button>
        <Button variant='secondary' size='small'>
          Далее
        </Button>
        <Button variant='tertiary' size='small'>
          Далее
        </Button>
        <Button variant='yellow' size='large' fullWidth={false}>
          Далее
        </Button>
        <Button variant='yellow' size='medium' fullWidth={false}>
          Далее
        </Button>
        <Button variant='yellow' size='small' fullWidth={false}>
          Далее
        </Button>
        <Button variant='yellow' size='small' fullWidth={false} disabled>
          Далее
        </Button>
      </Card>

      {/*Блок с кнопками ReminderItem*/}
      <Card className={styles.background}>
        <ReminderItem variant='default'>Незавершённый заказ</ReminderItem>
        <ReminderItem variant='primary' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='gray' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='orange' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='yellow' arrow>
          Незавершённый заказ
        </ReminderItem>
        <ReminderItem variant='disabled' arrow>
          Незавершённый заказ
        </ReminderItem>
      </Card>

      {/*Блок с инпут*/}
      <Card className={styles.background}>
        <StyledInput
          type={'text'}
          placeholder={'Инпут'}
          value={valueInput}
          onChange={setValueInput}
        />
      </Card>

      {/* Блок с RadioItem */}
      <Card className={styles.background}>
        {items.map(({ id, label, content, status, statusState }) => (
          <RadioItem
            key={id}
            id={id}
            label={label}
            selected={selected}
            status={status}
            statusState={statusState}
            onClick={() => setSelected(id)}
          >
            {content}
          </RadioItem>
        ))}
      </Card>

      {/* Блок с AccordeonItem */}
      <Card className={styles.background}>
        <AccordionItem title={'Как отменить свою бронь?'}>
          В случае возникновения проблем обратитесь в службу поддержки через чат в
          приложении.
        </AccordionItem>
      </Card>

      {/* Блок с тегами */}
      <Card className={styles.background}>
        <Tag size='medium' color='primary' text='Открыто' />
        <Tag size='medium' color='primary' text='Открыто' />
        <Tag size='medium' color='secondary' text='Дневной' />
        <Tag
          size='medium'
          color='gray'
          text='2 шезлонга с зонтиком'
          leftContent={<Icon name={'megaphone'} size={'extra-small'} />}
          rightContent={'#12'}
        />
        <Tag
          size='medium'
          color='default'
          text='2 шезлонга с зонтиком'
          leftContent={<Icon name={'megaphone'} size={'extra-small'} />}
          rightContent={'#12'}
        />
        <Tag size='small' color='primary' text='Низкие' />
      </Card>

      {/* Блок с checkbox */}
      <Card className={styles.background}>
        <CheckBox
          rightContent={'3207'}
          leftContent={<Icon name='calendar' size='small' />}
          text={'Одиночный шезлонг деревянный'}
        />
        <CheckBox
          leftContent={<Icon name='location' size='small' />}
          text={'Спортивный инвентарь'}
        />
        <CheckBox rightContent={'8657'} text={'Выше среднего'} />
      </Card>

      {/* Блок с toggle */}
      <Card className={styles.background}>
        <RoundedTabs
          activeTab={activeTab}
          tabs={sectorTabs}
          onTabChange={(tab) => bookStore.setActiveTab(tab as SectorTab)}
        ></RoundedTabs>
      </Card>
    </div>
  );
});
