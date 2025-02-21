import { observer } from "mobx-react-lite";
import { beachStore } from "@src/application/store/beaches";
import { CardList } from "@presentation/components/CardList";
import { Navigation } from "./components/Navigation";
import { Drawer } from "@src/presentation/ui-kit/Drawer";
import { Menu } from "@src/presentation/components/Menu";

export const Beaches = observer(() => {
    const { beaches } = beachStore;

    return (
        <Drawer
            header={<Navigation />}
            drawerContent={
                <>
                    <Menu />
                    <CardList title="Пляжи рядом" items={beaches} />
                </>
            }
        />
    )
})
