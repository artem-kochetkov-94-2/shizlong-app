import { observer } from 'mobx-react-lite';
import { locationsStore } from '@src/application/store/locationsStore';
import { CardList } from '@presentation/components/CardList';
import { Navigation } from './components/Navigation';
import { Menu } from '@src/presentation/components/Menu';
import { useEffect, useRef, useState } from 'react';
import styles from './Locations.module.css';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import useKeyboardVisibility from '@src/application/hooks/useKeyboardVisibility';

const SNAP_POINTS = [758, 309, 99];
const INITIAL_SNAP_POINT = 2;

export const Locations = observer(() => {
  const { filteredLocations } = locationsStore;
  const [isOpen, setIsOpen] = useState(true);
  const { isKeyboardVisible, setIsKeyboardVisible } = useKeyboardVisibility();

  const ref = useRef<SheetRef>(null);
  const snapTo = (i: number) => ref.current?.snapTo(i);

  useEffect(() => {
    setTimeout(() => {
      snapTo(2);
    }, 1000);
  }, []);

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={() => setIsOpen(true)}
      detent='content-height'
      snapPoints={SNAP_POINTS}
      initialSnap={INITIAL_SNAP_POINT}
      dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
          <Navigation
            onInputFocus={() => {
              snapTo(0);
              setIsKeyboardVisible(true);
            }}
            onInputBlur={() => setIsKeyboardVisible(false)}
          />
          <Sheet.Scroller>
            <div className={styles.content}>
              <Menu />
              <CardList title='Пляжи рядом' items={filteredLocations} category='пляж' />
              {filteredLocations.length === 0 && isKeyboardVisible && <div style={{ height: 200 }} />}
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
});
