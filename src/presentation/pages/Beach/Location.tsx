import { locationStore } from "@src/application/store/locationStore";
import { observer } from "mobx-react-lite";
import { Contacts } from "./components/Contacts";
import { Features } from "@src/presentation/components/Features/Features";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Button } from "@presentation/ui-kit/Button";
import { About } from "@src/presentation/components/About/About";
import { DrawerV2 } from "@src/presentation/ui-kit/DrawerV2";
import styles from './Location.module.css';
import { useState } from "react";

export const Location = observer(() => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { location, services, peculiarities, additionalServicesAsFeatures } = locationStore;

  useEffect(() => {
    if (!id) return;

    locationStore.setLocation(Number(id));
  }, [id]);

  if (!location) return null;

  return (
    <>
      <Header name={location.name} />

      <DrawerV2 overflowHeight={483} open={open} onChange={() => setOpen(!open)}>
        <Navigation location={location} />

        <div className={styles.content}>
          <Contacts location={location} />
          <About title="Описание" description={location.description ?? ""} />
          <Features title="Услуги" items={services} />
          <Features title="Пляжная инфраструктура" items={additionalServicesAsFeatures} />
          <Features title="Особенности" items={peculiarities} />
        </div>
      </DrawerV2>

      <div className={styles.footer}>
        <Button variant="secondary" onClick={() => locationStore.choosePlace()}>Выбрать место</Button>
      </div>
    </>
  );
});
