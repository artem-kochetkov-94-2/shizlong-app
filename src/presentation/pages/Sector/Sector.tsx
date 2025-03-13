import { locationStore } from "@src/application/store/locationStore";
import { observer } from "mobx-react-lite";
import { Header } from "./components/Header";
import { useParams } from "react-router-dom";
import styles from './Sector.module.css';
import { BookingDrawer } from "./components/BookingDrawer";
import { useEffect } from "react";
import { sectorStore } from "@src/application/store/sectorStore";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";
import { Plan } from "./components/Plan";
import { Module } from '@src/presentation/components/Module';

export const Sector = observer(() => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { location, sectors } = locationStore;
  const { sector, selectedModule } = sectorStore;

  useEffect(() => {
    sectorStore.init(Number(id));
  }, [id]);

  useEffect(() => {
    if (!sector || location) return;

    locationStore.init(sector.location_id);
  }, [sector, location]);

  if (!sector || !location) return null;

  const sectorIndex = sectors.findIndex(s => s.id === sector.id);

  const handleSlideChange = (swiper: SwiperType) => {
    const id = sectors[swiper.activeIndex].id;
    navigate(`${Routes.Sector.replace(':id', `${id}`)}`);
  };

  return (
    <div className={styles.wrapper}>
      <Header name={location.name} sector={sector} />

      <Swiper
          spaceBetween={0}
          slidesPerView={1}
          // touchRatio={1}
          // simulateTouch={true}
          // touchStartPreventDefault={false}

          noSwipingClass="swiper-slide"
          noSwiping={true}

          initialSlide={sectorIndex}
          className={styles.swiper}
          onSlideChange={handleSlideChange}
        >
          {sectors.map((s) => (
            <SwiperSlide key={s.id}>
              <Plan sectorId={s.id} />
            </SwiperSlide>
          ))}
        </Swiper>

      <BookingDrawer />
      {selectedModule && <Module onClose={() => sectorStore.setSelectedModule(null)} />}
    </div>
  );
});
