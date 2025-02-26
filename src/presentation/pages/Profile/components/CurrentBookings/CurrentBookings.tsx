import { observer } from "mobx-react-lite";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { IconButton } from "@presentation/ui-kit/IconButton";
import { Tag } from "@presentation/ui-kit/Tag";
import { Icon } from "@presentation/ui-kit/Icon";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./CurrentBookings.module.css";
import { bgColorByStatus, colorByStatus } from "@src/presentation/pages/Profile/const";
import { Button } from "@presentation/ui-kit/Button";

export const CurrentBookings = observer(() => {
    const { currentBookings } = bookingsStore;
    const isFavorite = true;
    const images = [
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
    ];

    const status = 'активна';

    return (
        <div className={styles.container}>
            {currentBookings.map((_, i) => (
                <div className={styles.item} key={i}>
                    <div className={styles.wrapper}>
                        <div className={styles.content}>
                            <div className={styles.category}>Пляж</div>
                            <div className={styles.name}>Ривьера</div>

                            <div className={styles.row}>
                                <Tag text="Вы на пляже" />
                                <span>сектор #1</span>
                            </div>
                            <div className={styles.range}>
                                <span>Осталось</span>
                                <Icon name="time" size="extra-small" />
                                <span>2ч. 31 мин.</span>
                            </div>
                        </div>

                        <div className={styles.slider}>
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                touchRatio={1}
                                simulateTouch={true}
                                touchStartPreventDefault={false}
                            >
                                {images.map((i, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={i} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div
                                className={styles.status}
                                style={{
                                    backgroundColor: bgColorByStatus[status],
                                    color: colorByStatus[status],
                                }}
                            >
                                <span>{status}</span>
                            </div>

                            <div className={styles.qrCode}>
                                <Icon name="qr-code2" size="small" />
                            </div>
                        </div>

                        {isFavorite && (
                            <div className={styles.favorite}>
                                <IconButton
                                    iconName="favorite"
                                    size="medium"
                                    iconSize="extra-small"
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.timeSlider}>
                        <div className={styles.highlight}></div>
                        <div className={styles.timeMarker}></div>
                        <div className={styles.timeLabels}>
                            <span>16:00</span>
                            <span>17:00</span>
                            <span>18:00</span>
                            <span>19:00</span>
                            <span>20:00</span>
                            <span>21:00</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.actionItem}>
                            <Button
                                size="medium"
                                variant="tertiary"
                            >
                                <Icon name="location-flag" size="extra-small" />
                                <span>На схему</span>
                            </Button>
                            <IconButton
                                iconName="route"
                                size="large"
                                iconSize="small"
                                shape="rounded"
                                color="white"
                            />
                            <IconButton
                                iconName="in-map"
                                size="large"
                                iconSize="small"
                                shape="rounded"
                                color="white"
                            />
                        </div>

                        <div className={styles.actionItem}>
                            <Button
                                size="medium"
                                variant="yellow"
                            >
                                <span>Продлить</span>
                            </Button>
                            <IconButton
                                iconName="stop"
                                size="large"
                                iconSize="small"
                                shape="rounded"
                                color="white"
                            />
                            <IconButton
                                iconName="megaphone"
                                size="large"
                                iconSize="small"
                                shape="rounded"
                                color="white"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});
