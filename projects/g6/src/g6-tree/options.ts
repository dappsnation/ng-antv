import { InjectionToken } from '@angular/core';
import { GraphOptions } from '@antv/g6';

export const G6_TREE_GRAPH_OPTIONS = new InjectionToken<Partial<GraphOptions>>('Default options for a Graph');

export const defaultTreeOption: Partial<GraphOptions> = {
  modes: {
    default: ['zoom-canvas', 'drag-node']
  },
  layout: {
    type: 'dendrogram',
    direction: 'LR',
    nodeSep: 30,
    rankSep: 100,
  },
  defaultNode: {
    anchorPoints: [[ 0.5, 0 ], [ 0.5, 1 ]],
  },
  fitView: true
}

