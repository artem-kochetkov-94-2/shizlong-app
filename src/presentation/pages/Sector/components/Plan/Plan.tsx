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
import styles from './Plan.module.css';
import { RawModule, RawSector } from '@src/infrastructure/Locations/types';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { ModuleNode } from './ModuleNode';
import { PlanImageNode } from './PlanImageNode';

const nodeTypes = {
    ModuleNode,
    PlanImageNode,
};

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
        type: 'PlanImageNode',
        data: {
            linkPlan: sector.link_plan,
            sectorName: sector.name,
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
        
        // const inlineStyles = m.module.placed_icon.style?.split(';');
        // const width = inlineStyles?.find(style => style.includes('width'))?.split(':')[1];
        // const height = inlineStyles?.find(style => style.includes('height'))?.split(':')[1];

        const node = {
            // type: 'input',
            id: `${module.id}`,
            type: 'ModuleNode',
            data: {
                module: m,
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
            nodeTypes={nodeTypes}
            fitView={true}
            // fitViewOptions={{ padding: 10 }}
            key={activeScheme?.id}
            nodesDraggable={false}
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
