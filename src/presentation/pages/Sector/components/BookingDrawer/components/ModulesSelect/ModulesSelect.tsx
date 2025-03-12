import { modulesSelectOptions, bookStore } from "@src/application/store/bookStore";
import { DropdownMenu } from "@src/presentation/ui-kit/DropdownMenu";
import { useState } from 'react';
import { observer } from "mobx-react-lite";
import styles from './ModulesSelect.module.css';
import classNames from 'classnames';
import { Icon } from "@src/presentation/ui-kit/Icon";
export const ModulesSelect = observer(() => {
    const { modulesSelectValue } = bookStore;
    const [modulesSelectOpen, setModulesSelectOpen] = useState(false);

    return (
        <div className={styles.modulesSelect} onClick={() => setModulesSelectOpen(!modulesSelectOpen)}>
            {modulesSelectOptions.find(option => option.value === modulesSelectValue)?.label}
            <Icon name={modulesSelectOpen ? 'arrow-up' : 'arrow-down'} size="extra-small" />

            <DropdownMenu open={modulesSelectOpen} className={styles.modulesSelectDropdown}>
                <div className={styles.modulesSelectOptions}>
                    {modulesSelectOptions.map((item) => (
                        <div
                            key={item.value}
                            className={classNames(
                                styles.label,
                                { [styles.active]: item.value === modulesSelectValue }
                            )}
                            onClick={() => {
                                bookStore.setModulesSelectValue(item.value);
                                setModulesSelectOpen(false);
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </DropdownMenu>
        </div>
    )
});
