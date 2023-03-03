import { NgModule } from '@angular/core';
import { G6GraphModule, G6_GRAPH_OPTIONS } from 'ng-antv-g6';
import { Tooltip } from '@antv/g6';

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
        plugins: [new Tooltip({
          offsetX: 10,
          offsetY: 10,
          itemTypes: ['node', 'edge'],
          getContent: (e) => {
            if (!e?.item) return '';
            const outDiv = document.createElement('div');
            outDiv.style.width = 'fit-content';
            //outDiv.style.padding = '0px 0px 20px 0px';
            outDiv.innerHTML = `
              <h4>Custom Content</h4>
              <ul>
                <li>Type: ${e.item.getType()}</li>
              </ul>
              <ul>
                <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
              </ul>`;
            return outDiv;
          },
        })]
      }
    },
  ]
})
export class G6Module {}