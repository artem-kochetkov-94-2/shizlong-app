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
import { Sheet } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import { bookStore } from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { DateValue } from "@src/application/types/date";
import { SERVER_URL } from "@src/const";
import { locationStore } from "@src/application/store/locationStore";
import { sectorStore } from "@src/application/store/sectorStore";
import { Counter } from '@src/presentation/ui-kit/Counter';

export const Booking = observer(() => {
    const navigate = useNavigate();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);

    const { selectedModule, formattedDate, formattedTime, formattedDuration } = bookStore;
    const { location, beachAccessories } = locationStore;
    const { sector } = sectorStore;

    const onChange = (value: DateValue) => {
        bookStore.setDate(value);
        setIsCalendarOpen(false);
    };

    console.log('accessories', JSON.parse(JSON.stringify(bookStore.accessories)));

    // const onSuccess = () => {}

    return (
        <>
            <Sheet
                isOpen={true}
                onClose={() => navigate(-1)}
                detent="content-height"
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className={styles.header}>
                            <IconButton
                                iconName="arrow-left"
                                size="medium"
                                shape="rounded"
                                color="white"
                                onClick={() => navigate(-1)}
                            />
                            <div className={styles.headerContent}>
                                <div className={styles.title}>
                                    {bookStore.modulesSelectValue === 'one' ? 'Заказать один модуль' : 'Заказать группу модулей'}
                                </div>
                                <div className={styles.subtitle}>{sector?.name} пляжа {location?.name}</div>
                            </div>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.modules}>
                                <div className={styles.module}>
                                    <img
                                        src={`${SERVER_URL}${selectedModule?.module.placed_icon.link_icon}`}
                                        alt={selectedModule?.module.placed_icon.name_icon}
                                    />
                                    <div className={styles.moduleName}>{selectedModule?.module.name}</div>
                                    <div className={styles.moduleExtraContent}>
                                        <div className={styles.modulePrice}>{selectedModule?.module.price_per_hour} ₽</div>
                                        <div className={styles.modulePriceFor}>за 1 час</div>
                                    </div>
                                </div>
                            </div>

                            <Card className={styles.card}>
                                <div className={styles.date}>
                                    <div className={styles.cardTitle}>
                                        <span>Дата</span>
                                        <span>{formattedDate}</span>
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
                                        <span>Часы</span    >
                                        <span>{formattedTime}</span>
                                    </div>

                                    <Tag size="medium" text={formattedDuration} />
                                    <Icon name="arrow-right" size="small" />
                                </div>
                            </Card>

                            {/* <Card className={styles.card}>
                                <div className={styles.people}>
                                    <div className={styles.cardTitle}>
                                        <span>Количество гостей</span>
                                        <span>1 человек</span>
                                    </div>

                                    <Icon name="arrow-right" size="small" />
                                </div>
                            </Card> */}

                            <Card>
                                <div className={styles.accessories}>
                                    <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>

                                    <div className={styles.accessoriesContent}>
                                        {beachAccessories.map((accessory) => (
                                            <div className={styles.accessoryWrapper}>
                                                <div className={styles.accessory}>
                                                    <img src={accessory.link_icon} alt={accessory.name} />
                                                    <div className={styles.accessoryName}>{accessory.name}</div>
                                                    <div className={styles.accessoryPrice}>от {accessory.price} ₽</div>
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

                            {/* <Card className={styles.promocode}>
                                <div className={styles.promocodeTitle}>Есть промокод?</div>
                                <div className={styles.promocodeRow}>
                                    <input
                                        className={styles.promocodeInput}
                                        placeholder="введите код"
                                    />
                                    <Button size="medium" variant="gray">Применить</Button>
                                </div>
                            </Card> */}

                            {/* <div className={styles.promocodeAccepted}>
                                <Icon name="check3" size="small" />
                                <div className={styles.promocodeAcceptedTitle}>Промокод применён</div>
                            </div> */}

                            <div className={styles.rules}>
                                Оформляя заказ, вы соглашаетесь с <span>Правилами пляжа</span>
                            </div>
                        </div>

                        <div className={styles.footer} onClick={() => bookStore.createBooking()}>
                            <Button size="medium" variant="yellow">Оплатить</Button>
                            <span>1 550 ₽</span>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>

            {isCalendarOpen && (
                <Calendar
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    initialValue={bookStore.date}
                    onChange={onChange}
                />
            )}

            {isTimeOpen && (
                <Time
                    isOpen={isTimeOpen}
                    onClose={() => setIsTimeOpen(false)}
                    startTime={bookStore.startTime}
                    endTime={bookStore.endTime}
                />
            )}
        </>
    );
});
