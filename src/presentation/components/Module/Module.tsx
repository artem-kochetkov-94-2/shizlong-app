import styles from './Module.module.css';
import { Tag } from "@src/presentation/ui-kit/Tag";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from 'classnames';
import { About } from "@src/presentation/components/About";
import { Card } from "@src/presentation/ui-kit/Card";
import { Icon } from "@src/presentation/ui-kit/Icon";
import { Button } from "@src/presentation/ui-kit/Button";
// import { AbonementCard } from "@src/presentation/components/AbonementCard";
import { Sheet } from "react-modal-sheet";
import { observer } from 'mobx-react-lite';
import { locationStore } from '@src/application/store/locationStore';
import { SERVER_URL } from '@src/const';
import { Routes } from '@src/routes';
import { useNavigate } from 'react-router-dom';
import { ModuleStatus } from '@src/infrastructure/Locations/types';
import { bookStore } from '@src/application/store/bookStore';
import { formatTimeRange, getTimeRangeDurationInHoursAndMinutes } from '@src/application/utils/formatDate';

const labels: Record<ModuleStatus, string> = {
    available: 'свободен',
    booked: 'занят',
    inactive: 'неактивен',
}

export const Module = observer(() => {
    const { selectedModule } = bookStore;
    const { beachAccessories, location } = locationStore;
    const { formattedTime, formattedDate } = bookStore;

    console.log('module', JSON.parse(JSON.stringify(selectedModule)));

    const navigate = useNavigate();

    if (!selectedModule) return null;

    // @todo: добавить проверку на мою бронь
    const isMyBooking = false;

    const handleClose = () => {
        navigate(Routes.Sector.replace(':id', selectedModule?.module.sector_id.toString() || ''));
    };

    const handleShowSchema = () => {
        navigate(Routes.Sector.replace(':id', selectedModule?.module.sector_id.toString() || ''));
    };

    const goToLocation = () => {
        navigate(Routes.Location.replace(':id', location?.id.toString() || ''));
    };

    return (
        <Sheet
            isOpen={true}
            onClose={handleClose}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className={styles.header}>
                        <div className={styles.headline}>
                            <div className={styles.headlineTitle}>{selectedModule?.module.name}</div>
                            <Tag text={`${selectedModule?.module.price_per_hour || 0} ₽ в час`} size="medium" />
                        </div>

                        <div className={styles.statusRow}>
                            <div className={cn(styles.status, styles[isMyBooking ? 'my' : selectedModule?.module.status])}>
                                <span>{isMyBooking ? 'моя бронь' : labels[selectedModule?.module.status]}</span>
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
                            {selectedModule.module.images?.map((i) => (
                                <SwiperSlide key={i} className={styles.swiperSlide}>
                                    <img src={`${SERVER_URL}/${i}`} className={styles.image} />
                                </SwiperSlide>
                            ))}
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
                                                <span>{formattedDate}</span>
                                            </div>
                                        </div>

                                        <div className={styles.infoItemContent}>
                                            <div className={styles.reservations}>
                                                {selectedModule.slots.map((s) => {
                                                    const duration = getTimeRangeDurationInHoursAndMinutes(s.start_hour, s.end_hour);

                                                    return (
                                                        <div
                                                            className={
                                                                cn(
                                                                    styles.reservation,
                                                                    {
                                                                        [styles.free]: !s.is_busy,
                                                                        [styles.booked]: s.is_busy,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <span>{s.is_busy ? 'Занят' : 'Свободен'}</span>
                                                            <span>{formatTimeRange(s.start_hour, s.end_hour)}</span>
                                                            <span>{duration.hours} ч. {duration.minutes ? `${duration.minutes} мин.` : ''}</span>
                                                        </div>
                                                    );
                                                })}
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
                                                onClick={goToLocation}
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
                                    {/* <li className={styles.infoItem}>
                                        <div className={styles.infoItemHeader}>
                                            <Icon size="extra-small" name="like" />
                                            <div>Комфортное размещение</div>
                                        </div>

                                        <div className={styles.infoItemContent}>
                                            <div className={styles.infoItemText}>
                                                Одного человека
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                            </Card>

                            <Card>
                                <div className={styles.description}>
                                    <img className={styles.descriptionImg} src={`${SERVER_URL}${selectedModule?.module.placed_icon.link_icon}`} />
                                    <div className={styles.descriptionText}>{selectedModule?.module.name}</div>
                                </div>
                            </Card>

                            <About
                                title="Описание"
                                description={selectedModule.module.description || ""}
                            />

                            <Card>
                                <div className={styles.accessories}>
                                    <div className={styles.accessoriesTitle}>Пляжные аксессуары</div>
                                    <div className={styles.accessoriesList}>
                                        {beachAccessories.map((accessory) => (
                                            <div className={styles.accessoriesItem}>
                                                <img src={accessory.link_icon} alt={accessory.name} />
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

                            {/* <div className={styles.abonements}>
                                <div className={styles.abonementsTitle}>Доступен по абонементам <span>2</span></div>
                                <div className={styles.abonementsTitle}>Можно заказать модуль бесплатно по вашему абонементу</div>

                                {[1, 2].map((_, index) => (
                                    <AbonementCard key={index} />
                                ))}
                            </div> */}
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
