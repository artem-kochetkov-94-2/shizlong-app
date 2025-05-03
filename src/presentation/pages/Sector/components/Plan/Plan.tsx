import { locationStore } from '@src/application/store/locationStore';
import { sectorStore } from '@src/application/store/sectorStore';
import {
    ReactFlow,
    useNodesState,
    Controls,
    type Node,
    Viewport,
    useReactFlow,
} from '@xyflow/react';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Plan.module.css';
import { PlacedIcon, RawModule, RawSector } from '@src/infrastructure/Locations/types';
import { Icon } from '@src/presentation/ui-kit/Icon';
import { ModuleNode } from './ModuleNode';
import { PlanImageNode } from './PlanImageNode';
import { DecorateNode } from './DecorateNode';

const nodeTypes = {
    ModuleNode,
    DecorateNode,
    PlanImageNode,
};

interface PlanProps {
    onNext: () => void,
    onPrev: () => void,
    hasNext: boolean,
    hasPrev: boolean,
}

const header = 160;
const footer = 260;
const headerWithFooter = header + footer;
const arrowWidth = 25;
  // 1217 это что то из админки - базовая ширина подложки
const baseWidthImgPlan = 1217;

export const Plan = observer(({ onNext, onPrev, hasNext, hasPrev }: PlanProps) => {
  const reactFlow = useReactFlow();
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [viewport, setViewport] = useState<Viewport>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const { modules, decorate } = locationStore;
  const { sector, activeScheme, size } = sectorStore;

  const koef = size?.width / baseWidthImgPlan;

  const getNodes = (sector: RawSector, sectorModules: RawModule[], decorate: PlacedIcon[]) => {
    console.log('sectorModules', sectorModules);
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
        const node = {
            id: `${m.id}`,
            type: 'ModuleNode',
            data: {
                module: m,
            },
            position: {
                x: Number(m.placed_icon?.left) * koef || 1,
                y: Number(m.placed_icon?.top) * koef || 1,
            },
        };

        nodes.push(node);
    });

    decorate.forEach((d) => {
        const node = {
            id: `${d.id}`,
            type: 'DecorateNode',
            data: {
                decorate: d,
            },
            position: {
                x: Number(d.left) * koef || 1,
                y: Number(d.top) * koef || 1,
            },
        };

        nodes.push(node);
    });

    return nodes;
  }

  useEffect(() => {
    if (!sector || !modules) return;

    const sectorModules = modules.filter((m) => m.sector_id === sector.id && m.sector_scheme_id === activeScheme?.id);
    const decorates = decorate.filter(d => d.sector_scheme_id === activeScheme?.id)

    console.log('sectorModules', sectorModules);
    console.log('decorates', decorates);
    const nodes = getNodes(sector, sectorModules, decorates);
    setNodes(nodes);
  }, [sector, modules, decorate, activeScheme, size]);

  useEffect(() => {
    reactFlow.fitView();
  }, [size, reactFlow]);

  const getY = (y: number, maxY: number, isImageHeightBiggestThanScreen: boolean, prevY: number | undefined) => {
    const bottomCornerLargeFlow = Math.abs(maxY) + footer;
    const bottomCornerSmallFlow = Math.abs(maxY) - footer;

    // console.log('prevY', prevY);
    // console.log('y', y);
    // console.log('bottomCornerSmallFlow', bottomCornerSmallFlow);
    if (prevY !== undefined) {
        if (bottomCornerSmallFlow > 0) {
            // move top
            if (y < prevY && y < bottomCornerSmallFlow) {
                y = bottomCornerSmallFlow;
            } else if (y > prevY && y > header) {
                y = header;
            }
        } else if (bottomCornerSmallFlow < 0) {
            // move top
            if (y < prevY && y < bottomCornerSmallFlow) {
                y = bottomCornerSmallFlow
            } else if (y > prevY && y > header) {
                y = header;
            }
        }

        // console.log('else if');

        return y;
    }

    if (isImageHeightBiggestThanScreen) {
        if (y >= header) {
            y = header;
        } else if (Math.abs(y) > bottomCornerLargeFlow) {
            y = bottomCornerLargeFlow * -1;
        }
    } else {
        if (y <= header) {
            y = header;
        } else if (y > bottomCornerSmallFlow) {
            y = bottomCornerSmallFlow;
        }
    }

    return y;
  }

  const getX = (base: number, maxX: number, isImageWidthBiggestThanScreen: boolean) => {
    let newX = base;
    const rightCornerLargeFlow = Math.abs(maxX) + arrowWidth;
    const rightCornerSmallFlow = Math.abs(maxX) - arrowWidth;

    if (isImageWidthBiggestThanScreen) {
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

    return newX;
  }

  const onViewportChange = (newViewport: Viewport) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const canvasWidth = size?.width || 0;
    const canvasHeight = size?.height || 0;

    const canvasWidthWithZoom = canvasWidth * newViewport.zoom;
    const diffWidth = screenWidth - canvasWidthWithZoom;

    const canvasHeightWithZoom = canvasHeight * newViewport.zoom;
    const diffHeight = screenHeight - canvasHeightWithZoom;

    let isImageWidthBiggestThanScreen = true;
    let maxX = Math.max(0, canvasWidthWithZoom - screenWidth);
    if (diffWidth > 0) {
        maxX = diffWidth;
        isImageWidthBiggestThanScreen = false;
    }

    let isImageHeightBiggestThanScreen = true;

    let maxY = Math.max(0, canvasHeightWithZoom - screenHeight);
    if (diffHeight > 0) {
        maxY = diffHeight;
        isImageHeightBiggestThanScreen = false;
    }

    // console.clear();

    // console.log('viewPort', viewport);
    // console.log('viewPort 2', newViewport);

    const isInsideY = diffHeight < headerWithFooter && diffHeight > 0;

    if (!isImageWidthBiggestThanScreen && diffWidth < arrowWidth * 2) {
        setViewport({
            x: arrowWidth,
            y: getY(newViewport.y, maxY, isImageHeightBiggestThanScreen, isInsideY ? viewport.y : undefined),
            zoom: newViewport.zoom,
        });
        return;
    }

    setViewport({
      x: getX(newViewport.x, maxX, isImageWidthBiggestThanScreen),
      y: getY(newViewport.y, maxY, isImageHeightBiggestThanScreen, isInsideY ? viewport.y : undefined),
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

        {hasPrev && (
            <div className={styles.left} onClick={onPrev}>
                <Icon name="arrow-left" color="dark" size="extra-small" />
            </div>
        )}
        {hasNext && (
            <div className={styles.right} onClick={onNext}>
                <Icon name="arrow-right" color="dark" size="extra-small" />
            </div>
        )}
    </>
  );
});
