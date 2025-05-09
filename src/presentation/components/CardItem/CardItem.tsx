import { RawLocation } from '@src/infrastructure/Locations/types';
import { Tag } from "@presentation/ui-kit/Tag";
import { Icon } from '@presentation/ui-kit/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './CardItem.module.css';
import { Routes } from '@src/routes';
import { Link } from 'react-router-dom';
import { IconButton } from '@src/presentation/ui-kit/IconButton';
import { locationsStore } from '@src/application/store/locationsStore';
import { observer } from 'mobx-react-lite';

interface CardItemProps {
  data: RawLocation;
  optionsToView?: number;
  category?: string;
}

const MAX_OPTIONS_TO_VIEW = 4;

export const CardItem = observer(
  ({ data, optionsToView = MAX_OPTIONS_TO_VIEW, category }: CardItemProps) => {
    const { id, name, link_space, working_hours, additional_service } = data;
    const maxOptionsToView = Math.min(optionsToView, MAX_OPTIONS_TO_VIEW);
    const isFavorite = locationsStore.getFavoriteStatus(id);

    // @todo: цена
    const price = 0;

    return (
      <Link to={Routes.Location.replace(':id', `${id}`)}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.category}>{category}</div>
            <div className={styles.name}>{name}</div>
            {/* @todo - цена */}
            <div className={styles.row}>
              <Tag text={`от ${price} ₽`} />
              <div className={styles.options}>
                <div className={styles.optionsItems}>
                  {additional_service.slice(0, maxOptionsToView).map((s, i) => (
                    <div className={styles.optionsItem} key={i}>
                      <img src={s.link_icon} />
                    </div>
                  ))}
                </div>
                {additional_service.length > maxOptionsToView && <span>+{additional_service.length - maxOptionsToView}</span>}
              </div>
            </div>
            <div className={styles.range}>
              <Icon name='time' size='extra-small' />
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

          {isFavorite && (
            <div className={styles.favorite}>
              <IconButton
                iconName='favorite'
                size='medium'
                iconSize='extra-small'
                color='white'
              />
            </div>
          )}
        </div>
      </Link>
    );
  }
);
