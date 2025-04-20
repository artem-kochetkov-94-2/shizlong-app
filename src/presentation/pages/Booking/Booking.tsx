import styles from './Booking.module.css';
import { Card } from "@src/presentation/ui-kit/Card";
import { Button } from "@src/presentation/ui-kit/Button";
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Icon } from "@src/presentation/ui-kit/Icon";
// import { Tag } from "@src/presentation/ui-kit/Tag";
import Toggle from "@src/presentation/ui-kit/Toggle/Toggle";
import { useState } from "react";
import { Calendar } from "@src/presentation/components/Calendar";
import { Time } from "./components/Time";
import { Sheet } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import { bookStore } from "@src/application/store/bookStore";
import { observer } from "mobx-react-lite";
import { DateValue } from "@src/application/types/date";
import { locationStore } from "@src/application/store/locationStore";
import { sectorStore } from "@src/application/store/sectorStore";
import { Counter } from '@src/presentation/ui-kit/Counter';
import { Routes } from "@src/routes";
import { useSearchParams } from 'react-router-dom';
import { Module } from '@src/presentation/components/Module/Module';

export const Booking = observer(() => {
    const navigate = useNavigate();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get('module');

    const {
        formattedDate,
        formattedTime,
        formattedDuration,
        bookPrice,
        isCreatingBooking,
        bookModules,
        moduleSchemeId,
    } = bookStore;
    const { location, beachAccessories, modules } = locationStore;
    const { sector } = sectorStore;

    const onChange = (value: DateValue) => {
        bookStore.setDate(value);
        setIsCalendarOpen(false);
    };

    const onCreated = (id: number) => {
        navigate(Routes.BookingDetails.replace(':id', id.toString()));
    }

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
                                    {bookModules.size === 1 ? 'Заказать один модуль' : 'Заказать группу модулей'}
                                </div>
                                <div className={styles.subtitle}>{sector?.name} пляжа {location?.name}</div>
                            </div>
                        </div>
                        <Sheet.Scroller>
                            <div className={styles.content}>
                                <div className={styles.modules}>
                                    {[...bookModules.keys()].map((moduleId) => {
                                        const module = modules.find((m) => m.id === moduleId);
                                        const moduleScheme = module?.module_schemes.find((ms) => ms.id === moduleSchemeId);

                                        return (
                                            <div
                                                className={styles.module}
                                                onClick={() => navigate(Routes.Booking + `?module=${module?.id}`)}
                                                key={moduleId}
                                            >
                                                <div className={styles.moduleImage}>
                                                    <img
                                                        src={module?.placed_icon?.link_icon}
                                                        alt={module?.placed_icon?.name_icon}
                                                    />
                                                </div>
                                                <div className={styles.moduleName}>
                                                    {module?.name}{' '}
                                                    <span>#{module?.number}</span>
                                                </div>
                                                <div className={styles.moduleExtraContent}>
                                                    <div className={styles.modulePrice}>
                                                        {moduleScheme?.price.formatted_value}
                                                    </div>
                                                    {moduleScheme ? (
                                                        <div className={styles.modulePriceFor}>
                                                            за {moduleScheme?.type.description}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                            <span>Часы</span>
                                            <span>{formattedTime}</span>
                                        </div>

                                        {/* <Tag size="medium" text={formattedDuration} /> */}
                                        <Icon name="arrow-right" size="small" />
                                    </div>
                                </Card>

                                {/* @_todo: количество гостей */}
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

                                {/* @todo */}
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
                        </Sheet.Scroller>
                        <div className={styles.footer}>
                            <Button
                                size="medium"
                                variant="yellow"
                                disabled={isCreatingBooking || !bookStore.moduleSchemeId}
                                isLoading={isCreatingBooking}
                                onClick={() => bookStore.createBooking(onCreated)}
                            >
                                Оплатить
                            </Button>
                            <span>{bookPrice.toLocaleString()} ₽</span>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>

            {moduleId && (
                <Module
                    onClose={() => navigate(-1)}
                />
            )}

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
                    startTime={bookStore.formStartTime}
                    endTime={bookStore.endTime}
                />
            )}
        </>
    );
});
