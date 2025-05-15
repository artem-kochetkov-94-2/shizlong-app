import { locationStore } from "@src/application/store/locationStore";
import { Card } from "@src/presentation/ui-kit/Card"
import { Counter } from '@src/presentation/ui-kit/Counter';
import Toggle from "@src/presentation/ui-kit/Toggle/Toggle";
import { observer } from "mobx-react-lite";
import styles from './Accessories.module.css';
import { bookStore } from "@src/application/store/bookStore";

export const Accessories = observer(() => {
    const { beachAccessories } = locationStore;

    return (
        <Card>
            <div className={styles.accessories}>
                <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>

                <div className={styles.accessoriesContent}>
                    {beachAccessories.map((accessory) => (
                        <div className={styles.accessoryWrapper} key={accessory.id}>
                            <div className={styles.accessory}>
                                <img src={accessory.link_icon} alt={accessory.name} />
                                <div className={styles.accessoryName}>{accessory.name}</div>
                                <div className={styles.accessoryPrice}>от {accessory.price.formatted_value}</div>
                                <div className={styles.accessoryToggle}>
                                    <Toggle onToggle={() => bookStore.toggleAccessory(accessory, !bookStore.accessories[accessory.id])} />
                                </div>
                            </div>
                            {bookStore.accessories[accessory.id] && (
                                <Counter
                                    count={bookStore.accessories[accessory.id].quantity}
                                    onChange={(count) => bookStore.setAccessoryQuantity(accessory.id, count)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
});