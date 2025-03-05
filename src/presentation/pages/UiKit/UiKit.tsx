import { Button } from "@src/presentation/ui-kit/Button";

import { icons } from "@src/presentation/ui-kit/Icon/const";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { IconName } from "@src/presentation/ui-kit/Icon/types";
import styles from "./UiKit.module.css";
import { Card } from "@src/presentation/ui-kit/Card";

export const UiKit = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'red', padding: '10px' }}>
            <Card>
                <div className={styles.uiKit}>
                    {Object.entries(icons).map(([key]) => (
                        <Icon key={key} name={key as IconName} />
                    ))}
                </div>
            </Card>

            <Card>
                <Button variant="primary" size="small">Button</Button>
                <Button variant="primary">Button</Button>
                <Button variant="primary" size="large">Button</Button>
                <Button variant="primary" size="small" fullWidth={false}>Button</Button>
                <Button variant="primary" size="medium" fullWidth={false}>Button</Button>
                <Button variant="primary" size="large" fullWidth={false}>Button</Button>
            </Card>
        </div>
    );
};
