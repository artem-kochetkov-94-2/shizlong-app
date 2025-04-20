import { locationStore } from '@src/application/store/locationStore';
import { observer } from 'mobx-react-lite';
import { Header } from './components/Header';
import { useParams } from 'react-router-dom';
import styles from './Sector.module.css';
import { BookingDrawer } from "./components/BookingDrawer";
import { useEffect } from "react";
import { sectorStore } from "@src/application/store/sectorStore";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes";
import { Plan } from "./components/Plan";
import { Module } from '@src/presentation/components/Module';
import { bookStore } from '@src/application/store/bookStore';
import { formatDateTime } from '@src/application/utils/formatDate';
import { useOpenModule } from './hooks/useOpenModule';

export const Sector = observer(() => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { location, sectors, modules } = locationStore;
  const { sector, activeScheme } = sectorStore;
  const { bookModules } = bookStore;

  console.log('========== bookModules', JSON.parse(JSON.stringify(bookModules)));

  useEffect(() => {
    sectorStore.init(Number(id));
  }, [id]);

  useEffect(() => {
    if (!sector || location) return;

    console.log('sector', JSON.parse(JSON.stringify(sector)));
    locationStore.init(sector.location_id);
  }, [sector, location]);

  // clear modules from another sector or scheme
  useEffect(() => {
    if (!sector || !location || !bookModules.size) return;

    const first = bookModules.values().next().value;
    const module = modules.find((m) => m.id === first?.id);

    if (module?.sector_id !== sector.id || module?.sector_scheme_id !== activeScheme?.id) {
      bookStore.clear();
    }
  }, [sector, location, bookModules, modules, activeScheme]);

  useOpenModule();

  // fetch modules
  useEffect(() => {
    if (!sector || !location) return;

    if (!bookStore.formStartTime || bookStore.formHours === 0) {
      return;
    }

    console.log('bookStore.date', bookStore.date);
    console.log('bookStore.hours', bookStore.formHours);
    console.log('bookStore.startTime', bookStore.formStartTime);

    const {
      from_date,
      to_date,
    } = formatDateTime(bookStore.date as Date, bookStore.formHours, bookStore.formStartTime);

    locationStore.fetchModules(
      sector.location_id,
      from_date,
      to_date,
    );
  }, [sector, location, bookStore.date, bookStore.formHours, bookStore.formStartTime]);

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

      <Plan
        onNext={() => handleChangeSector(nextSector?.id)}
        onPrev={() => handleChangeSector(prevSector?.id)}
        hasNext={!!nextSector}
        hasPrev={!!prevSector}
      />

      <BookingDrawer />
      <Module />
    </div>
  );
});
