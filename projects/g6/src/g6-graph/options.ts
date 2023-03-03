import { InjectionToken } from '@angular/core';
import { GraphOptions } from '@antv/g6';

export const G6_GRAPH_OPTIONS = new InjectionToken<GraphOptions>('Default options for a Graph');

export const defaultOptions: Partial<GraphOptions> = {
  modes: {
    default: [
      // 'drag-canvas',
      // 'zoom-canvas',
      // 'drag-node',
      // 'create-edge',
      // 'brush-select',
      // 'click-select',
      // 'drag-group',
    ],
  },
  layout: {
    type: 'dagre',
    ranksep: 10,
  },
  groupType: 'rect',
  defaultNode: {
    type: 'rect',
    anchorPoints: [[ 0.5, 0 ], [ 0.5, 1 ]],
    style: {
      radius: 2,
      fill: 'white',
      strokeOpacity: 0,
      shadowBlur: 5,
      shadowColor: 'black',
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    },
  },
  defaultEdge: { 
    shape: 'cubic-vertical',
    style: {
      radius: 4,
      offset: 20,
      endArrow: true,
      lineWidth: 1,
      stroke: '#C2C8D5'
    }
  },
  fitView: true
};