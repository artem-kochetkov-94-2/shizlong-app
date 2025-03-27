import { locationStore } from '@src/application/store/locationStore';
import { sectorStore } from '@src/application/store/sectorStore';
import {
    ReactFlow,
    useNodesState,
    Controls,
    type Node,
} from '@xyflow/react';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SERVER_URL } from '@src/const';
import styles from './Plan.module.css';
import cn from 'classnames';
import { bookStore } from '@src/application/store/bookStore';
import { RawModule, RawSector } from '@src/infrastructure/Locations/types';
import { Icon } from '@src/presentation/ui-kit/Icon';

// function isModuleAvailable(module: RawModule, date: Date, hours: number, startTime: string) {
//     const bookingDate = new Date(date);
//     const [startHour, startMinute] = startTime.split(':').map(Number);
//     const bookingStartTime = new Date(bookingDate.setHours(startHour, startMinute, 0, 0));
//     const bookingEndTime = new Date(bookingStartTime.getTime() + hours * 60 * 60 * 1000);

//     return module.slots.some(slot => {
//         if (slot.is_busy) return false;

//         const slotStartTime = new Date(slot.start_hour);
//         const slotEndTime = new Date(slot.end_hour);

//         return bookingStartTime >= slotStartTime && bookingEndTime <= slotEndTime;
//     });
// }

export const Plan = observer(({
    onNext,
    onPrev,
}: {
    onNext: () => void,
    onPrev: () => void,
}) => {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const { modules } = locationStore;
  const { sector, activeScheme } = sectorStore;

//   const getPlanSize = (coords: [number, number][]) => {
//     let minX = coords[0][0];
//     let maxX = coords[0][0];
//     let minY = coords[0][1];
//     let maxY = coords[0][1];

//     coords.forEach(([x, y]) => {
//         if (x < minX) minX = x;
//         if (x > maxX) maxX = x;
//         if (y < minY) minY = y;
//         if (y > maxY) maxY = y;
//     });

//     const width = maxX - minX;
//     const height = maxY - minY;

//     return { width, height };
//   }

  const getNodes = (sector: RawSector, sectorModules: RawModule[]) => {
    const nodes: Node[] = [{
        id: 'sector_scheme',
        focusable: false,
        selectable: false,
        dragging: false,
        data: {
            label: (
                <img
                    src={sector.link_plan}
                    alt={sector.name}
                    className={styles.plan}
                    // style={{
                    //     width: getPlanSize(sector.sector_coords_pixel).width,
                    //     height: getPlanSize(sector.sector_coords_pixel).height,
                    // }}
                />
            ),
        },
        position: {
            x: 0,
            y: 0,
        },
        // width: getPlanSize(sector.sector_coords_pixel).width,
        // height: getPlanSize(sector.sector_coords_pixel).height,
        // style: {
        //     border: '5px solid red',
        // },
    }];

    sectorModules.forEach((m) => {
        const module = m.module;
        // const isAvailable = isModuleAvailable(m, bookStore.date as Date, bookStore.hours, bookStore.startTime);
        // const inlineStyles = m.module.placed_icon.style?.split(';');
        // const width = inlineStyles?.find(style => style.includes('width'))?.split(':')[1];
        // const height = inlineStyles?.find(style => style.includes('height'))?.split(':')[1];

        const node = {
            // type: 'input',
            id: `${module.id}`,
            data: {
                label: (
                    <div className={styles.module}>
                        <span className={cn(styles.moduleId, {
                            [styles.available]: m.module.status === 'available',
                            [styles.booked]: m.module.status === 'booked',
                        })}>
                            <span>{m.module.number}</span>
                        </span>
                        <img
                            src={`${SERVER_URL}${module.placed_icon.link_icon}`}
                            alt={module.placed_icon.name_icon}
                            // style={{ width, height }}
                            onClick={() => bookStore.setSelectedModule(m)}
                        />
                    </div>
                ),
            },
            position: {
                x: Number(module.placed_icon.left),
                y: Number(module.placed_icon.top),
            },
            // width: Number(width),
            // height: Number(height),
        };

        nodes.push(node);
    });

    return nodes;
  }

  useEffect(() => {
    if (!sector || !modules) return;

    const sectorModules = modules.filter((m) => m.module.sector_id === sector.id && m.module.sector_scheme_id === activeScheme?.id);

    const nodes = getNodes(sector, sectorModules);
    setNodes(nodes);
  }, [sector, modules, activeScheme]);

  return (
    <>
        <ReactFlow
            nodes={nodes}
            fitView={true}
            // fitViewOptions={{ padding: 10 }}
            key={activeScheme?.id}
        >
            <Controls
                showInteractive={false}
                orientation="horizontal"
            />
            {/* <img
                src={sector?.link_plan}
                alt={sector?.name}
                className={styles.plan}
            /> */}
        </ReactFlow>
        <div className={styles.left} onClick={onPrev}>
            <Icon name="arrow-left" color="dark" size="small" />
        </div>
        <div className={styles.right} onClick={onNext}>
            <Icon name="arrow-right" color="dark" size="small" />
        </div>
    </>
  );
});
