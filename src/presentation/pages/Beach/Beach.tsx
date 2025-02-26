import { Drawer } from "@presentation/ui-kit/Drawer";
import { beachStore } from "@src/application/store/beachStore";
import { observer } from "mobx-react-lite";
import { Contacts } from "./components/Contacts";
import { Features } from "@src/presentation/components/Features/Features";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import styles from './Beach.module.css';
import { Button } from "@presentation/ui-kit/Button";
import { About } from "@src/presentation/components/About/About";

export const Beach = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { beach, services, infrastructure, peculiarities } = beachStore;

  useEffect(() => {
    if (!id) return;
    beachStore.setBeach(id);
  }, [id]);

  if (!beach) return null;

  return (
    <>
      <Header name={beach.name} category={beach.category} />

      <Drawer
        header={<Navigation beach={beach} />}
        headerClassName={styles.header}
        drawerContent={
          <>
            <Contacts />
            <About />
            <Features title="Услуги" items={services} />
            <Features title="Пляжная инфраструктура" items={infrastructure} />
            <Features title="Особенности" items={peculiarities} />
          </>
        }
        footer={
          <Button variant="secondary">Выбрать место</Button>
        }
        height={468}
      />
    </>
  );
});
