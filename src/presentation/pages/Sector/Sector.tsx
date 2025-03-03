import { locationStore } from "@src/application/store/locationStore";
import { observer } from "mobx-react-lite";
import { Header } from "./components/Header";
import { useParams } from "react-router-dom";
import styles from './Sector.module.css';
import { BookingDrawer } from "./components/BookingDrawer";

export const Sector = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { location, sectors } = locationStore;

  const sector = sectors.find((sector) => sector.id === Number(id));

  if (!sector || !location) return null;

  return (
    <div className={styles.wrapper}>
      <Header name={location.name} sector={sector} />

      <img
        src={sector.link_plan}
        alt={sector.name}
        className={styles.plan}
      />

      <BookingDrawer />
    </div>
  );
});
