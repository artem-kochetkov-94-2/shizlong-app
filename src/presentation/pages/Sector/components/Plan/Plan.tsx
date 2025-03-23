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
import styles from './plan.module.css';
import cn from 'classnames';
import { bookStore } from '@src/application/store/bookStore';

export const Plan = observer(() => {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const { modules } = locationStore;
  const { sector, activeScheme } = sectorStore;

  useEffect(() => {
    if (!sector || !modules) return;

    const sectorModules = modules.filter((m) => m.module.sector_id === sector.id && m.module.sector_scheme_id === activeScheme?.id);

    const nodes = sectorModules.map((m) => {
        const module = m.module;
        // const inlineStyles = m.placed_icon.style?.split(';');
        // const width = inlineStyles?.find(style => style.includes('width'))?.split(':')[1];
        // const height = inlineStyles?.find(style => style.includes('height'))?.split(':')[1];

        return {
            // type: 'input',
            id: `${module.id}`,
            data: {
                label: (
                    <div className={styles.module}>
                        <span className={cn(styles.moduleId, {
                            [styles.available]: module.status === 'available',
                            [styles.booked]: module.status === 'booked',
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
        };
    });

    setNodes(nodes);
  }, [sector, modules, activeScheme]);

  return (
    <>
        <ReactFlow nodes={nodes} fitView={true}>
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
    </>
  );
});
