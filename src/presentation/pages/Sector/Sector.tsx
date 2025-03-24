import { locationStore } from '@src/application/store/locationStore';
import { observer } from 'mobx-react-lite';
import { Header } from './components/Header';
import { useParams } from 'react-router-dom';
import styles from './Sector.module.css';
import { BookingDrawer } from "./components/BookingDrawer";
import { useEffect } from "react";
import { sectorStore } from "@src/application/store/sectorStore";
// import { SwiperSlide } from "swiper/react";
// import { Swiper } from "swiper/react";
// import { Swiper as SwiperType } from "swiper";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";
import { Plan } from "./components/Plan";
import { Module } from '@src/presentation/components/Module';
import { bookStore } from '@src/application/store/bookStore';
import { formatDateTime } from '@src/application/utils/formatDate';
// import { RawSector } from '@src/infrastructure/Locations/types';

export const Sector = observer(() => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { location, sectors } = locationStore;
  const { sector } = sectorStore;
  const { selectedModule } = bookStore;

  useEffect(() => {
    sectorStore.init(Number(id));
  }, [id]);

  useEffect(() => {
    if (!sector || location) return;

    locationStore.init(sector.location_id);
  }, [sector, location]);

  useEffect(() => {
    if (!sector || !location) return;

    const {
      from_date,
      to_date,
    } = formatDateTime(bookStore.date as Date, bookStore.hours, bookStore.startTime);

    locationStore.fetchModules(
      sector.location_id,
      from_date,
      to_date,
    );
  }, [sector, location, bookStore.date, bookStore.hours, bookStore.startTime]);

  if (!sector || !location) return null;

  const sectorIndex = sectors.findIndex((s) => s.id === sector.id);
  const nextSector = sectors[sectorIndex + 1];
  const prevSector = sectors[sectorIndex - 1];

  // const handleSlideChange = (swiper: SwiperType) => {
  //   const id = sectors[swiper.activeIndex].id;
  //   navigate(`${Routes.Sector.replace(':id', `${id}`)}`);
  // };

  const handleChangeSector = (sectorId: number | undefined) => {
    console.log('sectorId', sectorId);
    if (!sectorId) return;

    navigate(`${Routes.Sector.replace(':id', `${sectorId}`)}`);
  };

  return (
    <div className={styles.wrapper}>
      <Header name={location.name} sector={sector} />

      <Plan
        onNext={() => handleChangeSector(nextSector?.id)}
        onPrev={() => handleChangeSector(prevSector?.id)}
      />

      {/* <Swiper
          spaceBetween={0}
          slidesPerView={1}
        >
          {sectors.map((s, index, array) => {
            const nextSector = array[index + 1];
            const prevSector = array[index - 1];

            console.log('prevSector', prevSector?.id, 'nextSector', nextSector?.id);

            return (
              <SwiperSlide key={s.id}>
                <Plan
                  onNext={() => handleChangeSector(nextSector?.id)}
                  onPrev={() => handleChangeSector(prevSector?.id)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper> */}

      <BookingDrawer />
      {selectedModule && <Module onClose={() => bookStore.setSelectedModule(null)} />}
    </div>
  );
});
