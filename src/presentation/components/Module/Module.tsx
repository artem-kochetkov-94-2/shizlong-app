import styles from './Module.module.css';
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from 'classnames';
import { About } from "@src/presentation/components/About";
import { Card } from "@src/presentation/ui-kit/Card";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Button } from "@src/presentation/ui-kit/Button";
import { AbonementCard } from "@src/presentation/components/AbonementCard";
import { Sheet } from "react-modal-sheet";
import { sectorStore } from '@src/application/store/sectorStore';
import { observer } from 'mobx-react-lite';
import { locationStore } from '@src/application/store/locationStore';
import { SERVER_URL } from '@src/const';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';
import { ModuleStatus } from '@src/infrastructure/Locations/types';
import { bookStore } from '@src/application/store/bookStore';

const labels: Record<ModuleStatus, string> = {
    available: 'свободен',
    booked: 'занят',
    inactive: 'неактивен',
}

export const Module = observer(({ onClose }: { onClose?: () => void }) => {
    const { selectedModule } = sectorStore;
    const { beachAccessories, location } = locationStore;
    const { formattedTime, formattedDate } = bookStore;

    const navigate = useNavigate();

    if (!selectedModule) return null;

    const isMyBooking = false;

    const handleShowSchema = () => {
        navigate(Routes.Sector.replace(':id', selectedModule?.sector_id.toString() || ''));
        onClose?.();
    }

    return (
        <Sheet
            isOpen={true}
            onClose={() => sectorStore.setSelectedModule(null)}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className={styles.header}>
                        <div className={styles.headline}>
                            <div className={styles.headlineTitle}>{selectedModule?.name}</div>
                            <Tag text={`${selectedModule?.price_per_hour} ₽ в час`} size="medium" />
                        </div>

                        <div className={styles.statusRow}>
                            <div className={cn(styles.status, styles[isMyBooking ? 'my' : selectedModule?.status])}>
                                <span>{isMyBooking ? 'моя бронь' : labels[selectedModule?.status]}</span>
                            </div>
                            <div className={styles.time}>{formattedTime}, {formattedDate}</div>
                        </div>

                        {isMyBooking && (
                            <div className={styles.myBooking}>
                                <Button size="medium" variant="yellow">
                                    <span>Перейти в мою бронь</span>
                                    <Icon name="arrow-right" size="small" />
                                </Button>
                            </div>
                        )}

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

                    <Sheet.Scroller>
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
                                                {location?.name}
                                            </Button>
                                        </div>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <div className={styles.infoItemHeader}>
                                            <Icon size="extra-small" name="location" />
                                            <div>Местоположение</div>
                                        </div>

                                        <div className={styles.infoItemContent}>
                                            <div className={styles.infoItemText}>{location?.address}</div>
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
                                    <img className={styles.descriptionImg} src={`${SERVER_URL}${selectedModule?.placed_icon.link_icon}`} />
                                    {/* <img className={styles.descriptionImg} src="https://placehold.co/44x44" /> */}
                                    <div className={styles.descriptionText}>{selectedModule?.name}</div>
                                </div>
                            </Card>

                            <About title="Описание" description="Подарите себе комфортный отдых на свежем воздухе с нашим стильным и практичным шезлонгом. Регулируемая спинка с несколькими положениями наклона, мягкий матрас, удобный подголовник." />

                            <Card>
                                <div className={styles.accessories}>
                                    <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>
                                    <div className={styles.accessoriesList}>
                                        {beachAccessories.map((accessory) => (
                                            <div className={styles.accessoriesItem}>
                                                <Icon name="time" size="extra-small" />
                                                <div className={styles.accessoriesItemTitle}>
                                                    {accessory.name}
                                                </div>
                                                <div className={styles.accessoriesItemPrice}>
                                                    от {accessory.price} ₽
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            <Card onClick={handleShowSchema}>
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
                    </Sheet.Scroller>

                    <div className={styles.footer}>
                        <Button size="medium" variant="yellow" onClick={() => navigate(Routes.Booking)}>
                            Заказать
                        </Button>
                        {/* <Button size="medium" variant="secondary">
                            Заказать по абонементу
                        </Button> */}
                        <span>
                            {formattedTime}<br />
                            {formattedDate}
                        </span>
                    </div>
                </Sheet.Content>
                </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
});
