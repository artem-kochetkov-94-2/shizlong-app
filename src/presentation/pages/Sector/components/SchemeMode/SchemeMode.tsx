import { IconButton } from "@src/presentation/ui-kit/IconButton/IconButton";
import styles from './SchemeMode.module.css';
import classNames from "classnames";
import { sectorStore } from "@src/application/store/sectorStore";
import { observer } from "mobx-react-lite";

export const SchemeMode = observer(() => {
  const { schemes, activeScheme } = sectorStore;

  if (!activeScheme || schemes.length === 1) return null;

  return (
    <div className={styles.schemeMode}>
        <div className={styles.schemeModeTitle}>
          Выбран {activeScheme?.time_of_day === 'day' ? 'дневной' : 'вечерний'} режим пляжа
        </div>
        
        <div className={styles.schemeModeItems}>

          {schemes.map(scheme => (
            <IconButton
              key={scheme.id}
              iconName={scheme.time_of_day === 'day' ? 'sun' : 'moon'}
              size="medium"
              shape="rounded"
              color={activeScheme?.time_of_day === scheme.time_of_day ? 'white' : 'transparent'}
              className={classNames(styles.schemeModeItem, {
                [styles.active]: activeScheme?.time_of_day === scheme.time_of_day,
              })}
              withShadow={activeScheme?.time_of_day === scheme.time_of_day}
              onClick={() => sectorStore.setActiveScheme(scheme)}
            />
          ))}
        </div>
    </div>
  );
});
