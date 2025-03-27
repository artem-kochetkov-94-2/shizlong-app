// import { IconButton } from "@presentation/ui-kit/IconButton";
import { RawLocation } from "@src/infrastructure/Locations/types";
// import { Tag } from "@presentation/ui-kit/Tag";
import { Icon } from "@presentation/ui-kit/Icon";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./CardItem.module.css";
import { Routes } from "@src/routes";
import { Link } from "react-router-dom";

interface CardItemProps {
  data: RawLocation;
  optionsToView?: number;
  category?: string;
}

const MAX_OPTIONS_TO_VIEW = 4;

export const CardItem = ({ data, optionsToView = MAX_OPTIONS_TO_VIEW, category }: CardItemProps) => {
  const { id, name, link_space, working_hours } = data;
  const maxOptionsToView = Math.min(optionsToView, MAX_OPTIONS_TO_VIEW);
  console.log(maxOptionsToView);
  console.log('data', JSON.parse(JSON.stringify(data)));

  return (
    <Link to={Routes.Location.replace(':id', `${id}`)}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.category}>{category}</div>
        <div className={styles.name}>{name}</div>
        {/* <div className={styles.row}>
          <Tag text={`от ${price} ₽`} />
          <div className={styles.options}>
            <div className={styles.optionsItems}>
              {options.slice(0, maxOptionsToView).map((o, i) => (
                <Icon size="extra-small" key={i} name={o as IconName} />
              ))}
            </div>
            {options.length > maxOptionsToView && <span>+{options.length - maxOptionsToView}</span>}
          </div>
        </div> */}
        <div className={styles.range}>
          <Icon name="time" size="extra-small" />
          <span>{working_hours}</span>
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
          {[link_space].map((i, index) => (
            <SwiperSlide key={index}>
              <img src={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* {isFavorite && (
        <div className={styles.favorite}>
          <IconButton iconName="favorite" size="medium" iconSize="extra-small" />
        </div>
      )} */}
      </div>
    </Link>
  );
};
