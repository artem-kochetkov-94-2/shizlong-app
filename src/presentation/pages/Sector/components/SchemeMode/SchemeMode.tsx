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
          Выбран {activeScheme?.time_of_day?.name === 'daily' ? 'дневной' : 'вечерний'} режим пляжа
        </div>
        
        <div className={styles.schemeModeItems}>

          {schemes.slice().sort((a) => a.time_of_day?.name === 'daily' ? -1 : 1).map(scheme => (
            <IconButton
              key={scheme.id}
              iconName={scheme.time_of_day?.name === 'daily' ? 'sun' : 'moon'}
              size="medium"
              shape="rounded"
              color={activeScheme?.time_of_day?.name === scheme.time_of_day?.name ? 'white' : 'transparent'}
              className={classNames(styles.schemeModeItem, {
                [styles.active]: activeScheme?.time_of_day?.name === scheme.time_of_day?.name,
              })}
              withShadow={activeScheme?.time_of_day?.name === scheme.time_of_day?.name}
              onClick={() => sectorStore.setActiveScheme(scheme)}
            />
          ))}
        </div>
    </div>
  );
});
