import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2";
import styles from './Module.module.css';
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from 'classnames';
import { useState } from "react";
import { About } from "@src/presentation/components/About";
import { Card } from "@src/presentation/ui-kit/Card";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Button } from "@src/presentation/ui-kit/Button";
import { AbonementCard } from "@src/presentation/components/AbonementCard";

const accessories = [
    {
        title: "Крем от солнца",
        price: "от 100 ₽",
    },
    {
        title: "Полотенце",
        price: "от 100 ₽",
    },
    {
        title: "Крем от солнца",
        price: "от 100 ₽",
    },
];

export const Module = () => {
    const [status] = useState<'free' | 'booked' | 'my'>('free');

    return (
        <DrawerV2 open={true} fullScreen={true}>
            <div className={styles.header}>
                <div className={styles.headline}>
                    <div className={styles.headlineTitle}>
                        Одиночный шезлонг деревянный <span>#32</span>
                    </div>

                    <Tag text="300 ₽ в час" size="medium" />
                </div>

                <div className={styles.statusRow}>
                    <div className={cn(styles.status, styles[status])}>
                        <span>свободен</span>
                    </div>
                    <div className={styles.time}>с 10:00 до 13:00, 14 июля</div>
                </div>

                <div className={styles.myBooking}>
                    <Button size="medium" variant="yellow">
                        <span>Перейти в мою бронь</span>
                        <Icon name="arrow-right" size="small" />
                    </Button>
                </div>

                <Swiper spaceBetween={8} slidesPerView={'auto'}>
                    <SwiperSlide>
                        <img src="https://placehold.co/140x105" className={styles.image} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://placehold.co/140x105" className={styles.image} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://placehold.co/140x105" className={styles.image} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://placehold.co/140x105" className={styles.image} />
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className={styles.content}>
                <Card>
                    <ul className={styles.info}>
                        <li className={styles.infoItem}>
                            <div className={styles.infoItemHeader}>
                                <Icon size="extra-small" name="time" />
                                <div>
                                    <span>Доступность модуля</span>
                                    <span>14 июля</span>
                                </div>
                            </div>

                            <div className={styles.infoItemContent}>
                                <div className={styles.reservations}>
                                    <div className={cn(styles.reservation, styles.free)}>
                                        <span>Свободен</span>
                                        <span>09:00 - 13:00</span>
                                        <span>4 ч.</span>
                                    </div>
                                    <div className={cn(styles.reservation, styles.free)}>
                                        <span>Свободен</span>
                                        <span>18:00 - 21:00</span>
                                        <span>3 ч.</span>
                                    </div>
                                    <div className={cn(styles.reservation, styles.booked)}>
                                        <span>Занят</span>
                                        <span>13:00 - 18:00</span>
                                        <span>5 ч.</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className={styles.infoItem}>
                            <div className={styles.infoItemHeader}>
                                <Icon size="extra-small" name="beach" />
                                <div>Пляж</div>
                            </div>

                            <div className={styles.infoItemContent}>
                                <Button
                                    size="small"
                                    variant="yellow"
                                    fullWidth={false}
                                    ghost={true}
                                    fullRadius={true}
                            >
                                    Ривьера
                                </Button>
                            </div>
                        </li>
                        <li className={styles.infoItem}>
                            <div className={styles.infoItemHeader}>
                                <Icon size="extra-small" name="location" />
                                <div>Местоположение</div>
                            </div>

                            <div className={styles.infoItemContent}>
                                <div className={styles.infoItemText}>
                                    Сектор #2, Сочи, Ривьерский пер. 1
                                </div>
                            </div>
                        </li>
                        <li className={styles.infoItem}>
                            <div className={styles.infoItemHeader}>
                                <Icon size="extra-small" name="like" />
                                <div>Комфортное размещение</div>
                            </div>

                            <div className={styles.infoItemContent}>
                                <div className={styles.infoItemText}>
                                    Одного человека
                                </div>
                            </div>
                        </li>
                    </ul>
                </Card>

                <Card>
                    <div className={styles.description}>
                        <img className={styles.descriptionImg} src="https://placehold.co/44x44" />
                        <div className={styles.descriptionText}>
                            Одиночный шезлонг деревянный <span>#32</span>
                        </div>
                    </div>
                </Card>

                <About title="Описание" description="Подарите себе комфортный отдых на свежем воздухе с нашим стильным и практичным шезлонгом. Регулируемая спинка с несколькими положениями наклона, мягкий матрас, удобный подголовник." />

                <Card>
                    <div className={styles.accessories}>
                        <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>
                        <div className={styles.accessoriesList}>
                            {accessories.map((accessory) => (
                                <div className={styles.accessoriesItem}>
                                    <Icon name="time" size="extra-small" />
                                    <div className={styles.accessoriesItemTitle}>
                                        {accessory.title}
                                    </div>
                                    <div className={styles.accessoriesItemPrice}>
                                        {accessory.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className={styles.map}>
                        <Icon name="location-flag" size="extra-small" />
                        <div className={styles.map}>
                            Показать на схеме пляжа
                        </div>
                        <Icon name="arrow-right" size="small" />
                    </div>
                </Card>

                <div className={styles.abonements}>
                    <div className={styles.abonementsTitle}>Доступен по абонементам <span>2</span></div>
                    {/* <div className={styles.abonementsTitle}>Можно заказать модуль бесплатно по вашему абонементу</div> */}

                    {[1, 2].map((_, index) => (
                        <AbonementCard key={index} />
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <Button size="medium" variant="yellow">
                    Заказать
                </Button>
                {/* <Button size="medium" variant="secondary">
                    Заказать по абонементу
                </Button> */}
                <span>
                    с 10:00 до 13:00<br />
                    8 октября
                </span>
            </div>
        </DrawerV2>
    );
};
