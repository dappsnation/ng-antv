import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { EdgeConfig, GraphOptions, NodeConfig } from '@antv/g6';
import { G6Graph } from 'ng-antv-g6';
import { FormCanvas } from '../form-canvas/form';
import { FormEdgeList } from '../form-edge/form';
import { FormNodeList } from '../form-node/form';

const nodes: NodeConfig[] = [
  { id: '0', label: 'root' },
  { id: '1', label: 'leaf 1' },
  { id: '2', label: 'leaf 2' }
];

const edges: EdgeConfig[] = [
  { source: '0', target: '1' },
];

const canvas: Partial<GraphOptions> = {
  modes: { default: ['zoom-canvas', 'drag-canvas', 'create-edge', 'drag-node'] } 
}

@Component({
  selector: 'editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  @ViewChild(G6Graph) graph?: G6Graph;
  selection: 'node' | 'graph' | 'edge' = 'graph';
  selectedId?: string;
  canvasForm = new FormCanvas(canvas);
  nodesForm = new FormNodeList(nodes);
  edgesForm = new FormEdgeList(edges);
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
