import { icons } from "@src/presentation/ui-kit/Icon/const";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { IconName } from "@src/presentation/ui-kit/Icon/types";
import styles from "./UiKit.module.css";
export const UiKit = () => {
    return (
        <div className={styles.uiKit}>
            {Object.entries(icons).map(([key]) => (
                <Icon key={key} name={key as IconName} />
            ))}
        </div>
    );
};
