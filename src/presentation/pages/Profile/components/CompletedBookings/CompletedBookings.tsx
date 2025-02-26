import { observer } from "mobx-react-lite";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { IconButton } from "@presentation/ui-kit/IconButton";
import { Tag } from "@presentation/ui-kit/Tag";
import { Icon } from "@presentation/ui-kit/Icon";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./CompletedBookings.module.css";
import { Link } from "react-router-dom";
import { bgColorByStatus, colorByStatus } from "@src/presentation/pages/Profile/const";

export const CompletedBookings = observer(() => {
    const { completedBookings } = bookingsStore;
    const isFavorite = true;
    const images = [
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
        "https://placehold.co/120x90",
    ];

    const status = 'завершена';

    return (
        <div className={styles.container}>
            {completedBookings.map((_, i) => (
                <Link to={''} key={i}>
                    <div className={styles.wrapper}>
                        <div className={styles.content}>
                            <div className={styles.category}>Пляж</div>
                            <div className={styles.name}>Ривьера</div>

                            <div className={styles.row}>
                                <Tag text={`Бронь`} />
                                <span>сектор #2</span>
                            </div>
                            <div className={styles.range}>
                                <span>14 июл 2025</span>
                                <Icon name="time" size="extra-small" />
                                <span>9:00 – 13:00</span>
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
                </Link>
            ))}
        </div>
    )
});
