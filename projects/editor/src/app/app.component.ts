import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { EdgeConfig, NodeConfig } from '@antv/g6/lib/types';
import { G6Graph } from 'ng-g6/graph';
import { FormCanvas } from './form-canvas/form';
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
  edges: EdgeConfig[] = [];

  addNode() {
    this.nodesForm.add({ id: Math.random().toString() });
  }

  addEdge(edge: EdgeConfig) {
    this.edges.push(edge);
  }

  select(selection: 'node' | 'graph', id?: string) {
    this.selection = selection;
    this.selectedId = id;
  }
}
