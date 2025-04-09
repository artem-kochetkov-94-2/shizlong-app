import { locationStore } from '@src/application/store/locationStore';
import { sectorStore } from '@src/application/store/sectorStore';
import {
    ReactFlow,
    useNodesState,
    Controls,
    type Node,
    Viewport,
} from '@xyflow/react';
import { useEffect, useState } from 'react';
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

interface PlanProps {
    onNext: () => void,
    onPrev: () => void,
}

export const Plan = observer(({ onNext, onPrev }: PlanProps) => {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [viewport, setViewport] = useState<Viewport>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const { modules } = locationStore;
  const { sector, activeScheme, size } = sectorStore;

  const getNodes = (sector: RawSector, sectorModules: RawModule[]) => {
    const nodes: Node[] = [{
        id: 'sector_scheme',
        type: 'PlanImageNode',
        data: {
            sector,
            linkPlan: sector.link_plan,
            sectorName: sector.name,
        },
        position: {
            x: 0,
            y: 0,
        },
    }];

    sectorModules.forEach((m) => {
        const module = m.module;

        const node = {
            id: `${module.id}`,
            type: 'ModuleNode',
            data: {
                module: m,
            },
            position: {
                x: Number(module.placed_icon.left),
                y: Number(module.placed_icon.top),
            },
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

  const onViewportChange = (newViewport: Viewport) => {
    const screenWidth = window.innerWidth;
    const canvasWidth = size?.width || 0;
    const arrowWidth = 35;
    const canvasWidthWithZoom = canvasWidth * newViewport.zoom;
    const diff = screenWidth - canvasWidthWithZoom;

    let isImageBiggestThanScreen = true;

    let maxX = Math.max(0, canvasWidthWithZoom - screenWidth);
    if (diff > 0) {
        maxX = diff;
        isImageBiggestThanScreen = false;
    }

    const rightCornerLargeFlow = Math.abs(maxX) + arrowWidth;
    const rightCornerSmallFlow = Math.abs(maxX) - arrowWidth;

    if (!isImageBiggestThanScreen && diff < arrowWidth * 2) {
        setViewport({
            x: arrowWidth,
            y: newViewport.y,
            zoom: newViewport.zoom,
        });
        return;
    }

    let newX = newViewport.x;
    if (isImageBiggestThanScreen) {
        if (newX >= arrowWidth) {
            newX = arrowWidth;
        } else if (Math.abs(newX) > rightCornerLargeFlow) {
            newX = rightCornerLargeFlow * -1;
        }
    } else {
        if (newX <= arrowWidth) {
            newX = arrowWidth;
        } else if (newX > rightCornerSmallFlow) {
            newX = rightCornerSmallFlow;
        }
    }   

    setViewport({
      x: newX,
      y: newViewport.y,
      zoom: newViewport.zoom,
    });
  };

  return (
    <>
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            fitView={true}
            key={activeScheme?.id}
            nodesDraggable={false}
            viewport={viewport}
            onViewportChange={onViewportChange}
        >
            <Controls showInteractive={false} orientation="horizontal" />
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
