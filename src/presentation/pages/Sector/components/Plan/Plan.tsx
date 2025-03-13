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

export const Plan = observer(({ sectorId }: { sectorId: number }) => {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const { modules } = locationStore;
  const { sector, activeScheme } = sectorStore;

  useEffect(() => {
    if (!sector || !modules) return;

    const sectorModules = modules.filter((m) => m.sector_id === sector.id && m.sector_scheme_id === activeScheme?.id);

    const nodes = sectorModules.map((m) => {
        const inlineStyles = m.placed_icon.style.split(';');
        const width = inlineStyles.find(style => style.includes('width'))?.split(':')[1];
        const height = inlineStyles.find(style => style.includes('height'))?.split(':')[1];

        return {
            // type: 'input',
            id: `${m.id}`,
            data: {
                label: (
                    <div className={styles.module}>
                        <span className={cn(styles.moduleId, {
                            [styles.available]: m.status === 'available',
                            [styles.booked]: m.status === 'booked',
                        })}>
                            <span>{m.id}</span>
                        </span>
                        <img
                            src={`${SERVER_URL}${m.placed_icon.link_icon}`}
                            alt={m.placed_icon.name_icon}
                            style={{ width, height }}
                            onClick={() => sectorStore.setSelectedModule(m)}
                        />
                    </div>
                ),
            },
            position: {
                x: Number(m.placed_icon.left),
                y: Number(m.placed_icon.top),
            },
        };
    });

    setNodes(nodes);
  }, [sector, modules, activeScheme]);

  return (
    <>
        <ReactFlow nodes={nodes}>
            <Controls
                showInteractive={false}
                orientation="horizontal"
            />
            {/* <img
                src={s.link_plan}
                alt={s.name}
                className={styles.plan}
            /> */}
        </ReactFlow>
    </>
  );
});
