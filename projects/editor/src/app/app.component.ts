import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { EdgeConfig } from '@antv/g6/lib/types';
import { G6Graph } from 'ng-antv-g6';
import { FormCanvas } from './form-canvas/form';
import { FormEdgeList } from './form-edge/form';
import { FormNodeList } from './form-node/form';

@Component({
  selector: 'editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild(G6Graph) graph?: G6Graph;
  selection: 'node' | 'graph' | 'edge' = 'graph';
  selectedId?: string;
  canvasForm = new FormCanvas();
  nodesForm = new FormNodeList();
  edgesForm = new FormEdgeList();
  edges: EdgeConfig[] = [];

  addNode() {
    this.nodesForm.add({ id: Math.random().toString() });
  }

  addEdge(edge: EdgeConfig) {
    this.edgesForm.add(edge);
  }

  select(selection: 'node' | 'edge' | 'graph', id?: string) {
    this.selection = selection;
    this.selectedId = id;
  }

  onSelect(e: boolean) {
    console.log('on select', e)
  }
}
