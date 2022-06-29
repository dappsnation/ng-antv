import { NgModule } from '@angular/core';
import { G6GraphModule, G6_GRAPH_OPTIONS } from 'ng-antv-g6';

@NgModule({
  exports: [ G6GraphModule ],
  providers: [
    {
      provide: G6_GRAPH_OPTIONS,
      useValue: {
        modes: { default: ['drag-canvas', 'zoom-canvas'] },
        layout: {
          type: 'dagre',
          ranksep: 10,
        },
        defaultNode: {
          type: 'rect',
          anchorPoints: [[ 0.5, 0 ], [ 0.5, 1 ]],
        },
      }
    },
  ]
})
export class G6Module {}