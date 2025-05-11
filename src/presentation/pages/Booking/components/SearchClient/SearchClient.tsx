import { Card } from "@src/presentation/ui-kit/Card";
import styles from './SearchClient.module.css';
import { SearchInput } from "@src/presentation/ui-kit/SearchInput";
import { Button } from "@src/presentation/ui-kit/Button";
import Toggle from "@src/presentation/ui-kit/Toggle/Toggle";
import { useEffect, useState } from "react";
import { bookStore } from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { Tag } from "@src/presentation/ui-kit/Tag";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Icon } from "@src/presentation/ui-kit/Icon";

export const SearchClient = observer(() => {
    const [isToggleActive, setIsToggleActive] = useState(false);
    const { userPhone, user, isFetchingUserError, isFetchingUser } = bookStore;

    useEffect(() => {
        bookStore.clearUser();
    }, []);

    return (
        <Card className={styles.card}>
            <div className={styles.cardTitle}>Клиент</div>

            <div className={styles.row}>
                <SearchInput
                    value={userPhone}
                    onChange={(p) => bookStore.setUserPhone(p)}
                    placeholder="Найти по телефону"
                />
                <Button
                    variant="yellow"
                    withShadow 
                    className={styles.button}
                    isLoading={isFetchingUser}
                    disabled={!userPhone || isFetchingUser}
                    onClick={() => bookStore.getUser(userPhone)}
                >
                    Найти
                </Button>
            </div>

            {isFetchingUserError && (
                <div className={styles.userNotFound}>{isFetchingUserError}</div>
            )}

            {user ? (
                <div className={styles.user}>
                    <div className={styles.userName}>{user.name}</div>
                    <Tag
                        color="primary"
                        size="medium"
                        text={user.phone}
                        leftContent={<Icon name={'phone'} size={'extra-small'} />}
                    />
                    <IconButton
                        iconName="cross"
                        size="small"
                        iconSize="extra-small"
                        color="grayDark"
                        iconColor="white"
                        onClick={() => bookStore.clearUser()}
                    />
                </div>
            ) : (
                <Toggle
                    label="Анонимный клиент"
                    initialState={isToggleActive}
                    onToggle={(v) => setIsToggleActive(v)}
                />
            )}
        </Card>
    );
});
