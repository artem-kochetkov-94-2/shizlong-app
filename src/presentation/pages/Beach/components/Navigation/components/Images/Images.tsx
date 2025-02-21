import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Images.module.css';

export const Images = ({ items }: { items: string[] }) => {
    return (
        <Swiper spaceBetween={8} slidesPerView={'auto'}>
            {items.map((item) => (
                <SwiperSlide key={item} className={styles.slide}>
                    <img src={item} className={styles.image} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
