import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2";
import styles from './Booking.module.css';
import { Card } from "@src/presentation/ui-kit/Card";
import { Button } from "@src/presentation/ui-kit/Button";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Tag } from "@src/presentation/ui-kit/Tag";
import Toggle from "@src/presentation/ui-kit/Toggle/Toggle";
import { useState } from "react";
import { Calendar } from "@src/presentation/components/Calendar";
import { Time } from "./components/Time";

export const Booking = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);

    return (
        <>
            <DrawerV2 open={true} fullScreen={true}>
                <div className={styles.header}>
                    <IconButton
                        iconName="arrow-left"
                        size="medium"
                        shape="rounded"
                        color="white"
                    />
                    <div className={styles.headerContent}>
                        <div className={styles.title}>Заказать один модуль</div>
                        <div className={styles.subtitle}>Сектор #2 пляжа Ривьера</div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.modules}>
                        <div className={styles.module}>
                            <img src="https://placehold.co/44x44" alt="" />
                            <div className={styles.moduleName}>Одиночный шезлонг деревянный <span>#32</span></div>
                            <div className={styles.moduleExtraContent}>
                                <div className={styles.modulePrice}>300 ₽</div>
                                <div className={styles.modulePriceFor}>за 1 час</div>
                            </div>
                        </div>
                    </div>

                    <Card className={styles.card}>
                        <div className={styles.date}>
                            <div className={styles.cardTitle}>
                                <span>Дата</span>
                                <span>24 августа</span>
                            </div>

                            <Icon
                                name="calendar"
                                size="small"
                                onClick={() => setIsCalendarOpen(true)}
                            />
                        </div>
                    </Card>

                    <Card className={styles.card}>
                        <div className={styles.time} onClick={() => setIsTimeOpen(true)}>
                            <div className={styles.cardTitle}>
                                <span>Часы</span>
                                <span>с 11:00 до 12:00</span>
                            </div>

                            <Tag size="medium" text="1 час" />

                            <Icon name="arrow-right" size="small" />
                        </div>
                    </Card>

                    <Card className={styles.card}>
                        <div className={styles.people}>
                            <div className={styles.cardTitle}>
                                <span>Количество гостей</span>
                                <span>1 человек</span>
                            </div>

                            <Icon name="arrow-right" size="small" />
                        </div>
                    </Card>

                    <Card>
                        <div className={styles.accessories}>
                            <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>

                            <div className={styles.accessoriesContent}>
                                <div className={styles.accessory}>
                                    <Icon name="time" size="extra-small" />
                                    <div className={styles.accessoryName}>Шезлонг</div>
                                    <div className={styles.accessoryPrice}>100 ₽</div>
                                    <Toggle />
                                </div>
                                <div className={styles.accessory}>
                                    <Icon name="time" size="extra-small" />
                                    <div className={styles.accessoryName}>Шезлонг</div>
                                    <div className={styles.accessoryPrice}>100 ₽</div>
                                    <Toggle />
                                </div>
                                <div className={styles.accessory}>
                                    <Icon name="time" size="extra-small" />
                                    <div className={styles.accessoryName}>Шезлонг</div>
                                    <div className={styles.accessoryPrice}>100 ₽</div>
                                    <Toggle />
                                </div>
                                <div className={styles.accessory}>
                                    <Icon name="time" size="extra-small" />
                                    <div className={styles.accessoryName}>Шезлонг</div>
                                    <div className={styles.accessoryPrice}>100 ₽</div>
                                    <Toggle />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className={styles.promocode}>
                        <div className={styles.promocodeTitle}>Есть промокод?</div>
                        <div className={styles.promocodeRow}>
                            <input
                                className={styles.promocodeInput}
                                placeholder="введите код"
                            />
                            <Button size="medium" variant="gray">Применить</Button>
                        </div>
                    </Card>

                    <div className={styles.promocodeAccepted}>
                        <Icon name="check3" size="small" />
                        <div className={styles.promocodeAcceptedTitle}>Промокод применён</div>
                    </div>

                    <div className={styles.rules}>
                        Оформляя заказ, вы соглашаетесь с <span>Правилами пляжа</span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button size="medium" variant="yellow">Оплатить</Button>
                    <span>1 550 ₽</span>
                </div>
            </DrawerV2>

            {isCalendarOpen && (
                <Calendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
            )}

            {isTimeOpen && (
                <Time isOpen={isTimeOpen} onClose={() => setIsTimeOpen(false)} />
            )}
        </>
    );
};
