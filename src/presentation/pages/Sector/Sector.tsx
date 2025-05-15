import { locationStore } from '@src/application/store/locationStore';
import { observer } from 'mobx-react-lite';
import { Header } from './components/Header';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './Sector.module.css';
import { BookingDrawer } from "./components/BookingDrawer";
import { useEffect } from "react";
import { sectorStore } from "@src/application/store/sectorStore";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";
import { Plan } from "./components/Plan";
import { Module } from '@src/presentation/components/Module';
import { useOpenModule } from './hooks/useOpenModule';
import { useFetchModules } from '@src/application/hooks/useFetchModules';
import { ReactFlowProvider } from '@xyflow/react';
import { Loader } from '@src/presentation/ui-kit/Loader';
import { OrderDrawer } from './components/OrderDrawer';
import { bookingCardStore } from '@src/application/store/bookingCardStore';

export const Sector = observer(() => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { location, sectors, isModulesLoading } = locationStore;
  const { sector } = sectorStore;
  const { booking } = bookingCardStore;

  const [searchParams] = useSearchParams();
  const showBookingDetails = searchParams.get('show-booking-details');

  // console.log('========== bookModules', JSON.parse(JSON.stringify(bookModules)));
  // console.log('SCHEME MODULES', JSON.parse(JSON.stringify(modules.filter((m) => m.sector_scheme_id === activeScheme?.id))));
  // console.log('SCHEME MODULES HOURLY', JSON.parse(JSON.stringify(modules.filter((m) => m.module_schemes.find((s) => s.type.name === 'hourly')))));

  useEffect(() => {
    sectorStore.init(Number(id));
  }, [id]);

  useEffect(() => {
    if (!sector || location) return;

    locationStore.init(sector.location_id);
  }, [sector, location]);

  useOpenModule();
  useFetchModules();

  if (!sector || !location) return null;

  const sectorIndex = sectors.findIndex((s) => s.id === sector.id);
  const nextSector = sectors[sectorIndex + 1];
  const prevSector = sectors[sectorIndex - 1];

  const handleChangeSector = (sectorId: number | undefined) => {
    if (!sectorId) return;
    navigate(`${Routes.Sector.replace(':id', `${sectorId}`)}`);
  };

  return (
    <div className={styles.wrapper}>
      <Header name={location.name} sector={sector} />

      {isModulesLoading && (
        <div className={styles.spin}>
          <Loader />
        </div>
      )}

      <ReactFlowProvider>
        <Plan
          onNext={() => handleChangeSector(nextSector?.id)}
          onPrev={() => handleChangeSector(prevSector?.id)}
          hasNext={!!nextSector}
          hasPrev={!!prevSector}
        />
      </ReactFlowProvider>

      <BookingDrawer />
      <Module />

      {showBookingDetails && booking && (
        <OrderDrawer />
      )}
    </div>
  );
});
