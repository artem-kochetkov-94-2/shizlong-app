import { bookStore } from '@src/application/store/bookStore';
import styles from './Modules.module.css';
import { locationStore } from '@src/application/store/locationStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes';
import cn from 'classnames';

export const Modules = observer(() => {
    const navigate = useNavigate();
    const { bookModules } = bookStore;
    const { modules } = locationStore;

    return (
        <div className={styles.modules}>
            {[...bookModules.keys()].map((moduleId) => {
                const module = modules.find((m) => m.id === moduleId);
                if (!module) return null;
                const isModuleAvailable = bookStore.isModuleAvailable(module);
                const moduleScheme = bookStore.getScheme(module);

                return (
                    <div
                        className={cn(styles.module, {
                            [styles.moduleUnavailable]: !isModuleAvailable,
                        })}
                        onClick={() => navigate(Routes.Booking + `?module=${module?.id}`)}
                        key={moduleId}
                    >
                        <div className={styles.moduleImage}>
                            <img src={module?.placed_icon?.link_icon} alt={module?.placed_icon?.name_icon} />
                        </div>
                        <div className={styles.moduleName}>
                            {module?.name}{' '}
                            <span>#{module?.number}</span>
                        </div>
                        <div className={styles.moduleExtraContent}>
                            <div className={styles.modulePrice}>{moduleScheme?.price.formatted_value}</div>
                            {moduleScheme ? (
                                <div className={styles.modulePriceFor}>за {moduleScheme?.type.description}</div>
                            ) : null}
                        </div>
                    </div>
                );
            })}
        </div>
    );
});
